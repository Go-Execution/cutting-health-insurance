import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "David Cutting Insurance Services | Upland, CA",
  description:
    "Straightforward life, auto, home, and business insurance guidance in Upland, California.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>{children}</body>
    </html>
  );
}
