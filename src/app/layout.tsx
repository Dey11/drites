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
  title: "Write.",
  description: "Just another blog.",
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
