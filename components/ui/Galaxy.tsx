"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface GalaxyProps {
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  mouseInteraction?: boolean;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  starSpeed?: number;
  speed?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
  speed: number;
}

const Galaxy: React.FC<GalaxyProps> = ({
  density = 1.3,
  glowIntensity = 0.2,
  saturation = 0,
  hueShift = 140,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  mouseInteraction = true,
  mouseRepulsion = false,
  repulsionStrength = 2,
  autoCenterRepulsion = 0,
  starSpeed = 0.5,
  speed = 1,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const createStars = (width: number, height: number): Star[] => {
    const starCount = Math.floor((width * height) / 8000 * density);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      stars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 2 + 1,
        twinkleOffset: Math.random() * Math.PI * 2,
        hue: hueShift + (Math.random() - 0.5) * 60,
        speed: (Math.random() * 0.5 + 0.5) * starSpeed,
      });
    }

    return stars;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      starsRef.current = createStars(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Use window-level events so mouse tracking works even when content is layered above
    if (mouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      timeRef.current += 0.016 * speed;

      starsRef.current.forEach((star) => {
        // Twinkle effect
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity * (1 - twinkleIntensity * 0.5 + twinkle * twinkleIntensity * 0.5);

        // Slow drift movement
        star.baseY += star.speed * 0.1;
        if (star.baseY > rect.height + 10) {
          star.baseY = -10;
          star.baseX = Math.random() * rect.width;
        }

        // Rotation effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dx = star.baseX - centerX;
        const dy = star.baseY - centerY;
        const angle = rotationSpeed * 0.001 * speed;
        const rotatedX = centerX + dx * Math.cos(angle) - dy * Math.sin(angle);
        const rotatedY = centerY + dx * Math.sin(angle) + dy * Math.cos(angle);
        star.baseX = rotatedX;
        star.baseY = rotatedY;

        // Mouse interaction
        let targetX = star.baseX;
        let targetY = star.baseY;

        if (mouseInteraction && mouseRepulsion) {
          const mouseDx = star.baseX - mouseRef.current.x;
          const mouseDy = star.baseY - mouseRef.current.y;
          const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
          const repulsionRadius = 150;

          if (mouseDist < repulsionRadius && mouseDist > 0) {
            const force = (1 - mouseDist / repulsionRadius) * repulsionStrength * 30;
            targetX += (mouseDx / mouseDist) * force;
            targetY += (mouseDy / mouseDist) * force;
          }
        }

        // Auto center repulsion - creates a constant outward push from center
        if (autoCenterRepulsion > 0) {
          const centerDx = star.baseX - centerX;
          const centerDy = star.baseY - centerY;
          const centerDist = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
          const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
          
          if (centerDist > 0) {
            const centerForce = autoCenterRepulsion * (1 - centerDist / maxDist) * 5;
            targetX += (centerDx / centerDist) * centerForce;
            targetY += (centerDy / centerDist) * centerForce;
          }
        }

        // Smooth movement towards target
        star.x += (targetX - star.x) * 0.1;
        star.y += (targetY - star.y) * 0.1;

        // Draw star with glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * (2 + glowIntensity * 3)
        );

        const starColor = `hsla(${star.hue}, ${saturation * 100}%, 80%, ${currentOpacity})`;
        const glowColor = `hsla(${star.hue}, ${saturation * 100}%, 70%, ${currentOpacity * glowIntensity})`;

        gradient.addColorStop(0, starColor);
        gradient.addColorStop(0.4, glowColor);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (2 + glowIntensity * 3), 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${saturation * 50}%, 95%, ${currentOpacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (mouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, hueShift, starSpeed, glowIntensity, saturation, twinkleIntensity, rotationSpeed, mouseInteraction, mouseRepulsion, repulsionStrength, autoCenterRepulsion, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: mouseInteraction ? "auto" : "none" }}
    />
  );
};

export default Galaxy;
