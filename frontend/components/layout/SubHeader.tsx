'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export function SubHeader() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            {/* Organization Title */}
            <h1 className="text-lg font-bold text-slate-900 whitespace-nowrap">
                Amrita viswa vidyappetam
            </h1>

            {/* Search Bar */}
            <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-1 max-w-md">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
                    />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors shadow-sm">
                    search
                </button>
            </div>
        </div>
    );
}
