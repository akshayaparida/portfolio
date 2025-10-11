"use client";

import { useEffect } from "react";

export default function CursorEffect() {
  useEffect(() => {
    let lastDotTime = 0;
    const dotInterval = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();

      if (currentTime - lastDotTime < dotInterval) {
        return;
      }

      lastDotTime = currentTime;

      const dot = document.createElement("div");
      dot.className = "cursor-dot";
      dot.style.left = e.clientX - 3 + "px";
      dot.style.top = e.clientY - 3 + "px";

      document.body.appendChild(dot);

      setTimeout(() => {
        dot.remove();
      }, 800);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
