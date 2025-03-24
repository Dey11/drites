import { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Providers from "@/components/providers";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900", "100", "200", "300"],
});

export const metadata: Metadata = {
  title: {
    default: "Drites. - Express Your Ideas",
    template: "%s | Drites.",
  },
  description:
    "A modern blogging platform for sharing ideas, stories, and knowledge. Join our community of writers and readers.",
  keywords: [
    "blog",
    "writing",
    "articles",
    "content creation",
    "technical",
    "cs",
    "writers community",
  ],
  metadataBase: new URL("https://drites.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drites.site",
    title: "Drites. - Express Your Ideas",
    description:
      "A modern blogging platform for sharing ideas, stories, and knowledge.",
    siteName: "Drites.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${montserrat.variable} tracking-wide text-brand-text antialiased`}
        >
          <main className="mx-auto">{children}</main>
        </body>
      </html>
    </Providers>
  );
}
