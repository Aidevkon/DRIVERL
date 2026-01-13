import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
    progress: number; // 0 to 1
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="progress-bar-container">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="progress-bar-fill relative"
            >
                {/* 3D Glossy highlight */}
                <div className="absolute top-1 left-2 right-2 h-1 bg-white/30 rounded-full" />
            </motion.div>
        </div>
    );
};
