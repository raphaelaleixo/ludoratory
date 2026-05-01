import Box from "@mui/material/Box";
import type { ComponentProps, ReactNode } from "react";

interface NumberBadgeProps {
  children: ReactNode;
  sx?: ComponentProps<typeof Box>["sx"];
}

export function NumberBadge({ children, sx }: NumberBadgeProps) {
  return (
    <Box
      sx={[
        {
          fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
          fontSize: 16,
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
          color: "accent.acid",
          border: "1px solid #2a4a44",
          borderRadius: "4px",
          padding: "2px 6px",
          minWidth: 26,
          textAlign: "center",
          flexShrink: 0,
          mt: "2px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
