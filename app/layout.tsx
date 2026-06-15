import type { Metadata } from "next";
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
  title: "Cloudex Technologies | Build Intelligent Systems",
  description:
    "From AI employees that work autonomously to high-performing websites and custom software, Cloudex Technologies builds intelligent systems that help businesses operate smarter and scale with confidence.",
  metadataBase: new URL("https://cloudextechnologies.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cloudex Technologies | Build Intelligent Systems",
    description:
      "From AI employees that work autonomously to high-performing websites and custom software, Cloudex Technologies builds intelligent systems that help businesses operate smarter and scale with confidence.",
    url: "https://cloudextechnologies.io",
    siteName: "Cloudex Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloudex Technologies | Build Intelligent Systems",
    description:
      "From AI employees that work autonomously to high-performing websites and custom software, Cloudex Technologies builds intelligent systems that help businesses operate smarter and scale with confidence.",
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
