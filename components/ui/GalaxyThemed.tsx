"use client";

import { useTheme } from "next-themes";
import Galaxy from "./Galaxy";
import { useEffect, useState } from "react";

export function GalaxyThemed() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";
  const densityMultiplier = isMobile ? 0.6 : 1.0;

  if (isDark) {
    return (
      <Galaxy
        mouseRepulsion={!isMobile}
        mouseInteraction={!isMobile}
        density={1.4 * densityMultiplier}
        glowIntensity={0.35}
        saturation={0.3}
        hueShift={30}
        twinkleIntensity={0.4}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
        className="absolute inset-0 w-full h-full"
      />
    );
  } else {
    return (
      <Galaxy
        mouseRepulsion={!isMobile}
        mouseInteraction={!isMobile}
        density={1.2 * densityMultiplier}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={25}
        twinkleIntensity={0.5}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
        className="absolute inset-0 w-full h-full"
      />
    );
  }
}

export default GalaxyThemed;
