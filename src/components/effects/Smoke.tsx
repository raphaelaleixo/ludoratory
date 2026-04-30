import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";

const rise = keyframes`
  0%   { transform: translateY(8px) scale(0.85); opacity: 0; }
  20%  { opacity: 0.8; }
  100% { transform: translateY(-32px) scale(1.25); opacity: 0; }
`;

export function Smoke() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        top: 0,
        left: { xs: 30, md: 44 },
        width: 16,
        height: 52,
        background: "radial-gradient(ellipse at bottom, rgba(163,255,92,0.75), transparent 75%)",
        borderRadius: "99px",
        filter: "blur(5px)",
        animation: `${rise} 3.2s ease-in-out infinite`,
        pointerEvents: "none",
        zIndex: 1,
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
        },
      }}
    />
  );
}
