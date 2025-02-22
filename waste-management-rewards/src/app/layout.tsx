import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RewardsProvider } from '@/components/rewards-features'; // Update this path based on where you save the rewards features file

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bin.AI - Waste Management Rewards",
  description: "Earn rewards for sustainable waste management practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RewardsProvider>
          {children}
        </RewardsProvider>
      </body>
    </html>
  );
}