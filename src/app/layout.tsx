import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll Sections",
  description: "Next.js scroll between sections with URL sync",
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
