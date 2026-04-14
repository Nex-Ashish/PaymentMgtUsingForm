"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserNavbar from "../../components/layout/Navbar/UserNavbar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {(pathname === "/userInfo" || pathname === "/") && <UserNavbar />}

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}