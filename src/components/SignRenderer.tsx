import signsMapJson from '../data/signsMap.json';
import { dangerSigns, regulatorySigns, infoSigns } from '../data/signs_data';

interface SignRendererProps {
    signId: string;
    className?: string;
}

// Consolidate all sign sources
const allSignsList = [
    ...signsMapJson,
    ...dangerSigns,
    ...regulatorySigns,
    ...infoSigns
];

// Create a lookup map for faster access
const signsLookup = new Map(allSignsList.map(sign => [sign.id, sign]));

export const SignRenderer: React.FC<SignRendererProps> = ({ signId, className = "w-32 h-32" }) => {
    const sign = signsLookup.get(signId);

    if (!sign) {
        console.warn(`SignRenderer: Unknown signId "${signId}"`);
        // Fallback or placeholder if sign is unknown
        return (
            <div className={`flex items-center justify-center bg-gray-800 rounded-lg text-xs text-gray-500 p-2 text-center ${className}`}>
                Unknown Sign: {signId}
            </div>
        );
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

