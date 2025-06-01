import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sima Gholami | Portfolio",
  description: "نمونه‌کارهای سیما غلامی، دیزاینر ارشد با تخصص در طراحی رابط و تجربه کاربری."

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
