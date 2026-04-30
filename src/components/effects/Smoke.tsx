import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";

const rise = keyframes`
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
  50% { transform: translateY(-10px) scale(1.1); opacity: 0.4; }
`;

export function Smoke() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        top: 22,
        right: 38,
        width: 12,
        height: 36,
        background: "radial-gradient(ellipse at top, rgba(163,255,92,0.55), transparent 70%)",
        borderRadius: "99px",
        filter: "blur(4px)",
        animation: `${rise} 3s ease-in-out infinite`,
        pointerEvents: "none",
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
        },
      }}
    />
  );
}
