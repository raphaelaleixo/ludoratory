import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";

interface PuffParams {
  cycleDur: number;
  riseDist: number;
  ampX: number;
  fxA: number;
  fxB: number;
  baseOpacity: number;
  phaseOffset: number;
}

const PUFF_PARAMS: PuffParams[] = [
  { cycleDur: 14, riseDist: 460, ampX: 60, fxA: 6, fxB: 9,  baseOpacity: 0.95, phaseOffset: 0    },
  { cycleDur: 18, riseDist: 520, ampX: 70, fxA: 7, fxB: 11, baseOpacity: 0.85, phaseOffset: 0.25 },
  { cycleDur: 13, riseDist: 480, ampX: 55, fxA: 8, fxB: 13, baseOpacity: 0.95, phaseOffset: 0.5  },
  { cycleDur: 16, riseDist: 540, ampX: 65, fxA: 6, fxB: 10, baseOpacity: 0.85, phaseOffset: 0.75 },
];

const scrollVanish = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(60%); }
`;

export function Smoke() {
  const puffRefs = useRef<(SVGGElement | null)[]>([null, null, null, null]);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const start = performance.now();
    const TWO_PI = Math.PI * 2;

    const loop = (now: number) => {
      const t = (now - start) / 1000;

      const turb = turbRef.current;
      if (turb) {
        const fx = 0.014 + Math.sin((t / 14) * TWO_PI) * 0.005;
        const fy = 0.024 + Math.sin((t / 19) * TWO_PI + 1.3) * 0.008;
        turb.setAttribute("baseFrequency", `${fx.toFixed(4)} ${fy.toFixed(4)}`);
      }
      const disp = dispRef.current;
      if (disp) {
        const ds = 80 + Math.sin((t / 11) * TWO_PI) * 22;
        disp.setAttribute("scale", ds.toFixed(2));
      }

      for (let i = 0; i < puffRefs.current.length; i++) {
        const el = puffRefs.current[i];
        if (!el) continue;
        const p = PUFF_PARAMS[i];

        const cyclePos = ((t / p.cycleDur) + p.phaseOffset) % 1;
        const y = -cyclePos * p.riseDist;
        const x =
          p.ampX *
          (0.6 * Math.sin((t / p.fxA) * TWO_PI + p.phaseOffset * TWO_PI) +
            0.4 * Math.sin((t / p.fxB) * TWO_PI + p.phaseOffset * TWO_PI * 0.7));
        el.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);

        const envelope = Math.sin(cyclePos * Math.PI);
        el.setAttribute("opacity", (envelope * p.baseOpacity).toFixed(3));
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: { xs: "26vh", md: "34vh" },
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.08) 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.08) 90%, transparent 100%)",
        animation: `${scrollVanish} linear both`,
        animationTimeline: "scroll(root block)",
        animationRange: "0% 100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          height: "100%",
          left: "-20%",
          width: "140%",
        }}
      >
      <svg
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMax slice"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <filter id="smoke-wisps" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.014 0.024"
              numOctaves="2"
              seed="7"
            />
            <feDisplacementMap ref={dispRef} in="SourceGraphic" scale="80" />
            <feGaussianBlur stdDeviation="12" />
          </filter>

          <radialGradient id="puff-acid" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#7fffd4" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#7fffd4" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#7fffd4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="puff-gray" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#b8c5cc" stopOpacity="0.82" />
            <stop offset="55%" stopColor="#b8c5cc" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#b8c5cc" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g filter="url(#smoke-wisps)" style={{ mixBlendMode: "screen" }}>
          <g ref={(el) => { puffRefs.current[0] = el; }}>
            <ellipse cx="180" cy="570" rx="340" ry="190" fill="url(#puff-acid)" />
          </g>
          <g ref={(el) => { puffRefs.current[1] = el; }}>
            <ellipse cx="540" cy="590" rx="380" ry="200" fill="url(#puff-gray)" />
          </g>
          <g ref={(el) => { puffRefs.current[2] = el; }}>
            <ellipse cx="820" cy="580" rx="320" ry="180" fill="url(#puff-acid)" />
          </g>
          <g ref={(el) => { puffRefs.current[3] = el; }}>
            <ellipse cx="1080" cy="570" rx="340" ry="190" fill="url(#puff-gray)" />
          </g>
        </g>
      </svg>
      </Box>
    </Box>
  );
}
