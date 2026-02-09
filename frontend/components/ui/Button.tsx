import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                    // Variants
                    variant === 'primary' &&
                    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
                    variant === 'secondary' &&
                    'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400',
                    variant === 'ghost' &&
                    'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400',
                    variant === 'danger' &&
                    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
                    // Sizes
                    size === 'sm' && 'px-3 py-1.5 text-sm',
                    size === 'md' && 'px-4 py-2 text-sm',
                    size === 'lg' && 'px-6 py-3 text-base',
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
