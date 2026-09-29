import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // Fallbacks only. Title, description and canonical are set per route: a
  // canonical here would be inherited by every page that forgot its own.
  title: "Cloudex Technologies | AI Employees & Custom Software",
  description:
    "Cloudex Technologies builds AI employees, high-performing websites and custom software that help businesses run smarter and scale.",
  metadataBase: new URL("https://cloudextechnologies.io"),
  alternates: {
    types: {
      "application/rss+xml": "/insights/feed.xml",
    },
  },
  openGraph: {
    siteName: "Cloudex Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080d1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={cn(spaceGrotesk.variable, dmSans.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
