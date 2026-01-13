import React from 'react';
import { Home, Trophy, Target, ShoppingBag, User } from 'lucide-react';

interface BottomNavItemProps {
    icon: React.ElementType;
    isActive?: boolean;
    label: string;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({ icon: Icon, isActive, label }) => (
    <button
        aria-label={label}
        className={`p-3 rounded-2xl transition-all ${isActive ? 'text-[#1CB0F6] bg-[#E1F2FF]' : 'text-[#7C7BA0]'}`}
    >
        <Icon size={26} strokeWidth={3} />
    </button>
);

export const BottomNav: React.FC = () => {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-[#E5E5E5] flex items-center justify-around px-6 z-50 pb-4">
            <BottomNavItem icon={Home} isActive label="Μάθηση" />
            <BottomNavItem icon={Trophy} label="Κατάταξη" />
            <BottomNavItem icon={Target} label="Αποστολές" />
            <BottomNavItem icon={ShoppingBag} label="Κατάστημα" />
            <BottomNavItem icon={User} label="Προφίλ" />
        </nav>
    );
};
