"use client";

import * as React from "react";

export function useMagnetic(strength = 0.25) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      node.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      node.style.transform = `translate(0px, 0px)`;
      node.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    const handleMouseEnter = () => {
      node.style.transition = "transform 0.1s ease-out";
    };

    node.addEventListener("mousemove", handleMouseMove as EventListener);
    node.addEventListener("mouseleave", handleMouseLeave as EventListener);
    node.addEventListener("mouseenter", handleMouseEnter as EventListener);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove as EventListener);
      node.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      node.removeEventListener("mouseenter", handleMouseEnter as EventListener);
    };
  }, [strength]);

  return ref;
}
