import { cn } from "@/lib/utils";

interface SocialLayoutProps {
    children: React.ReactNode;
    rightSidebar?: React.ReactNode;
    className?: string;
}

export function SocialLayout({
    children,
    rightSidebar,
    className,
}: SocialLayoutProps) {
    return (
        <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8", className)}>
            {/* Main Feed */}
            <main className="lg:col-span-8 space-y-0">
                {children}
            </main>

            {/* Right Sidebar (Messages) */}
            <aside className="hidden lg:block lg:col-span-4">
                <div className="sticky top-20">
                    {rightSidebar}
                </div>
            </aside>
        </div>
    );
}
