"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { GalaxyThemed } from "@/components/ui/GalaxyThemed";
import PillNav from "@/components/ui/PillNav";
import { FeaturedSpotlight } from "@/components/ui/featured-spotlight";

export default function ServicesPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const currentTheme = resolvedTheme || theme;

  const services = [
    {
      label: "Protection",
      titleLine1: "Life",
      titleLine2: "Insurance",
      description: "Secure your family's future with Indian insurance policies tailored for NRIs. Comprehensive coverage, transparent terms, and reliable support.",
      imageUrl: "/services/insurance.png",
      imageAlt: "Life insurance coverage with umbrella and shield protection",
      index: "01"
    },
    {
      label: "Craftsmanship",
      titleLine1: "Fabrics &",
      titleLine2: "Tailoring",
      description: "Premium Indian fabrics and custom tailoring services. Experience authentic craftsmanship and traditional designs delivered to your doorstep.",
      imageUrl: "/services/tailoring.png",
      imageAlt: "Vintage sewing machine with premium Indian fabrics",
      index: "02"
    },
    {
      label: "Investment",
      titleLine1: "Real",
      titleLine2: "Estate",
      description: "Invest in property across India with expert guidance. From residential to commercial, we help NRIs make informed real estate decisions.",
      imageUrl: "/services/real estate.png",
      imageAlt: "Modern residential property in India with landscaping",
      index: "03"
    },
    {
      label: "Elegance",
      titleLine1: "Traditional",
      titleLine2: "Jewelry",
      description: "Exquisite Indian jewelry crafted with precision. From traditional gold ornaments to contemporary designs, bring home authentic Indian craftsmanship.",
      imageUrl: "/services/jewllery.png",
      imageAlt: "Traditional Indian gold necklace with emerald gemstones",
      index: "04"
    },
    {
      label: "Marketing",
      titleLine1: "Auto",
      titleLine2: "Advertisements",
      description: "Promote your business across India with auto rickshaw advertising. Reach local communities effectively with mobile billboard solutions.",
      imageUrl: "/services/auto-ads.png",
      imageAlt: "Auto rickshaw with brand advertisement in Indian street",
      index: "05"
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0">
        <GalaxyThemed />
      </div>

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
        {/* Logo */}
        <Link
          href="/"
          className="absolute top-[1em] left-4 md:left-8 z-[1002] transition-transform hover:scale-110"
        >
          <Image
            src="/logo.svg"
            alt="Nridesikart Logo"
            width={50}
            height={50}
            className="rounded-full shadow-lg"
          />
        </Link>

        {/* Center Navigation */}
        <div className="flex items-center justify-center py-4">
          <PillNav
            items={[
              { label: "Home", href: "/home" },
              { label: "Services", href: "/services" },
              { label: "Cart", href: "/cart" }
            ]}
            ease="power2.easeOut"
            baseColor={currentTheme === "dark" ? "#1F2937" : "#FFFFFF"}
            pillColor={currentTheme === "dark" ? "#F97316" : "#FF6B35"}
            hoveredPillTextColor="#FFFFFF"
            pillTextColor={currentTheme === "dark" ? "#E5E7EB" : "#1F2937"}
          />
        </div>

        {/* Right Section: Theme Toggle */}
        <div className="absolute top-[1em] right-4 md:right-8 z-[1002]">
          <button
            onClick={toggleTheme}
            className="w-[44px] h-[44px] rounded-full bg-gradient-to-r from-orange-400 to-red-400 dark:from-purple-500 dark:to-pink-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
          >
            {currentTheme === "light" ? (
              <Moon className="w-5 h-5 text-white" strokeWidth={2} />
            ) : (
              <Sun className="w-5 h-5 text-white" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Page Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500">
                Our Services
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              Connecting NRIs with Trusted Indian Services
            </p>
            
            {/* Optional Description */}
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience authentic Indian services from the comfort of your home in the USA
            </p>

            {/* Decorative Line */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-500"></div>
              <div className="h-1 w-1 rounded-full bg-orange-500"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-500"></div>
            </div>
          </div>
        </section>

        {/* Services List */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {services.map((service, index) => (
            <section 
              key={service.index} 
              id={`service-${service.index}`}
              className={`py-16 md:py-20 lg:py-24 ${index !== services.length - 1 ? 'border-b border-gray-200/20 dark:border-gray-700/20' : ''}`}
            >
              {/* Alternate layout direction for visual variety */}
              <div className={`flex justify-center ${index % 2 === 1 ? 'md:[&>div]:flex-row-reverse' : ''}`}>
                <FeaturedSpotlight
                  label={service.label}
                  titleLine1={service.titleLine1}
                  titleLine2={service.titleLine2}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  index={service.index}
                  imageAlt={service.imageAlt}
                />
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <section className="py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-orange-300 dark:border-orange-600 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of NRIs who trust Nridesikart for their Indian service needs
            </p>
            <Link 
              href="/home"
              className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-2xl hover:scale-105"
            >
              Explore How It Works
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 dark:bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-base mb-4">
            © 2024 Nridesikart. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-orange-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
