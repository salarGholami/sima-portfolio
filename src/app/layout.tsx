import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sima Gholami | Portfolio",
  description: "مدیر هنری و مدیر طراحی محصول",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
