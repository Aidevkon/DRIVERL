import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson, Question } from '../types'
import { ProgressBar } from './ProgressBar'
import { AnswerButton } from './AnswerButton'

interface LessonScreenProps {
    lesson: Lesson;
    onComplete: () => void;
    onExit: () => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({ lesson, onComplete, onExit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [score, setScore] = useState(0)

    const currentQuestion: Question = lesson.questions[currentQuestionIndex]
    const progress = (currentQuestionIndex) / lesson.questions.length

    const handleAnswerSelect = (answer: string) => {
        if (isAnswered) return
        setSelectedAnswer(answer)
    }

    const handleCheck = () => {
        if (!selectedAnswer) return
        setIsAnswered(true)
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1)
        }
    }

    const handleNext = () => {
        if (currentQuestionIndex < lesson.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedAnswer(null)
            setIsAnswered(false)
        } else {
            onComplete()
        }
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    return (
        <div className="min-h-screen w-full flex flex-col p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onExit} className="text-2xl opacity-50 hover:opacity-100 transition-opacity">✕</button>
                <ProgressBar progress={progress} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-grow"
                >
                    <h2 className="text-2xl font-bold mb-8 leading-tight">
                        {currentQuestion.prompt}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion.options?.map((option) => (
                            <AnswerButton
                                key={option}
                                text={option}
                                isSelected={selectedAnswer === option}
                                isCorrect={isAnswered && option === currentQuestion.correctAnswer}
                                isWrong={isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={isAnswered}
                            />
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className={`mt-8 p-6 rounded-3xl transition-all duration-300 ${isAnswered
                ? (isCorrect ? 'bg-green-500/20' : 'bg-red-500/20')
                : 'bg-transparent'
                }`}>
                {!isAnswered ? (
                    <button
                        onClick={handleCheck}
                        disabled={!selectedAnswer}
                        className={`btn-primary w-full py-4 text-xl ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        ΕΛΕΓΧΟΣ
                    </button>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className={`text-xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {isCorrect ? 'Σωστά! 🎉' : 'Λάθος απάντηση 😕'}
                        </div>
                        {!isCorrect && (
                            <div className="text-sm opacity-70">
                                Η σωστή απάντηση είναι: <span className="font-bold">{currentQuestion.correctAnswer}</span>
                            </div>
                        )}
                        <button
                            onClick={handleNext}
                            className={`w-full py-4 text-xl rounded-2xl font-bold transition-all ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                }`}
                        >
                            ΣΥΝΕΧΕΙΑ
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
