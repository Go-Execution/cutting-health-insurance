import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "David Cutting Insurance Services | Auto, Home, Business & Health Broker in Upland, CA",
  description:
    "Independent California insurance broker (CA License #0752131) in Upland, CA comparing multiple carriers for auto and home insurance, commercial business coverage, and health care plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink selection:bg-accent-soft selection:text-ink">
        {children}
      </body>
    </html>
  );
}
