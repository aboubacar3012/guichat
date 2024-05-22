import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsAnimations from "../components/StarsAnimations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guichat",
  description: "Connectez-vous et discutez avec vos amis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <StarsAnimations />
        </body>
    </html>
  );
}
