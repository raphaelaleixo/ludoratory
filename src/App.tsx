import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  ScrollRestoration,
  type RouteObject,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import theme from "./theme/theme";
import { MdxProvider } from "./components/MdxProvider";

const HomePage = lazy(() => import("./pages/HomePage"));
const LabNotesIndexPage = lazy(() => import("./pages/LabNotesIndexPage"));
const LabNotePage = lazy(() => import("./pages/LabNotePage"));
const OgImagePage = lazy(() => import("./pages/OgImagePage"));

// Root layout: <ScrollRestoration> resets scroll to top on new navigations
// (and restores the prior position on back/forward), which createBrowserRouter
// does not do on its own.
function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/lab-notes", element: <LabNotesIndexPage /> },
      { path: "/lab-notes/:slug", element: <LabNotePage /> },
      { path: "/og-image", element: <OgImagePage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function RouteFallback() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress />
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MdxProvider>
        <Suspense fallback={<RouteFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </MdxProvider>
    </ThemeProvider>
  );
}
