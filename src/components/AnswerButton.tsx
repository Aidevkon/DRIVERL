import React from 'react'
import { motion } from 'framer-motion'

interface AnswerButtonProps {
    text: string;
    isSelected: boolean;
    isCorrect?: boolean;
    isWrong?: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
    text,
    isSelected,
    isCorrect,
    isWrong,
    onClick,
    disabled
}) => {
    let borderColor = "border-white/10";
    let bgColor = "bg-white/5";

    if (isSelected) borderColor = "border-blue-400";
    if (isCorrect) {
        borderColor = "border-green-400";
        bgColor = "bg-green-400/20";
    }
    if (isWrong) {
        borderColor = "border-red-400";
        bgColor = "bg-red-400/20";
    }

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={onClick}
            disabled={disabled}
            className={`w-full p-4 text-left rounded-2xl border ${borderColor} ${bgColor} backdrop-blur-md transition-all duration-200`}
        >
            <span className="text-lg font-medium">{text}</span>
        </motion.button>
    )
}
