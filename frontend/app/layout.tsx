import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNavbar } from "@/components/layout";

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
      <body className={`${inter.variable} antialiased min-h-screen bg-slate-50`}>
        {/* Top Navigation */}
        <TopNavbar />

        {/* Content Layer */}
        <main className="min-h-[calc(100vh-3.5rem)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="animate-fade-in delay-100">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
