import type { Metadata } from "next";
import "./globals.css";
import { Space_Mono } from "next/font/google";
import { WalletProvider } from "./providers/WalletProvider";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fox AI Agent",
  description:
    "Create your own private AI-Agent, trained on your private data, secured with your private key.",
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    images: [
      {
        url: "/og.jpg",
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
    <html lang="en" className={`${spaceMono.variable}`}>
      <body className="font-barlow">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
