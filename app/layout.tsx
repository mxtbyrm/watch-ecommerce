import type React from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Playfair_Display as FontSerif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/app/providers";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Chrono Luxe | Luxury Watches",
  description: "Discover our exclusive collection of luxury timepieces",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 bg-background">{children}</main>
              <Footer />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
