import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen w-full relative overflow-x-hidden pt-16 lg:pt-0 lg:pl-64">
            <Sidebar />
            <TopBar />

            <main className="w-full min-h-[calc(100vh-64px)] lg:min-h-screen p-4 lg:p-8 pb-20 lg:pb-8 flex flex-col items-center">
                {children}
            </main>

            <BottomNav />
        </div>
    );
};
