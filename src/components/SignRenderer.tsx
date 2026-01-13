import React from 'react';
import signsData from '../data/signsMap.json';

interface SignRendererProps {
    signId: string;
    className?: string;
}

// Create a lookup map for faster access
const signsMap = new Map(signsData.map(sign => [sign.id, sign]));

export const SignRenderer: React.FC<SignRendererProps> = ({ signId, className = "w-32 h-32" }) => {
    const sign = signsMap.get(signId);

    if (!sign) {
        console.warn(`SignRenderer: Unknown signId "${signId}"`);
        return null;
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                src={sign.image}
                alt={sign.description}
                className="w-full h-full object-contain"
                loading="lazy"
            />
        </div>
    );
};

