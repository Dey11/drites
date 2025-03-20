import type { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";

import "../globals.css";

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
    <div>
      <Header />
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
