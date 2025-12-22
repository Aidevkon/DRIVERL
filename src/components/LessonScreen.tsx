import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson, Question } from '../types'
import { AnswerButton } from './AnswerButton'
import { QuestionHeader } from './lesson/QuestionHeader'
import { QuestionFooter } from './lesson/QuestionFooter'
import { SignRenderer } from './SignRenderer'
import { useUser } from '../contexts/UserContext'

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
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-900">
                <div className="glass-card p-10 w-full max-w-md text-center">
                    <div className="text-8xl mb-6">💔</div>
                    <h2 className="text-4xl font-black text-white mb-4 uppercase">Εχασες ολες τις καρδιες!</h2>
                    <p className="text-slate-400 mb-8">Μην απογοητεύεσαι! Επιστρέψου αύριο ή κάνε εξάσκηση για να γεμίσεις τις καρδιές σου.</p>
                    <button
                        onClick={onExit}
                        className="btn-primary w-full text-xl py-4 font-black uppercase"
                    >
                        Επιστροφη
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-slate-900 pb-40">
            <QuestionHeader
                progress={progress}
                onExit={onExit}
            />

            <main className="flex-grow flex flex-col items-center p-6 max-w-2xl mx-auto w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full"
                    >
                        {(currentQuestion.signId || lesson.image) && (
                            <div className="flex justify-center mb-10 h-48 md:h-64">
                                <div className="rounded-3xl shadow-2xl glass-card p-6 border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-xl">
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
                            </div>
                        )}

                        <h2 className="text-2xl md:text-3xl font-black mb-10 leading-tight text-white px-2">
                            {currentQuestion.prompt}
                        </h2>

                        <div className="space-y-4 px-2">
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
