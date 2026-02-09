'use client';

import { useState, useTransition } from 'react';
import { StudentProfile } from '@/types/database';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { updateMentorshipStatus } from '@/services/api';
import { Users, UserCheck, Loader2 } from 'lucide-react';

interface MentorshipToggleProps {
    profile: StudentProfile;
    onStatusChange?: (isOpen: boolean) => void;
}

export function MentorshipToggle({
    profile,
    onStatusChange,
}: MentorshipToggleProps) {
    const [isOpen, setIsOpen] = useState(profile.is_open_to_mentorship ?? false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    // Only show for alumni
    if (!profile.is_alumni) {
        return null;
    }

    const handleToggle = () => {
        const newStatus = !isOpen;
        setError(null);

        startTransition(async () => {
            try {
                const result = await updateMentorshipStatus(profile.user_id, newStatus);
                if (result.success) {
                    setIsOpen(newStatus);
                    onStatusChange?.(newStatus);
                } else {
                    setError('Failed to update status. Please try again.');
                }
            } catch {
                setError('An error occurred. Please try again.');
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <Users className="h-5 w-5 text-indigo-600" />
                        Mentorship Settings
                    </h3>
                    <Badge variant={isOpen ? 'success' : 'default'}>
                        {isOpen ? 'Open to Mentor' : 'Not Available'}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                        <p className="font-medium text-slate-900 mb-1">
                            Accept mentorship requests
                        </p>
                        <p className="text-sm text-slate-500">
                            When enabled, current students can reach out to you for career
                            guidance and interview preparation help.
                        </p>
                    </div>

                    {/* Toggle Switch */}
                    <button
                        type="button"
                        onClick={handleToggle}
                        disabled={isPending}
                        aria-pressed={isOpen}
                        aria-label="Toggle mentorship availability"
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${isOpen ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                    >
                        <span className="sr-only">Toggle mentorship</span>
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isOpen ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        >
                            {isPending && (
                                <Loader2 className="h-3 w-3 text-slate-400 animate-spin absolute top-1 left-1" />
                            )}
                        </span>
                    </button>
                </div>

                {error && (
                    <p className="mt-3 text-sm text-red-600">{error}</p>
                )}

                {/* Benefits section */}
                {isOpen && (
                    <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            You&apos;re helping the community!
                        </h4>
                        <p className="text-sm text-emerald-800">
                            Students can now see your profile in the mentor directory and
                            request guidance from you.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
