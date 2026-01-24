"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface FeaturedSpotlightProps {
  label?: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  imageUrl: string;
  index: string;
  imageAlt?: string;
  serviceSlug?: string;
  onChooseService?: () => void;
}

export function FeaturedSpotlight({
  label = "Featured",
  titleLine1,
  titleLine2,
  description,
  imageUrl,
  index,
  imageAlt = "Service image",
  serviceSlug,
  onChooseService
}: FeaturedSpotlightProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative flex cursor-pointer flex-col items-center gap-8 md:flex-row md:items-start md:gap-12 lg:gap-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left: Text Block */}
      <div className="relative z-10 flex w-full max-w-[320px] shrink-0 flex-col items-center text-center md:w-[240px] md:items-start md:text-left lg:w-[280px] lg:pt-4">
        {/* Label with animated line */}
        <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
          <div
            className="h-px bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 transition-all duration-700"
            style={{
              width: isHovered ? 48 : 32,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-900 dark:text-white transition-all duration-700 md:text-xs"
            style={{
              letterSpacing: isHovered ? "0.3em" : "0.25em",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {label}
          </span>
        </div>

        {/* Title - responsive text sizes */}
        <h2 className="relative">
          <span
            className="block text-4xl font-normal tracking-tight text-gray-900 dark:text-white transition-all duration-700 sm:text-5xl md:text-5xl lg:text-6xl"
            style={{
              transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {titleLine1}
          </span>
          <span
            className="block text-4xl font-normal tracking-tight text-gray-900 dark:text-white transition-all duration-700 sm:text-5xl md:text-5xl lg:text-6xl"
            style={{
              transform: isHovered ? "translateX(12px)" : "translateX(0)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {titleLine2}
          </span>
        </h2>

        {/* Description - responsive spacing */}
        <p
          className="mt-6 max-w-[260px] text-sm leading-relaxed transition-all duration-700 md:mt-8 md:max-w-[220px] md:text-base lg:mt-10 lg:max-w-[240px] text-gray-700 dark:text-gray-300"
          style={{
            opacity: isHovered ? 1 : 0.8,
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {description}
        </p>

        {/* Minimal CTA - responsive spacing */}
        {serviceSlug ? (
          <Link href={`/services/${serviceSlug}`} className="mt-6 flex items-center gap-4 md:mt-8 lg:mt-10">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 md:h-11 md:w-11 lg:h-12 lg:w-12"
              style={{
                borderColor: isHovered ? "#f97316" : "rgb(107 114 128 / 0.3)",
                backgroundColor: isHovered ? "#f97316" : "transparent",
                color: isHovered ? "#ffffff" : "#f97316",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                boxShadow: isHovered ? "0 8px 32px rgb(249 115 22 / 0.3)" : "0 0 0 transparent",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 md:h-4 md:w-4"
                style={{
                  transform: isHovered ? "rotate(45deg)" : "rotate(0deg)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
            <span
              className="text-[10px] font-medium uppercase tracking-widest transition-all duration-700 md:text-xs text-gray-900 dark:text-white"
              style={{
                opacity: isHovered ? 1 : 0.5,
                transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: isHovered ? "100ms" : "0ms",
              }}
            >
              Explore
            </span>
          </Link>
        ) : (
          <div className="mt-6 flex items-center gap-4 md:mt-8 lg:mt-10">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 md:h-11 md:w-11 lg:h-12 lg:w-12"
              style={{
                borderColor: isHovered ? "#f97316" : "rgb(107 114 128 / 0.3)",
                backgroundColor: isHovered ? "#f97316" : "transparent",
                color: isHovered ? "#ffffff" : "#f97316",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                boxShadow: isHovered ? "0 8px 32px rgb(249 115 22 / 0.3)" : "0 0 0 transparent",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 md:h-4 md:w-4"
                style={{
                  transform: isHovered ? "rotate(45deg)" : "rotate(0deg)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
            <span
              className="text-[10px] font-medium uppercase tracking-widest transition-all duration-700 md:text-xs text-gray-900 dark:text-white"
              style={{
                opacity: isHovered ? 1 : 0.5,
                transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: isHovered ? "100ms" : "0ms",
              }}
            >
              Explore
            </span>
          </div>
        )}

        {/* Choose Service Button */}
        {onChooseService && (
          <div className="mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChooseService();
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Choose Service
            </button>
          </div>
        )}
      </div>

      {/* Right: Image Block */}
      <div
        className="relative transition-all duration-700"
        style={{
          transform: isHovered ? "translateX(4px) translateY(-4px)" : "translateX(0) translateY(0)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Frame outline */}
        <div
          className="absolute -inset-3 border transition-all duration-700 md:-inset-4"
          style={{
            borderColor: isHovered ? "rgb(249 115 22 / 0.3)" : "transparent",
            transform: isHovered ? "scale(1.01)" : "scale(1)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Image container - responsive sizing */}
        <div className="relative h-[280px] w-[260px] overflow-hidden sm:h-[320px] sm:w-[300px] md:h-[360px] md:w-[320px] lg:h-[420px] lg:w-[380px]">
          <div
            className="absolute -inset-1 transition-all duration-700"
            style={{
              boxShadow: isHovered ? "0 24px 64px rgb(0 0 0 / 0.15)" : "0 0 0 transparent",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover transition-all duration-1000"
            style={{
              transform: isHovered ? "scale(1.03)" : "scale(1)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent transition-opacity duration-700"
            style={{
              opacity: isHovered ? 1 : 0,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Corner accents - changed to orange */}
          <div
            className="absolute left-2 top-2 h-5 w-px bg-orange-500/80 transition-all duration-500 md:left-3 md:top-3 md:h-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "50ms",
            }}
          />
          <div
            className="absolute left-2 top-2 h-px w-5 bg-orange-500/80 transition-all duration-500 md:left-3 md:top-3 md:w-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "100ms",
            }}
          />
          <div
            className="absolute bottom-2 right-2 h-5 w-px bg-orange-500/80 transition-all duration-500 md:bottom-3 md:right-3 md:h-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "150ms",
            }}
          />
          <div
            className="absolute bottom-2 right-2 h-px w-5 bg-orange-500/80 transition-all duration-500 md:bottom-3 md:right-3 md:w-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "right",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "200ms",
            }}
          />
        </div>

        {/* Index number */}
        <span
          className="absolute -bottom-6 right-0 font-mono text-xs text-gray-600 dark:text-gray-400 transition-all duration-700 md:-bottom-8 md:text-sm"
          style={{
            opacity: isHovered ? 1 : 0.4,
            transform: isHovered ? "translateY(12px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {index}
        </span>
      </div>
    </div>
  )
}
