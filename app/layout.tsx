import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Tab } from "./lib/Tab";
import { Logo } from "./lib/Logo";
import { Toaster } from "./lib/toast/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "jijian",
  description: "RELAX YOUR LIFE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen p-6 flex flex-col items-center">
          <Logo />
          {children}
          <Tab />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
