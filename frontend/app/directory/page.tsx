'use client';

import { useState, useEffect, useTransition } from 'react';
import { UserWithProfile } from '@/types/database';
import { searchAlumni, fetchAlumniWithPlacements } from '@/services/api';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { ProfileCardSkeleton } from '@/components/ui/Skeleton';
import {
    Search,
    Building2,
    Briefcase,
    GraduationCap,
    CheckCircle2,
    Users,
    IndianRupee,
} from 'lucide-react';

function AlumniCard({ alumni }: { alumni: UserWithProfile }) {
    const hasVerifiedOffer = !!alumni.placement?.offer_letter_url;

    return (
        <Card hover>
            <CardContent className="py-5">
                <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shrink-0">
                        <span className="text-xl font-bold text-white">
                            {alumni.full_name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </span>
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Name & Verification */}
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 truncate">
                                {alumni.full_name}
                            </h3>
                            {hasVerifiedOffer && (
                                <div className="flex items-center gap-1" title="Verified Alumni">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                </div>
                            )}
                        </div>

                        {/* Company & Role */}
                        {alumni.placement && (
                            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mb-2">
                                <span className="flex items-center gap-1">
                                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                    {alumni.placement.company_name}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="flex items-center gap-1">
                                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                                    {alumni.placement.job_role}
                                </span>
                            </div>
                        )}

                        {/* Department & Batch */}
                        {alumni.profile && (
                            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                    <GraduationCap className="h-3.5 w-3.5" />
                                    {alumni.profile.department}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>Batch {alumni.profile.batch_year}</span>
                            </div>
                        )}
                    </div>

                    {/* Package & Mentorship */}
                    <div className="text-right shrink-0">
                        {alumni.placement && (
                            <div className="flex items-center gap-1 text-lg font-bold text-slate-900 mb-1">
                                <IndianRupee className="h-4 w-4" />
                                {alumni.placement.salary_package} LPA
                            </div>
                        )}
                        {alumni.profile?.is_open_to_mentorship && (
                            <Badge variant="success">Open to Mentor</Badge>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function DirectoryPage() {
    const [alumni, setAlumni] = useState<UserWithProfile[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    // Initial load
    useEffect(() => {
        fetchAlumniWithPlacements().then((data) => {
            setAlumni(data);
            setIsLoading(false);
        });
    }, []);

    // Search handler
    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (query.trim() === '') {
            startTransition(async () => {
                const data = await fetchAlumniWithPlacements();
                setAlumni(data);
            });
        } else {
            startTransition(async () => {
                const results = await searchAlumni(query);
                setAlumni(results);
            });
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="h-8 w-8 text-indigo-600" />
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                        Alumni Directory
                    </h1>
                </div>
                <p className="text-slate-500">
                    Connect with verified alumni for mentorship and career guidance.
                </p>
            </div>

            {/* Search */}
            <div className="mb-6 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="Search by name, company, or department..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-500">
                    {isLoading || isPending ? (
                        'Loading...'
                    ) : (
                        <>
                            Showing <span className="font-medium text-slate-700">{alumni.length}</span> alumni
                        </>
                    )}
                </p>
                {searchQuery && (
                    <button
                        onClick={() => handleSearch('')}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                        Clear search
                    </button>
                )}
            </div>

            {/* Alumni List */}
            {isLoading ? (
                <div className="space-y-4">
                    <ProfileCardSkeleton />
                    <ProfileCardSkeleton />
                    <ProfileCardSkeleton />
                </div>
            ) : alumni.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            No Alumni Found
                        </h3>
                        <p className="text-slate-500">
                            {searchQuery
                                ? `No results for "${searchQuery}". Try a different search term.`
                                : 'No alumni in the directory yet.'}
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {alumni.map((alumnus) => (
                        <AlumniCard key={alumnus.id} alumni={alumnus} />
                    ))}
                </div>
            )}
        </div>
    );
}
