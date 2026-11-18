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
  title: "David Cutting Insurance Services | Health Insurance in Upland, CA",
  description:
    "Simple, transparent health insurance guidance for California individuals, families, Medicare beneficiaries, and small businesses in Upland, CA.",
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
