import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout";

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
      <body className={`${inter.variable} antialiased bg-slate-50`}>
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <div className="p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
