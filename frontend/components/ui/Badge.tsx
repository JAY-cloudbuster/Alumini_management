import { cn } from '@/lib/utils';

interface BadgeProps {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    children: React.ReactNode;
    className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                variant === 'default' && 'bg-slate-100 text-slate-800',
                variant === 'success' && 'bg-emerald-100 text-emerald-800',
                variant === 'warning' && 'bg-amber-100 text-amber-800',
                variant === 'danger' && 'bg-red-100 text-red-800',
                variant === 'info' && 'bg-indigo-100 text-indigo-800',
                className
            )}
        >
            {children}
        </span>
    );
}
