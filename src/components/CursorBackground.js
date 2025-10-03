"use client";
import { useEffect, useRef } from "react";
import fluid from "webgl-fluid";

export default function FluidBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Step 1: Override splatPointer to ignore first automatic splat
    const originalSplatPointer = window.splatPointer;
    window.splatPointer = () => {}; // ignore default initial splat

    // Step 2: Initialize fluid simulation
    fluid(canvas, {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.99,
      VELOCITY_DISSIPATION: 0.999,
      PRESSURE_ITERATIONS: 5,
      CURL: 5,
      SPLAT_RADIUS: 0.3,
      SHADING: false,
      BLOOM: false,
      COLORFUL: true,
      TRANSPARENT: true,
    });

    // Step 3: Restore splatPointer for user interactions
    window.splatPointer = originalSplatPointer;

    // Step 4: Add user-controlled splats
    const addSplat = (e) => {
      if (!window.splatPointer) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const colors = [
        [0.0, 0.6, 0.5],
        [1.0, 0.8, 0.2],
        [0.0, 0.5, 0.1],
        [1.0, 0.7, 0.1],
      ];

      window.splatPointer({
        x,
        y,
        dx: (Math.random() - 0.5) * 0.03,
        dy: (Math.random() - 0.5) * 0.03,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    canvas.addEventListener("mousemove", addSplat);
    return () => canvas.removeEventListener("mousemove", addSplat);
  }, []);

  return (
    <div style={{ overflow: "hidden" }} className={className}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
