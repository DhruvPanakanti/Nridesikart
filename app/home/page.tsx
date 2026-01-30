"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, CheckCircle, Users, MessageCircle, UserCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { GalaxyThemed } from "@/components/ui/GalaxyThemed";
import PillNav from "@/components/ui/PillNav";
import AnimatedContent from "@/components/ui/AnimatedContent";
import AnimatedThemeToggler from "@/components/ui/AnimatedThemeToggler";

export default function HomePage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const currentTheme = resolvedTheme || theme;

  if (!mounted) {
    return null;
  }

  const steps = [
    {
      number: 1,
      title: "Explore Our Services",
      description: "Browse through a wide range of NRI services in India available on the Nridesikart platform. Each service is carefully curated to meet the unique needs of Non-Resident Indians, ensuring quality, reliability, and affordability.",
      icon: Search,
      color: "blue"
    },
    {
      number: 2,
      title: "Select Your Required Service & Proceed to Checkout",
      description: "Choose the service that best fits your requirements and proceed to checkout. Our streamlined process ensures a secure and hassle-free service booking experience for NRIs.",
      icon: ShoppingCart,
      color: "green"
    },
    {
      number: 3,
      title: "Provide Your Details",
      description: "Fill in your essential details accurately to help us understand your needs better. This enables us to deliver personalized NRI support services in India with greater efficiency.",
      icon: CheckCircle,
      color: "purple"
    },
    {
      number: 4,
      title: "Join the Nridesikart Community",
      description: "Become part of the Nridesikart community to activate your service and begin your journey with us.",
      icon: Users,
      color: "orange",
      subPoints: [
        { icon: Users, text: "Join the Community – Get connected through our official communication channel." },
        { icon: MessageCircle, text: "Notify the Admin – Inform our admin team about your selected service." },
        { icon: UserCheck, text: "Get Connected to a Service Provider – We will connect you with a verified service provider and guide you every step of the way to ensure a smooth and successful experience." }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; gradient: string }> = {
      blue: {
        bg: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
        border: "border-blue-200 dark:border-blue-600 hover:border-blue-400",
        icon: "bg-blue-500 dark:bg-blue-600",
        gradient: "from-blue-500 to-indigo-500"
      },
      green: {
        bg: "from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
        border: "border-green-200 dark:border-green-600 hover:border-green-400",
        icon: "bg-green-500 dark:bg-green-600",
        gradient: "from-green-500 to-emerald-500"
      },
      purple: {
        bg: "from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20",
        border: "border-purple-200 dark:border-purple-600 hover:border-purple-400",
        icon: "bg-purple-500 dark:bg-purple-600",
        gradient: "from-purple-500 to-violet-500"
      },
      orange: {
        bg: "from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20",
        border: "border-orange-200 dark:border-orange-600 hover:border-orange-400",
        icon: "bg-orange-500 dark:bg-orange-600",
        gradient: "from-orange-500 to-red-500"
      }
    };
    return colors[color] || colors.blue;
  };

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
            src="/logo.png"
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
            pillTextColor={currentTheme === "dark" ? "#E5E7EB" : "#000000"}
          />
        </div>

        {/* Right Section: Theme Toggle */}
        <div className="absolute top-[1em] right-4 md:right-8 z-[1002]">
          <AnimatedThemeToggler
            aria-label="Toggle theme"
            title="Toggle theme"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section with Logo and Company Description */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
          {/* Large Logo */}
          <AnimatedContent
            distance={80}
            direction="vertical"
            reverse={true}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.9}
            threshold={0.2}
            delay={0.1}
          >
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Nridesikart Logo"
                width={150}
                height={150}
                className="rounded-full shadow-2xl mx-auto"
              />
            </div>
          </AnimatedContent>

          <AnimatedContent
            distance={60}
            direction="vertical"
            reverse={true}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
            delay={0.3}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Nridesikart
              </span>
            </h1>
          </AnimatedContent>

          {/* Company Description */}
          <AnimatedContent
            distance={80}
            direction="vertical"
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
            delay={0.5}
          >
            <div className="max-w-4xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-orange-200 dark:border-orange-600 shadow-xl">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Nridesikart is a dedicated digital platform built to support NRIs looking for dependable services and shopping solutions in India. Our platform enables Non-Resident Indians to access high-quality Indian services at reasonable costs, without the complexities of distance or coordination. We act as a reliable bridge between NRIs and India by offering carefully curated services, transparent pricing, and consistent support. With Nridesikart, your experience of shopping and availing services in India becomes efficient, trustworthy, and stress-free.
              </p>
            </div>
          </AnimatedContent>
        </section>

        {/* How to Opt for Services Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <AnimatedContent
            distance={60}
            direction="vertical"
            reverse={true}
            duration={0.9}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.15}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
              How to Opt for Our Services
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg max-w-2xl mx-auto">
              Follow these simple steps to begin your journey with Nridesikart
            </p>
          </AnimatedContent>

          <div className="max-w-5xl mx-auto space-y-8">
            {steps.map((step, index) => {
              const colorClasses = getColorClasses(step.color);
              const IconComponent = step.icon;

              return (
                <AnimatedContent
                  key={step.number}
                  distance={100}
                  direction="horizontal"
                  reverse={index % 2 === 0}
                  duration={0.9}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.15}
                  delay={index * 0.15}
                >
                  <div
                    className={`bg-gradient-to-br ${colorClasses.bg} backdrop-blur-md rounded-3xl p-8 border-2 ${colorClasses.border} hover:shadow-2xl transition-all duration-300`}
                  >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Step Number and Icon */}
                    <div className="flex items-center gap-4">
                      <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${colorClasses.gradient} bg-clip-text text-transparent`}>
                        {step.number}
                      </div>
                      <div className={`w-14 h-14 rounded-full ${colorClasses.icon} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-4">
                        {step.description}
                      </p>

                      {/* Sub-points for Step 4 */}
                      {step.subPoints && (
                        <div className="mt-6 space-y-4">
                          <p className="text-gray-800 dark:text-gray-200 font-medium">Once you join:</p>
                          <ul className="space-y-3">
                            {step.subPoints.map((subPoint, subIndex) => {
                              const SubIcon = subPoint.icon;
                              return (
                                <li key={subIndex} className="flex items-start gap-3 bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                                  <div className={`w-8 h-8 rounded-full ${colorClasses.icon} flex items-center justify-center flex-shrink-0`}>
                                    <SubIcon className="w-4 h-4 text-white" strokeWidth={2} />
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300 text-base">
                                    {subPoint.text}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  </div>
                </AnimatedContent>
              );
            })}
          </div>
        </section>

        {/* Closing Statement Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <AnimatedContent
            distance={80}
            direction="vertical"
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.95}
            threshold={0.15}
          >
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-orange-300 dark:border-orange-600 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Your Nridesikart Journey Begins Here
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                From service selection to successful execution, Nridesikart acts as a trusted bridge between NRIs and dependable service providers in India—making your experience simple, transparent, and stress-free.
              </p>
              <Link
                href="/services"
                className="px-10 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:scale-105 inline-block"
              >
                Explore Services →
              </Link>
            </div>
          </AnimatedContent>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 dark:bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-base mb-4">
            © 2025 Nridesikart. All rights reserved.
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
