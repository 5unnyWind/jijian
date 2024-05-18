import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Tab } from "./lib/Tab";
import { Logo } from "./lib/Logo";
import { Toaster } from "./lib/toast/Toaster";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
export const metadata: Metadata = {
  title: "极减",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
