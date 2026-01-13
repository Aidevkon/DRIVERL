import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface AnswerButtonProps {
    text: string;
    isSelected: boolean;
    isCorrect?: boolean;
    isWrong?: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

export const AnswerButton: React.FC<AnswerButtonProps> = ({
    text,
    isSelected,
    isCorrect,
    isWrong,
    onClick,
    disabled
}) => {
    let cardClass = "bg-white border-[#E5E5E5] text-[#4C4B82]";
    let shadowColor = "#E5E5E5";

    if (isSelected) {
        cardClass = "bg-[#E1F2FF] border-[#1CB0F6] text-[#1CB0F6]";
        shadowColor = "#1CB0F6";
    }
    if (isCorrect) {
        cardClass = "bg-[#D7FFB8] border-[#58CC02] text-[#58CC02]";
        shadowColor = "#58CC02";
    }
    if (isWrong) {
        cardClass = "bg-[#FFDFE0] border-[#FF4B4B] text-[#FF4B4B]";
        shadowColor = "#FF4B4B";
    }

    return (
        <motion.button
            variants={buttonVariants}
            whileHover={!disabled ? { y: -4, transition: { duration: 0.2 } } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={onClick}
            disabled={disabled}
            className={`w-full p-6 text-left rounded-[24px] border-2 transition-all duration-150 btn-flat ${cardClass}`}
            style={{ borderBottomColor: shadowColor }}
        >
            <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black transition-colors shrink-0
                    ${isSelected ? 'bg-[#1CB0F6] text-white border-[#1CB0F6]' :
                        isCorrect ? 'bg-[#58CC02] text-white border-[#58CC02]' :
                            isWrong ? 'bg-[#FF4B4B] text-white border-[#FF4B4B]' :
                                'bg-white text-[#7C7BA0] border-[#E5E5E5]'}
                `}>
                    <div className="w-2 h-2 rounded-full bg-current opacity-40" />
                </div>
                <span className="text-xl font-bold tracking-tight">{text}</span>
            </div>
        </motion.button>
    )
}
