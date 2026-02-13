'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    Home,
    Users,
    Briefcase,
    BookOpen,
    User,
    GraduationCap,
    Settings,
    LogOut
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Experiences', href: '/experiences', icon: BookOpen },
    { label: 'Alumni', href: '/directory', icon: Users },
    { label: 'Placements', href: '/placements', icon: Briefcase },
    { label: 'Profile', href: '/profile', icon: User },
];

export function FloatingNav() {
    const pathname = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-8"
        >
            {/* Logo / Brand Pill */}
            <motion.div
                className="glass-panel p-3 rounded-2xl flex items-center justify-center mb-4 cursor-pointer group relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-hover:bg-indigo-500/30 transition-colors" />
                <Link href="/" className="relative z-10">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                </Link>

                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-1.5 glass-panel rounded-lg text-xs font-medium text-slate-700 opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap">
                    Peer2Peer
                </div>
            </motion.div>

            {/* Navigation Dock */}
            <div className="glass-panel p-3 rounded-3xl flex flex-col gap-3 relative">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative group flex items-center justify-center"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Hover Background */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        className="absolute inset-0 bg-slate-100/50 rounded-xl"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Active Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            {/* Icon */}
                            <div className={cn(
                                "relative z-10 p-3 rounded-xl transition-colors duration-200",
                                isActive ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-700"
                            )}>
                                <item.icon className={cn(
                                    "h-5 w-5 transition-transform duration-200",
                                    hoveredIndex === index ? "scale-110" : "scale-100"
                                )} />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute left-full ml-4 px-3 py-1.5 glass-panel rounded-lg text-xs font-medium text-slate-700 opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50">
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="glass-panel p-3 rounded-2xl flex flex-col gap-3 mt-auto">
                <button className="p-3 text-slate-500 hover:text-indigo-600 transition-colors rounded-xl hover:bg-slate-100/50 relative group">
                    <Settings className="h-5 w-5" />
                    <div className="absolute left-full ml-4 px-3 py-1.5 glass-panel rounded-lg text-xs font-medium text-slate-700 opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap">
                        Settings
                    </div>
                </button>
                <button className="p-3 text-slate-500 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50/50 relative group">
                    <LogOut className="h-5 w-5" />
                    <div className="absolute left-full ml-4 px-3 py-1.5 glass-panel rounded-lg text-xs font-medium text-slate-700 opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap">
                        Logout
                    </div>
                </button>
            </div>
        </motion.div>
    );
}
