"use client";
import { useEffect, useRef } from "react";

export default function FaceFollow() {
  const faceRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!faceRef.current) return;

      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;

      faceRef.current.style.transform = `
        rotateY(${x}deg)
        rotateX(${-y}deg)
        scale(1.05)
      `;
    };

    const resetTilt = () => {
      if (faceRef.current) {
        faceRef.current.style.transform =
          "rotateY(0deg) rotateX(0deg) scale(1)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetTilt);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  return (
    <div className="flex justify-center items-center mt-5 ">
      <img
        ref={faceRef}
        src="/abd1.png"
        alt="face"
        className="w-60 h-60 transition-transform duration-150 ease-out"
      />
    </div>
  );
}
