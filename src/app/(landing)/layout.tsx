import Header from "@/components/header";

import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`tracking-wide text-brand-text antialiased`}>
      <Header />
      <main className="mx-auto">{children}</main>
    </div>
  );
}
