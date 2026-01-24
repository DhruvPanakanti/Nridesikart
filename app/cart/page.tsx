"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Plus, Check, X, Shield, Shirt, Home, Heart, Car, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import PillNav from "@/components/ui/PillNav";
import { GalaxyThemed } from "@/components/ui/GalaxyThemed";
import AnimatedList from "@/components/ui/AnimatedList";
import StepCard from "@/components/ui/StepCard";
import AnimatedThemeToggler from "@/components/ui/AnimatedThemeToggler";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "motion/react";

interface QuickOptService {
  id: string;
  slug: string;
  name: string;
  label: string;
  description: string;
  imageUrl: string;
  icon: React.ElementType;
}

const availableServices: QuickOptService[] = [
  {
    id: "01",
    slug: "life-insurance",
    name: "Life Insurance",
    label: "Protection",
    description: "Secure your family's future with comprehensive coverage",
    imageUrl: "/services/insurance.png",
    icon: Shield
  },
  {
    id: "02",
    slug: "fabrics",
    name: "Varanasi Fabrics",
    label: "Craftsmanship",
    description: "Premium silk fabrics with traditional craftsmanship",
    imageUrl: "/services/fabric.png",
    icon: Shirt
  },
  {
    id: "03",
    slug: "tailoring",
    name: "Custom Tailoring",
    label: "Craftsmanship",
    description: "Expert tailoring for perfect fit and style",
    imageUrl: "/services/tailoring.png",
    icon: Shirt
  },
  {
    id: "04",
    slug: "real-estate",
    name: "Real Estate",
    label: "Investment",
    description: "Smart property investments across India",
    imageUrl: "/services/real estate.png",
    icon: Home
  },
  {
    id: "05",
    slug: "jewelry",
    name: "Traditional Jewelry",
    label: "Elegance",
    description: "Exquisite Indian jewelry crafted with precision",
    imageUrl: "/services/jewllery.png",
    icon: Heart
  },
  {
    id: "06",
    slug: "auto-ads",
    name: "Auto Advertisements",
    label: "Marketing",
    description: "Mobile billboard solutions for your business",
    imageUrl: "/services/auto-ads.png",
    icon: Car
  }
];

export default function CartPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  const { items, addItem, removeItem, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  }, []);

  const handleAddService = useCallback((service: QuickOptService) => {
    const added = addItem({
      id: service.id,
      slug: service.slug,
      name: service.name,
      label: service.label,
      shortDescription: service.description,
      imageUrl: service.imageUrl
    });
    if (added) {
      showToast(`${service.name} added to cart`);
    } else {
      showToast(`${service.name} is already in cart`);
    }
  }, [addItem, showToast]);

  const handleRemoveItem = useCallback((item: { id: string; name: string; label?: string }) => {
    removeItem(item.id);
    showToast(`${item.name} removed from cart`);
  }, [removeItem, showToast]);

  const handleCheckoutComplete = useCallback(async (data: { fullName: string; email: string; phoneNumber: string }) => {
    try {
      // Save customer to database
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error(`Failed to save customer - Status: ${response.status} ${response.statusText} | Response: ${JSON.stringify(errorData)}`);
        
        // Handle duplicate user error (409 Conflict)
        if (response.status === 409) {
          showToast(`Error: ${errorData.details || 'User already exists with this email'}`);
          return; // Don't proceed with checkout
        }
        
        // For other errors, show generic message but still proceed
        showToast('Warning: Could not save your information, but you can still proceed.');
      }

      console.log("Checkout data:", {
        ...data,
        selectedServices: items.map(item => item.name)
      });
      
      setShowCheckoutModal(false);
      setSubmissionSuccess(true);
      clearCart();
      
      setTimeout(() => {
        setSubmissionSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error saving customer:', error);
      showToast('An error occurred. Please try again.');
    }
  }, [items, clearCart, showToast]);

  const isServiceInCart = useCallback((serviceId: string) => {
    return items.some(item => item.id === serviceId);
  }, [items]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0">
        <GalaxyThemed />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-24 left-1/2 z-[2000] bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message after submission */}
      <AnimatePresence>
        {submissionSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Request Submitted!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for your interest! We&apos;ll contact you shortly to discuss your selected services.
              </p>
              <button
                onClick={() => setSubmissionSuccess(false)}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all"
              >
                Continue Browsing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                // Optional: Add confirmation before closing
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md"
            >
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-10"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <StepCard
                onComplete={handleCheckoutComplete}
                onClose={() => setShowCheckoutModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
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

        <div className="absolute top-[1em] right-4 md:right-8 flex items-center gap-3 z-[1002]">
          <AnimatedThemeToggler aria-label="Toggle theme" title="Toggle theme" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-32">
        {/* Hero Section */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Your Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {items.length > 0 
                ? `${items.length} ${items.length === 1 ? 'service' : 'services'} selected`
                : 'Select services to get started'}
            </p>
          </div>
        </section>

        {/* Cart Items Section */}
        <section className="px-4 md:px-8 lg:px-16 mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border-2 border-orange-200 dark:border-orange-600/50 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-orange-500" />
                  Selected Services
                </h2>
                {items.length > 0 && (
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-10 h-10 text-orange-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You can choose services from Quick Opt below
                  </p>
                </div>
              ) : (
                <AnimatedList
                  items={items}
                  onItemRemove={handleRemoveItem}
                  showGradients={true}
                  enableArrowNavigation={true}
                  displayScrollbar={false}
                />
              )}
            </div>
          </div>
        </section>

        {/* Quick Opt Section */}
        <section className="px-4 md:px-8 lg:px-16 mb-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border-2 border-orange-200 dark:border-orange-600/50 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Quick Opt
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {items.length === 0 
                    ? "Choose services to add to your cart"
                    : "Quickly opt for more services from here"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableServices.map((service) => {
                  const isInCart = isServiceInCart(service.id);
                  const IconComponent = service.icon;
                  
                  return (
                    <motion.div
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-5 rounded-2xl border-2 transition-all duration-200 ${
                        isInCart
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600'
                          : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isInCart
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-orange-100 dark:bg-orange-900/30'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            isInCart
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-orange-600 dark:text-orange-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                            {service.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => !isInCart && handleAddService(service)}
                        disabled={isInCart}
                        className={`mt-4 w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                          isInCart
                            ? 'bg-green-500 text-white cursor-default'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg'
                        }`}
                        aria-label={isInCart ? `${service.name} already in cart` : `Add ${service.name} to cart`}
                      >
                        {isInCart ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Proceed Button */}
      <div className="fixed bottom-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-t from-white dark:from-gray-900 via-white/95 dark:via-gray-900/95 to-transparent">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setShowCheckoutModal(true)}
            disabled={items.length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl ${
              items.length === 0
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-[1.02]'
            }`}
            aria-label={items.length === 0 ? "Add services to proceed" : "Proceed with choices"}
          >
            {items.length === 0 ? (
              'Add services to proceed'
            ) : (
              <>
                Proceed with Choices
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 pb-24">
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
