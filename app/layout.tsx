import type { Metadata } from "next";
import "./globals.css";
import { Barlow } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invest AI Agent",
  description:
    "Build your personal AI trading agent to automate smart investment decisions on Solana",
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Invest AI Agent Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body className="font-barlow">{children}</body>
    </html>
  );
}
