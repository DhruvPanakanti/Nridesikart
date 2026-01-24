"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { GalaxyThemed } from "@/components/ui/GalaxyThemed";
import PillNav from "@/components/ui/PillNav";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { useCart } from "@/contexts/CartContext";
import AnimatedContent from "@/components/ui/AnimatedContent";
import AnimatedThemeToggler from "@/components/ui/AnimatedThemeToggler";

interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  label: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "life-insurance": {
    id: "01",
    slug: "life-insurance",
    name: "Life Insurance",
    label: "Protection",
    shortDescription: "Secure your family's future with Indian insurance policies tailored for NRIs.",
    longDescription: "Life insurance plans in India offer NRIs an effective way to secure their family's future while building long-term savings. These plans provide economical premiums, global benefits, and easy repatriation of funds. They also offer attractive guaranteed and equity-linked returns along with tax-efficient maturity benefits as per applicable laws. Overall, life insurance serves as a reliable tool for protection, savings, and financial planning across borders.",
    images: [
      "/services/insurance.png",
      "/services/insurance1.png",
      "/services/insurance2.png"
    ]
  },
  "fabrics": {
    id: "02",
    slug: "fabrics",
    name: "Varanasi Fabrics",
    label: "Craftsmanship",
    shortDescription: "Premium Varanasi silk fabrics known for rich heritage and intricate zari weaving.",
    longDescription: "Varanasi fabrics are known for their rich heritage, fine silk textures, and intricate zari weaving. Crafted using traditional techniques passed down through generations, these fabrics feature elegant motifs, detailed borders, and timeless designs. They are widely cherished for festive wear, weddings, and special occasions. Each piece reflects skilled craftsmanship and the cultural legacy of Varanasi, making them a treasured addition to any wardrobe.",
    images: [
      "/services/fabric.png",
      "/services/fabrics1.png",
      "/services/fabrics2.png"
    ]
  },
  "tailoring": {
    id: "03",
    slug: "tailoring",
    name: "Custom Tailoring",
    label: "Craftsmanship",
    shortDescription: "Custom tailoring services offering perfect fit, comfort, and style.",
    longDescription: "Tailoring services offer custom stitching designed to ensure the perfect fit, comfort, and style. From traditional ethnic wear to modern outfits, each garment is crafted with attention to detail and quality finishing. Personalized measurements and fabric handling ensure durability and elegance. These services are ideal for everyday wear, festive occasions, and special events.",
    images: [
      "/services/tailoring.png",
      "/services/tailoring1.png",
      "/services/tailoring2.png"
    ]
  },
  "real-estate": {
    id: "04",
    slug: "real-estate",
    name: "Real Estate",
    label: "Investment",
    shortDescription: "Invest in property across India with expert guidance.",
    longDescription: "An ultra-luxury residential skyscraper in Hyderabad's Financial District is designed to offer a refined urban lifestyle with world-class architecture and amenities. Spread across a spacious 6-acre site, the development features multiple high-rise towers, expansive green landscapes, and exclusive sky lounges. The project emphasizes sustainability, vastu compliance, privacy, and abundant natural light. With premium residences and comprehensive indoor and outdoor amenities, it redefines contemporary luxury living.",
    images: [
      "/services/real estate.png",
      "/services/real estate1.png",
      "/services/real estate2.png"
    ]
  },
  "jewelry": {
    id: "05",
    slug: "jewelry",
    name: "Traditional Jewelry",
    label: "Elegance",
    shortDescription: "Exquisite Indian jewelry crafted with precision.",
    longDescription: "Traditional jewelry reflects timeless craftsmanship, cultural heritage, and refined elegance. Designed using high-quality metals and intricate detailing, each piece blends classic artistry with modern style. From everyday wear to special occasions, these collections celebrate beauty, devotion, and tradition. The designs are crafted to suit diverse preferences while preserving authenticity and elegance.",
    images: [
      "/services/jewllery.png",
      "/services/jewllery1.png",
      "/services/jewllery2.png"
    ]
  },
  "auto-ads": {
    id: "06",
    slug: "auto-ads",
    name: "Auto Advertisements",
    label: "Marketing",
    shortDescription: "Promote your business across India with auto rickshaw advertising.",
    longDescription: "Auto advertising is a high-visibility outdoor marketing solution that turns everyday vehicles into moving billboards. It enables brands to reach audiences across busy streets, residential areas, and commercial hubs throughout the day. Unlike static ads, mobile branding ensures repeated exposure and stronger recall. Campaigns can be strategically planned based on routes and target locations, making them both cost-effective and impactful.",
    images: [
      "/services/auto-ads.png",
      "/services/auto-ads1.png",
      "/services/auto-ads2.png"
    ]
  }
};

export default function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ service_name: string }> 
}) {
  const { service_name } = use(params);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const currentTheme = resolvedTheme || theme;

  const service = serviceDetails[service_name];

  if (!service) {
    notFound();
  }

  const handleChooseService = () => {
    const wasAdded = addItem({
      id: service.id,
      slug: service.slug,
      name: service.name,
      label: service.label,
      shortDescription: service.shortDescription,
      imageUrl: service.images[0]
    });
    
    if (wasAdded) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      // Already in cart - show different feedback
      setAdded(false);
      alert(`${service.name} is already in your cart!`);
    }
  };

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
      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>

          {/* Service Header */}
          <header className="text-center mb-16">
            <AnimatedContent
              distance={60}
              direction="vertical"
              reverse={true}
              duration={0.9}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0.1}
            >
              <span className="text-sm uppercase tracking-widest text-orange-500 font-semibold">
                {service.label}
              </span>
            </AnimatedContent>
            <AnimatedContent
              distance={80}
              direction="vertical"
              reverse={true}
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0.25}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500">
                  {service.name}
                </span>
              </h1>
            </AnimatedContent>
            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.9}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0.4}
            >
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                {service.shortDescription}
              </p>
            </AnimatedContent>
          </header>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Description */}
            <AnimatedContent
              distance={100}
              direction="horizontal"
              reverse={true}
              duration={0.9}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.15}
            >
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About This Service
              </h2>
              
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                {service.longDescription}
              </p>
              
              {/* Choose Service Button */}
              <button
                onClick={handleChooseService}
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {added ? "✓ Added to Cart!" : "Choose This Service"}
              </button>
              </div>
            </AnimatedContent>
            
            {/* Right: CardSwap Gallery */}
            <AnimatedContent
              distance={100}
              direction="horizontal"
              duration={0.9}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.15}
              delay={0.15}
            >
              <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
              <div className="relative w-full h-full">
                <CardSwap
                  width={400}
                  height={320}
                  cardDistance={50}
                  verticalDistance={55}
                  delay={5000}
                  pauseOnHover
                >
                {service.images.map((img, index) => (
                  <Card key={index}>
                    <img
                      src={img}
                      alt={`${service.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </Card>
                ))}
                </CardSwap>
              </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
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
