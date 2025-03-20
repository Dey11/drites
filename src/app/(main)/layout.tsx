import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";

import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Posts",
  description: "Check out the latest posts",
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
          <Header />
          <main className="mx-auto">{children}</main>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
