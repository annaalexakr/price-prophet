import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Price Prophet",
  description: "Predict BTC, ETH, CELO, or Gold — win from the daily pot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased bg-gray-950 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
