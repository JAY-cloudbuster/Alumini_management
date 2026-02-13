import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar, FloatingNav } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peer2Peer | Campus Networking",
  description: "Professional networking SaaS for colleges - connect students, alumni, and faculty.",
  keywords: ["networking", "college", "alumni", "placement", "career"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen relative`}>
        {/* Background Gradients handled in globals.css */}

        {/* Navigation Layer */}
        <Sidebar /> {/* Mobile Drawer */}
        <FloatingNav /> {/* Desktop Dock */}

        {/* Content Layer */}
        <main className="min-h-screen transition-all duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-32 py-8">
            <div className="animate-fade-in delay-100">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
