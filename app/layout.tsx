import type { Metadata } from "next";
import { SiteFooter, SiteNavbar } from "@/components/layout";
import { ScrollTopOnNavigate } from "@/components/layout/ScrollTopOnNavigate";
import { CalBookingPopup } from "@/components/layout/CalBookingPopup";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./framer/index.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  icons: {
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: `${SITE_NAME}: AI Native Technology Firm` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
};

/**
 * Framer's layout template. The real site nests every route inside
 * `.framer-dUOq6.framer-28a2o6[data-layout-template=true]`, which is what gives
 * `.framer-kvjt16-container` (the nav, order -1000) its fixed positioning and
 * `.framer-a4yijq-container` (the footer, order 1002) its slot. Dropping this
 * wrapper leaves the navbar unpositioned, so it must stay.
 *
 * `.framer-1a909du` is the flex spacer that pushes the footer to the bottom on
 * short pages.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div id="main">
          <div
            className="framer-dUOq6 framer-28a2o6"
            data-layout-template="true"
            style={{ minHeight: "100vh", width: "auto" }}
          >
            <SiteNavbar />
            {children}
            <div className="framer-1a909du" />
            <SiteFooter />
          </div>
          {/* Lands in-site link clicks at the top of the next page — lib/scroll-top.ts. */}
          <ScrollTopOnNavigate />
          {/* Opens Cal.com's booking popup for links to the booking page — lib/booking.ts. */}
          <CalBookingPopup />
          {/* Site-wide structured data: the company and its website (lib/structured-data.ts). */}
          <JsonLd data={[organizationSchema(), websiteSchema()]} />
        </div>
      </body>
    </html>
  );
}
