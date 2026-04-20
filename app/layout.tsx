import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Al Akeel MMV",
  description: "School Website",
  icons: {
    icon: "/2020/09/schoollogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen flex flex-col">
        {/* ✅ NAVBAR (ALL PAGES) */}
        <Navbar />

        {/* ✅ PAGE CONTENT */}
        <main className="flex-grow">{children}</main>

        {/* ✅ FOOTER (ALL PAGES) */}
        <Footer />
      </body>
    </html>
  );
}
