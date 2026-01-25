"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "motion/react"
import { MessageCircle, Check, AlertCircle } from "lucide-react"

type Step = 1 | 2 | 3 | 4

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
}

interface StepCardProps {
  onComplete?: (data: FormData) => void
  onClose?: () => void
}

export default function StepCard({ onComplete, onClose }: StepCardProps) {
  const [step, setStep] = React.useState<Step>(1)
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [errors, setErrors] = React.useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Partial<FormData> = {}

    if (currentStep === 1) {
      if (!fullName.trim()) {
        newErrors.fullName = "Full name is required"
      } else if (fullName.trim().length < 2) {
        newErrors.fullName = "Name must be at least 2 characters"
      } else if (!/^[a-zA-Z\s'-]+$/.test(fullName.trim())) {
        newErrors.fullName = "Name can only contain letters, spaces, hyphens, and apostrophes"
      }
    }

    if (currentStep === 2) {
      if (!email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    if (currentStep === 3) {
      const cleanPhone = phoneNumber.replace(/\D/g, '')
      if (!phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required"
      } else if (cleanPhone.length < 10) {
        newErrors.phoneNumber = "Phone number must be at least 10 digits"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev))
    }
  }

  const prevStep = () => setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev))

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      if (onComplete) {
        onComplete({ fullName: fullName.trim(), email: email.trim(), phoneNumber: phoneNumber.trim() })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const openWhatsApp = () => {
    window.open('https://chat.whatsapp.com/GGysFAkQhIMJXXeh150Igt', '_blank')
  }

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Step 1: Full Name"
      case 2: return "Step 2: Email"
      case 3: return "Step 3: Phone Number"
      case 4: return "Step 4: Join Community"
    }
  }

  const progressPercentage = ((step - 1) / 3) * 100

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Step {step} of 4</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
        {getStepTitle()}
      </h2>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFullName(e.target.value)
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined })
                }}
                className={`mt-1 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullName}
                </p>
              )}
            </div>
            <Button 
              onClick={nextStep} 
              className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Next
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors({ ...errors, email: undefined })
                }}
                className={`mt-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex justify-between gap-3 mt-4">
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={nextStep} 
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="phoneNumber" className="text-gray-700 dark:text-gray-300">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+91 1234567890"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhoneNumber(e.target.value)
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined })
                }}
                className={`mt-1 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                aria-invalid={!!errors.phoneNumber}
                aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
              />
              {errors.phoneNumber && (
                <p id="phoneNumber-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="flex justify-between gap-3 mt-4">
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={nextStep} 
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Join Our Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Stay updated with exclusive offers and service updates
              </p>
              <Button
                onClick={openWhatsApp}
                className="w-full mb-4 bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Join WhatsApp Community
              </Button>
            </div>
            <div className="flex justify-between gap-3 mt-2">
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Complete
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
