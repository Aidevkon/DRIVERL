import React from 'react';

interface SignRendererProps {
    signId: string;
    className?: string;
}

const StopSign: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M30,5 L70,5 L95,30 L95,70 L70,95 L30,95 L5,70 L5,30 Z" fill="#E11D48" stroke="white" strokeWidth="4" />
        <text x="50" y="62" fontSize="22" fontWeight="900" textAnchor="middle" fill="white" fontFamily="sans-serif">STOP</text>
    </svg>
);

const GiveWaySign: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M5,10 L95,10 L50,90 Z" fill="white" stroke="#E11D48" strokeWidth="8" />
    </svg>
);

const NoEntrySign: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#E11D48" />
        <rect x="15" y="42" width="70" height="16" fill="white" />
    </svg>
);

const Speed30Sign: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="white" stroke="#E11D48" strokeWidth="8" />
        <text x="50" y="65" fontSize="35" fontWeight="900" textAnchor="middle" fill="black" fontFamily="sans-serif">30</text>
    </svg>
);

export const SignRenderer: React.FC<SignRendererProps> = ({ signId, className = "w-32 h-32" }) => {
    const renderSign = () => {
        switch (signId) {
            case 'stop': return <StopSign />;
            case 'yield': return <GiveWaySign />;
            case 'no-entry': return <NoEntrySign />;
            case 'speed-30': return <Speed30Sign />;
            default: return null;
        }
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            {renderSign()}
        </div>
    );
};
