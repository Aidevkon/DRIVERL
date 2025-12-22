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
        className={`p-2 rounded-xl transition-colors ${isActive ? 'text-blue-400' : 'text-slate-400'}`}
    >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
    </button>
);

export const BottomNav: React.FC = () => {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-4 z-50">
            <BottomNavItem icon={Home} isActive label="Μάθηση" />
            <BottomNavItem icon={Trophy} label="Κατάταξη" />
            <BottomNavItem icon={Target} label="Αποστολές" />
            <BottomNavItem icon={ShoppingBag} label="Κατάστημα" />
            <BottomNavItem icon={User} label="Προφίλ" />
        </nav>
    );
};
