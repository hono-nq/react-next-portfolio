"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      pendingRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        const point = pendingRef.current;
        if (!point) return;

        const sparkle = document.createElement("span");
        sparkle.className = "cursor-sparkle";
        sparkle.style.left = `${point.x}px`;
        sparkle.style.top = `${point.y}px`;

        const size = 12 + Math.random() * 8;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        const offsetX = (Math.random() - 0.5) * 12;
        const offsetY = (Math.random() - 0.5) * 12;
        const rotate = (Math.random() - 0.5) * 40;
        sparkle.style.setProperty("--sparkle-offset-x", `${offsetX}px`);
        sparkle.style.setProperty("--sparkle-offset-y", `${offsetY}px`);
        sparkle.style.setProperty("--sparkle-rotate", `${rotate}deg`);

        container.appendChild(sparkle);

        const duration = 600;
        window.setTimeout(() => {
          sparkle.remove();
        }, duration);

        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="cursor-effect" />;
}
