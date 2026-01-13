import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson, Question } from '../types'
import { AnswerButton } from './AnswerButton'
import { QuestionHeader } from './lesson/QuestionHeader'
import { QuestionFooter } from './lesson/QuestionFooter'
import { SignRenderer } from './SignRenderer'
import { useUser } from '../hooks/useUser';

interface LessonScreenProps {
    lesson: Lesson;
    onComplete: () => void;
    onExit: () => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({ lesson, onComplete, onExit }) => {
    const { loseHeart, hearts } = useUser();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [status, setStatus] = useState<'none' | 'correct' | 'wrong'>('none')

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
            setStatus('correct')
        } else {
            setStatus('wrong')
            loseHeart()
        }
    }

    const handleNext = () => {
        if (currentQuestionIndex < lesson.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedAnswer(null)
            setIsAnswered(false)
            setStatus('none')
        } else {
            onComplete()
        }
    }

    // Handle out of hearts
    if (hearts <= 0) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#F7F7F7]">
                <div className="flat-card p-10 w-full max-w-md text-center">
                    <div className="text-8xl mb-6">💔</div>
                    <h2 className="text-4xl font-black text-[#4B4B4B] mb-4 uppercase">Έχασες όλες τις καρδιές!</h2>
                    <p className="text-[#777777] mb-8 font-bold leading-relaxed">Μην απογοητεύεσαι! Επιστρέψου αύριο ή κάνε εξάσκηση για να γεμίσεις τις καρδιές σου.</p>
                    <button
                        onClick={onExit}
                        className="btn-flat btn-flat-primary w-full text-xl py-4"
                    >
                        ΕΠΙΣΤΡΟΦΗ
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#FDFCF0] pb-40">
            <QuestionHeader
                progress={progress}
                onExit={onExit}
            />

            <main className="flex-grow flex flex-col items-center p-6 max-w-2xl mx-auto w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -20 }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.15,
                                }
                            }
                        }}
                        className="w-full flex flex-col items-center"
                    >
                        {(currentQuestion.signId || lesson.image) && (
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                className="flex justify-center mb-12 h-48 md:h-64"
                            >
                                <div className="rounded-[40px] shadow-[0_12px_0_0_rgba(76,75,130,0.05)] border-2 border-[#E5E5E5] flex items-center justify-center bg-white p-10 hover:transform hover:scale-105 transition-all">
                                    {currentQuestion.signId ? (
                                        <SignRenderer signId={currentQuestion.signId} className="w-40 h-40 md:w-56 md:h-56" />
                                    ) : (
                                        <img
                                            src={lesson.image}
                                            alt="Sign content"
                                            className="max-h-full w-auto object-contain"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        )}

                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="text-2xl md:text-3xl font-black mb-12 leading-tight text-[#4C4B82] px-2 text-center max-w-lg"
                        >
                            {currentQuestion.prompt}
                        </motion.h2>

                        <div className="space-y-4 px-2 w-full">
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
            </main>

            <QuestionFooter
                status={status}
                correctAnswer={currentQuestion.correctAnswer as string}
                onCheck={handleCheck}
                onNext={handleNext}
                disabled={!selectedAnswer}
            />
        </div>
    )
}
