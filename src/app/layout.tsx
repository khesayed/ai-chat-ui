import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocAi Assistant",
  description:
    "A local AI thought partner designed to think deeply and act clearly. It provides useful insights without noise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} h-full antialiased`}>
      <body className="flex min-h-full bg-slate-900">{children}</body>
    </html>
  );
}
