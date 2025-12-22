import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
    progress: number; // 0 to 1
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
            <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </div>
    )
}
