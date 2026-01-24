"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  items: NavItem[];
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  className?: string;
}

const PillNav: React.FC<PillNavProps> = ({
  items,
  ease = "power2.easeOut",
  baseColor = "#000000",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#000000",
  className
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { count: cartCount } = useCart();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, index: number) => {
    setActiveIndex(index);
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
      
      // Update URL without page reload
      window.history.pushState(null, '', href);
    }
  }, [scrollToSection]);

  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const index = items.findIndex(item => item.href === hash);
      if (index !== -1) {
        setActiveIndex(index);
        // Small delay to ensure DOM is ready
        setTimeout(() => scrollToSection(hash.substring(1)), 100);
      }
    }
  }, [items, scrollToSection]);

  useEffect(() => {
    if (!navRef.current || !pillRef.current) return;

    const links = navRef.current.querySelectorAll("a");
    const pill = pillRef.current;

    const updatePill = (index: number) => {
      const link = links[index];
      if (!link) return;

      const linkRect = link.getBoundingClientRect();
      const navRect = navRef.current!.getBoundingClientRect();

      gsap.to(pill, {
        width: linkRect.width,
        x: linkRect.left - navRect.left,
        duration: 0.5,
        ease: ease
      });
    };

    updatePill(activeIndex);

    links.forEach((link, index) => {
      link.addEventListener("mouseenter", () => updatePill(index));
    });

    navRef.current.addEventListener("mouseleave", () => updatePill(activeIndex));

    return () => {
      links.forEach((link, index) => {
        link.removeEventListener("mouseenter", () => updatePill(index));
      });
    };
  }, [activeIndex, ease]);

  return (
    <>
      {/* Desktop Navigation */}
      <div
        ref={navRef}
        className={cn("hidden md:flex relative items-center gap-[3px] p-[3px] rounded-[50px]", className)}
        style={{
          backgroundColor: baseColor,
          border: `2px solid ${baseColor}`
        }}
      >
        <div
          ref={pillRef}
          className="absolute h-[calc(100%-6px)] rounded-[50px] transition-all"
          style={{ backgroundColor: pillColor }}
        />

        {items.map((item, index) => (
          <a
            key={`nav-${index}`}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href, index)}
            className="relative z-10 py-2 px-6 text-[15px] font-medium rounded-[50px] transition-colors duration-300 cursor-pointer"
            style={{
              color: activeIndex === index ? hoveredPillTextColor : pillTextColor
            }}
          >
            {item.label}
            {item.label.toLowerCase() === 'cart' && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-[1003] w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-900 dark:text-white" />
        ) : (
          <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[1001]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 h-full w-64 z-[1002] transition-transform duration-300",
          "bg-white dark:bg-gray-900 shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-20 px-4">
          <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
            {items.map((item, index) => (
              <li key={`mobile-nav-${index}`}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href, index);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "block py-3 px-4 text-[16px] font-medium rounded-lg transition-all cursor-pointer relative",
                    activeIndex === index
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "text-black dark:text-white hover:bg-orange-50 dark:hover:bg-gray-800"
                  )}
                >
                  {item.label}
                  {item.label.toLowerCase() === 'cart' && cartCount > 0 && (
                    <span className="absolute top-1 right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PillNav;
