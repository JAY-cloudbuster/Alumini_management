'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { GraduationCap, User } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Feed', href: '/experiences' },
    { label: 'Messages', href: '/messages' },
];

export function TopNavbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
            <div className="mx-auto max-w-7xl flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
                {/* Left: Logo + Nav Links */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-900 hidden sm:inline">
                            Logo
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <nav className="flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive =
                                link.href === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(link.href) && link.href !== '#';
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                        isActive
                                            ? 'text-indigo-700 bg-indigo-50'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Avatar + Name */}
                <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-sm font-medium text-slate-700">
                        Rahul Verma
                    </span>
                    <button className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow ring-2 ring-white">
                        <User className="h-4 w-4 text-white" />
                    </button>
                </div>
            </div>
        </header>
    );
}
