'use client';

import { StudentProfile, PlacementDetail } from '@/types/database';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
    CheckCircle2,
    Clock,
    XCircle,
    Building2,
    Briefcase,
    IndianRupee,
    FileCheck,
} from 'lucide-react';

interface PlacementTrackerProps {
    profile: StudentProfile;
    placement?: PlacementDetail;
}

type PlacementStep = {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
};

const PLACEMENT_STEPS: PlacementStep[] = [
    {
        id: 'profile',
        label: 'Profile Complete',
        description: 'Student profile verified',
        icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
        id: 'applying',
        label: 'Applying',
        description: 'Active job applications',
        icon: <Briefcase className="h-5 w-5" />,
    },
    {
        id: 'interviewing',
        label: 'Interviewing',
        description: 'In interview process',
        icon: <Clock className="h-5 w-5" />,
    },
    {
        id: 'offer',
        label: 'Offer Received',
        description: 'Got a job offer',
        icon: <Building2 className="h-5 w-5" />,
    },
    {
        id: 'placed',
        label: 'Placed',
        description: 'Placement confirmed',
        icon: <FileCheck className="h-5 w-5" />,
    },
];

function getStepStatus(
    stepId: string,
    placementStatus: StudentProfile['placement_status'],
    hasPlacement: boolean
): 'complete' | 'current' | 'upcoming' {
    if (placementStatus === 'placed' && hasPlacement) {
        return 'complete';
    }

    if (placementStatus === 'not_interested') {
        if (stepId === 'profile') return 'complete';
        return 'upcoming';
    }

    // For 'not_placed' status, show progress
    const stepOrder = ['profile', 'applying', 'interviewing', 'offer', 'placed'];
    const currentIndex = hasPlacement ? 4 : 1; // If has placement, show all complete; otherwise at applying

    const stepIndex = stepOrder.indexOf(stepId);
    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
}

export function PlacementTracker({ profile, placement }: PlacementTrackerProps) {
    const hasPlacement = !!placement;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Placement Progress
                    </h3>
                    <Badge
                        variant={
                            profile.placement_status === 'placed'
                                ? 'success'
                                : profile.placement_status === 'not_interested'
                                    ? 'warning'
                                    : 'info'
                        }
                    >
                        {profile.placement_status === 'placed'
                            ? 'Placed'
                            : profile.placement_status === 'not_interested'
                                ? 'Not Interested'
                                : 'In Progress'}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                {/* Progress Steps */}
                <div className="relative">
                    {PLACEMENT_STEPS.map((step, index) => {
                        const status = getStepStatus(
                            step.id,
                            profile.placement_status,
                            hasPlacement
                        );

                        return (
                            <div key={step.id} className="flex items-start gap-4 mb-6 last:mb-0">
                                {/* Step Icon */}
                                <div
                                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${status === 'complete'
                                            ? 'border-emerald-500 bg-emerald-500 text-white'
                                            : status === 'current'
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                                                : 'border-slate-300 bg-white text-slate-400'
                                        }`}
                                >
                                    {step.icon}
                                </div>

                                {/* Connector Line */}
                                {index < PLACEMENT_STEPS.length - 1 && (
                                    <div
                                        className={`absolute left-5 top-10 w-0.5 h-10 -translate-x-1/2 ${status === 'complete' ? 'bg-emerald-500' : 'bg-slate-200'
                                            }`}
                                        style={{ marginTop: `${index * 64}px` }}
                                    />
                                )}

                                {/* Step Content */}
                                <div className="pt-1.5">
                                    <p
                                        className={`font-medium ${status === 'complete'
                                                ? 'text-emerald-700'
                                                : status === 'current'
                                                    ? 'text-indigo-700'
                                                    : 'text-slate-500'
                                            }`}
                                    >
                                        {step.label}
                                    </p>
                                    <p className="text-sm text-slate-500">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Placement Details (if placed) */}
                {hasPlacement && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            Placement Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-slate-500" />
                                <div>
                                    <p className="text-xs text-slate-500">Company</p>
                                    <p className="font-medium text-slate-900">
                                        {placement.company_name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-slate-500" />
                                <div>
                                    <p className="text-xs text-slate-500">Role</p>
                                    <p className="font-medium text-slate-900">{placement.job_role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <IndianRupee className="h-4 w-4 text-slate-500" />
                                <div>
                                    <p className="text-xs text-slate-500">Package</p>
                                    <p className="font-medium text-slate-900">
                                        ₹{placement.salary_package} LPA
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileCheck className="h-4 w-4 text-slate-500" />
                                <div>
                                    <p className="text-xs text-slate-500">Offer Letter</p>
                                    <p className="font-medium text-slate-900">
                                        {placement.offer_letter_url ? (
                                            <span className="text-emerald-600">✓ Verified</span>
                                        ) : (
                                            <span className="text-amber-600">Pending</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
