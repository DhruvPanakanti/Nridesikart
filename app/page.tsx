"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, Shield, Shirt, Home, Car, Users, Target, Heart, Globe, Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { GalaxyThemed } from "@/components/ui/GalaxyThemed";
import PillNav from "@/components/ui/PillNav";

export default function LandingPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  const services = [
    {
      id: "insurance",
      title: "Life Insurance",
      description: "Secure your family's future with comprehensive Indian insurance policies. We partner with top insurance providers in India to offer you the best coverage options.",
      icon: Shield,
      features: ["Term Life Insurance", "Whole Life Policies", "Investment-linked Plans", "Health Insurance Add-ons"],
      bgGradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      borderColor: "border-blue-200 dark:border-blue-600",
      iconBg: "bg-blue-500 dark:bg-blue-600"
    },
    {
      id: "tailoring",
      title: "Fabrics & Tailoring",
      description: "Premium Indian fabrics and expert custom tailoring services. Get authentic Indian clothing made to your exact measurements and delivered to your doorstep.",
      icon: Shirt,
      features: ["Silk Sarees", "Custom Suits & Sherwanis", "Bridal Wear", "Traditional Outfits"],
      bgGradient: "from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20",
      borderColor: "border-pink-200 dark:border-pink-600",
      iconBg: "bg-pink-500 dark:bg-pink-600"
    },
    {
      id: "realestate",
      title: "Real Estate",
      description: "Smart property investments across India with expert guidance. Whether you're looking to buy, sell, or invest in Indian real estate, we've got you covered.",
      icon: Home,
      features: ["Property Search", "Investment Advisory", "Legal Documentation", "Property Management"],
      bgGradient: "from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-200 dark:border-green-600",
      iconBg: "bg-green-500 dark:bg-green-600"
    },
    {
      id: "auto",
      title: "Auto Advertisements",
      description: "Buy, sell, or advertise vehicles in India hassle-free. Our platform connects you with verified buyers and sellers across major Indian cities.",
      icon: Car,
      features: ["Vehicle Listings", "Buyer-Seller Matching", "Price Negotiation", "Documentation Help"],
      bgGradient: "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20",
      borderColor: "border-amber-200 dark:border-amber-600",
      iconBg: "bg-amber-500 dark:bg-amber-600"
    }
  ];

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
              { label: "Home", href: "#hero" },
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Contact", href: "#contact" }
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
          {/* Theme Toggle */}
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
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
          <div className="inline-block px-6 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-300 dark:border-orange-600 mb-6">
            <span className="text-orange-700 dark:text-orange-300 font-semibold text-sm">
              🇮🇳 Connecting NRIs with India Since 2024
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Nridesikart
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            Experience authentic Indian services from the comfort of your home in the USA
          </p>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            From life insurance to custom tailoring, real estate investments to automobile deals —
            we bring India to your doorstep
          </p>

          <Link
            href="/home"
            className="px-10 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:scale-105"
          >
            Explore Our Services →
          </Link>
        </section>

        {/* How We Work Section */}
        <section id="how-it-works" className="py-20 px-4 md:px-8 lg:px-16 bg-white/50 dark:bg-gray-800/30">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
            How We Work
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg">
            Simple, transparent, and reliable — three easy steps to get started
          </p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 hover:border-orange-400 dark:hover:border-orange-400 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Browse Services
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Explore our wide range of Indian services tailored specifically for NRIs living in the USA
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 hover:border-orange-400 dark:hover:border-orange-400 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Place Your Order
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Select your desired service and provide necessary details through our secure platform
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 hover:border-orange-400 dark:hover:border-orange-400 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                We Deliver
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Our trusted team in India processes your request and delivers results directly to you
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              About Nridesikart
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Your trusted bridge to India, offering authentic Indian services
              to Non-Resident Indians living in the USA.
            </p>
          </div>

          {/* Our Story */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Our Story
            </h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Founded in 2024, Nridesikart was born from a simple observation: NRIs often struggle 
                  to access reliable services back home in India. Whether it&apos;s securing life insurance, 
                  getting custom tailoring done, investing in real estate, or buying/selling vehicles — 
                  the distance makes everything complicated.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We bridge that gap. Our team of dedicated professionals in both the USA and India 
                  ensures seamless service delivery, bringing the comfort and reliability of Indian 
                  services right to your doorstep in America.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600">
                <div className="text-6xl font-bold text-orange-600 dark:text-orange-400 mb-4">2024</div>
                <p className="text-xl text-gray-700 dark:text-gray-300">Year Founded</p>
                <div className="mt-6 pt-6 border-t border-orange-200 dark:border-orange-600">
                  <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">5000+</div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Happy Customers Served</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Our Values
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Trust</h4>
                <p className="text-gray-700 dark:text-gray-300">Building lasting relationships through honesty and transparency</p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quality</h4>
                <p className="text-gray-700 dark:text-gray-300">Delivering excellence in every service we provide</p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Community</h4>
                <p className="text-gray-700 dark:text-gray-300">Strengthening the NRI community connection with India</p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Reach</h4>
                <p className="text-gray-700 dark:text-gray-300">Serving 50+ cities across India with local expertise</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Expanded */}
        <section id="services" className="py-20 px-4 md:px-8 lg:px-16 bg-white/50 dark:bg-gray-800/30">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Comprehensive solutions for all your India-related needs. 
              Quality service, transparent pricing, and reliable delivery.
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-12">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-gradient-to-br ${service.bgGradient} backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 ${service.borderColor} hover:shadow-2xl transition-all duration-300`}
                >
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className={`w-20 h-20 rounded-full ${service.iconBg} flex items-center justify-center mb-6`}>
                        <IconComponent className="w-10 h-10 text-white" strokeWidth={2} />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        Learn More <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                      <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          What We Offer
                        </h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                              <div className={`w-2 h-2 rounded-full ${service.iconBg}`}></div>
                              <span className="text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">5000+</div>
              <div className="text-gray-700 dark:text-gray-300 text-base">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">15+</div>
              <div className="text-gray-700 dark:text-gray-300 text-base">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">50+</div>
              <div className="text-gray-700 dark:text-gray-300 text-base">Indian Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
              <div className="text-gray-700 dark:text-gray-300 text-base">Support Available</div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Have questions? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email Us</h4>
                    <p className="text-gray-700 dark:text-gray-300">support@nridesikart.com</p>
                    <p className="text-gray-700 dark:text-gray-300">info@nridesikart.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Call Us</h4>
                    <p className="text-gray-700 dark:text-gray-300">USA: +1 (555) 123-4567</p>
                    <p className="text-gray-700 dark:text-gray-300">India: +91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Our Offices</h4>
                    <p className="text-gray-700 dark:text-gray-300">USA: 123 Business Ave, New York, NY 10001</p>
                    <p className="text-gray-700 dark:text-gray-300">India: 456 Commerce St, Mumbai 400001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Business Hours</h4>
                    <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9 AM - 6 PM (EST)</p>
                    <p className="text-gray-700 dark:text-gray-300">24/7 Online Support Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="insurance">Life Insurance</option>
                    <option value="tailoring">Fabrics & Tailoring</option>
                    <option value="realestate">Real Estate</option>
                    <option value="auto">Auto Advertisements</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of NRIs who trust Nridesikart for their Indian service needs
          </p>
          <Link
            href="/home"
            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:scale-105 inline-block"
          >
            Explore Our Services →
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4">
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
            <a href="#contact" className="hover:text-orange-400 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
