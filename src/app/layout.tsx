import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Blog",
  icons: {
    icon: "/favicon.ico",
  },
  description: "最初の投稿",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* このページがないと、最初のページが表示されずエラーが発生します */}
      <body>{children}</body>
    </html>
  );
}
