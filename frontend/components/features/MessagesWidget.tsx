'use client';

import { User } from 'lucide-react';

interface MessageContact {
    id: string;
    name: string;
    initials: string;
}

const MOCK_CONTACTS: MessageContact[] = [
    { id: 'm1', name: 'Rahul Verma', initials: 'RV' },
    { id: 'm2', name: 'Ananya Patel', initials: 'AP' },
    { id: 'm3', name: 'Vikram Singh', initials: 'VS' },
    { id: 'm4', name: 'Kavya Nair', initials: 'KN' },
    { id: 'm5', name: 'Priya Sharma', initials: 'PS' },
];

export function MessagesWidget() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Messages</h2>

            <div className="space-y-5">
                {MOCK_CONTACTS.map((contact) => (
                    <div
                        key={contact.id}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        {/* Avatar */}
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-300 transition-colors">
                            <User className="h-5 w-5 text-slate-500" />
                        </div>

                        {/* Name (hidden on smaller screens, visible on xl) */}
                        <span className="hidden xl:inline text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors truncate">
                            {contact.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* See More */}
            <button className="mt-6 text-sm text-slate-500 hover:text-indigo-600 transition-colors italic">
                see more
            </button>
        </div>
    );
}
