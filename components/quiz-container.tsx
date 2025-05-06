"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import Introduction from "./sections/introduction"
import GenderSelection from "./sections/gender-selection"
import BirthDate from "./sections/birth-date"
import PalmistryInfo from "./sections/palmistry-info"
import LoveAspect from "./sections/love-aspect"
import RelationshipStatus from "./sections/relationship-status"
import ElementSelection from "./sections/element-selection"
import ColorSelection from "./sections/color-selection"
import DecisionStyle from "./sections/decision-style"
import PersonalizedMessage from "./sections/personalized-message"
import PalmUpload from "./sections/palm-upload"
import Result from "./sections/result"
import { calculateZodiacSign } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export type QuizData = {
  gender: string
  birthDate: string
  zodiacSign: string
  loveAspect: string
  relationshipStatus: string
  element: string
  favoriteColor: string
  decisionStyle: string
  palmImage: File | null
  email: string
}

export default function QuizContainer() {
  const [currentSection, setCurrentSection] = useState(1)
  const [direction, setDirection] = useState(0) // -1 for backward, 1 for forward
  const [quizData, setQuizData] = useState<QuizData>({
    gender: "",
    birthDate: "",
    zodiacSign: "",
    loveAspect: "",
    relationshipStatus: "",
    element: "",
    favoriteColor: "",
    decisionStyle: "",
    palmImage: null,
    email: "",
  })

  const updateQuizData = (key: keyof QuizData, value: any) => {
    setQuizData((prev) => ({ ...prev, [key]: value }))

    // If birthDate is updated, calculate zodiac sign
    if (key === "birthDate" && value) {
      try {
        // Parse the date string (YYYY-MM-DD format)
        const [year, month, day] = value.split("-").map(Number)
        // Create a date object (months are 0-indexed in JavaScript)
        const dateObj = new Date(year, month - 1, day)
        const sign = calculateZodiacSign(dateObj)
        setQuizData((prev) => ({ ...prev, zodiacSign: sign }))
      } catch (error) {
        console.error("Error calculating zodiac sign:", error)
      }
    }
  }

  const nextSection = () => {
    setDirection(1)
    setCurrentSection((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevSection = () => {
    setDirection(-1)
    setCurrentSection((prev) => Math.max(1, prev - 1))
    window.scrollTo(0, 0)
  }

  const submitQuizData = async (email: string) => {
    updateQuizData("email", email)

    try {
      // Create FormData to handle file upload
      const formData = new FormData()

      // Add all quiz data to FormData
      Object.entries(quizData).forEach(([key, value]) => {
        if (key === "palmImage" && value) {
          formData.append("palmImage", value)
        } else {
          formData.append(key, String(value))
        }
      })

      formData.append("email", email)

      // Send data to webhook
      const response = await fetch("https://webhook.autominds.com.br/webhook/mao-quizz", {
        method: "POST",
        body: formData,
      })

      // Redirect directly to sales page after submission
      window.location.href = "https://lplinhadodestino.vercel.app/"
    } catch (error) {
      console.error("Error submitting data:", error)
      // Still redirect to sales page even if there's an error
      window.location.href = "https://lplinhadodestino.vercel.app/"
    }
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 500 : -500,
        opacity: 0,
      }
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 500 : -500,
        opacity: 0,
      }
    },
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 1:
        return <Introduction onNext={nextSection} />
      case 2:
        return (
          <GenderSelection
            selectedGender={quizData.gender}
            onSelect={(gender) => updateQuizData("gender", gender)}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 3:
        return (
          <BirthDate
            selectedDate={quizData.birthDate}
            onSelect={(date) => updateQuizData("birthDate", date)}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 4:
        return <PalmistryInfo onNext={nextSection} onPrev={prevSection} />
      case 5:
        return (
          <LoveAspect
            selectedAspect={quizData.loveAspect}
            onSelect={(aspect) => updateQuizData("loveAspect", aspect)}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 6:
        return (
          <RelationshipStatus
            selectedStatus={quizData.relationshipStatus}
            onSelect={(status) => updateQuizData("relationshipStatus", status)}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 7:
        return (
          <ElementSelection
            selectedElement={quizData.element}
            onSelect={(element) => updateQuizData("element", element)}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 8:
        return (
          <ColorSelection
            selectedColor={quizData.favoriteColor}
            onSelect={(color) => updateQuizData("favoriteColor", color)}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 9:
        return (
          <DecisionStyle
            selectedStyle={quizData.decisionStyle}
            onSelect={(style) => updateQuizData("decisionStyle", style)}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 10:
        return (
          <PersonalizedMessage
            zodiacSign={quizData.zodiacSign}
            element={quizData.element}
            favoriteColor={quizData.favoriteColor}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 11:
        return (
          <PalmUpload
            onImageCapture={(file) => updateQuizData("palmImage", file)}
            onNext={nextSection}
            onPrev={prevSection}
          />
        )
      case 12:
        return <Result onSubmit={submitQuizData} onPrev={prevSection} />
      default:
        return <Introduction onNext={nextSection} />
    }
  }

  return (
    <Card className="quiz-container shadow-lg border-none mystical-bg">
      <div className="flex justify-center mb-4">
        <h1 className="text-2xl font-bold text-primary">Quiz de Quiromancia</h1>
      </div>
      <div className="mb-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentSection / 12) * 100}%` }}
        ></div>
      </div>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSection}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {renderCurrentSection()}
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
