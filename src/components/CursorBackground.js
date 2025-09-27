"use client";
import { useEffect, useRef } from "react";
import fluid from "webgl-fluid";

export default function FluidBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    fluid(canvasRef.current, {
      // Simulation resolution: controls how finely fluid velocity/pressure is calculated
      // Higher = smoother, more detailed simulation but slower performance
      SIM_RESOLUTION: 128,

      // Dye (color) resolution: controls how detailed the colors appear
      // Higher = sharper, more vibrant colors; Lower = blurry or blocky colors
      DYE_RESOLUTION: 512,

      // Density dissipation: how quickly the colors fade
      // <1 = colors linger longer (longer trails)
      // ~1 = realistic fade
      // >1 = colors vanish faster
      DENSITY_DISSIPATION: 0.99,

      // Velocity dissipation: how quickly the fluid motion slows down
      // Closer to 1 = smooth, slow-moving fluid
      // Lower = faster decay, more chaotic motion
      VELOCITY_DISSIPATION: 0.999,

      // Pressure iterations: number of solver steps for incompressibility
      // Higher = more accurate fluid movement, slower performance
      // Lower = less accurate, may look “sloppy”
      PRESSURE_ITERATIONS: 5,

      // Curl: amount of vorticity / swirling motion
      // Higher = more intense, swirling fluid
      // Lower = calmer fluid
      CURL: 10,

      // Splat radius: size of the “blob” added on cursor interaction
      // Higher = bigger splats, more noticeable fluid disturbance
      // Lower = smaller, more subtle splats
      SPLAT_RADIUS: 0.3,

      // Shading: enables pseudo-3D lighting on fluid for depth effect
      // true = adds shading and lighting effects
      SHADING: false,

      // Bloom: enables glowing effect around high-density areas
      // true = colorful glow; false = no glow
      BLOOM: false,

      // Colorful: whether splats use full random colors or grayscale
      // true = colorful splats; false = grayscale
      COLORFUL: true,

      // Transparent: whether the canvas background is transparent
      // true = shows underlying page/background
      // false = uses BACK_COLOR
      TRANSPARENT: true,

      // BACK_COLOR: RGBA array for the background color (used if TRANSPARENT=false)
      // Example: [1,1,1,1] = white
      // BACK_COLOR: [1, 1, 1, 1],
    });

    const canvas = canvasRef.current;

    const addSplat = (e) => {
      if (!window.splatPointer) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const colors = [
        [0.0, 0.6, 0.5], // teal
        [1.0, 0.8, 0.2], // mustard yellow
        [0.0, 0.5, 0.1], // slightly darker teal
        [1.0, 0.7, 0.1], // golden mustard
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
    <div
      // className="fixed inset-0  bg-white" // <-- guaranteed white background
      style={{ overflow: "hidden" }}
      className={className}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
