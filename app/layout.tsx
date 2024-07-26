import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { PageSwitchTransition } from "@/components/organisms/PageSwitchTransition";
import { PageSwitchAnimation } from "@/components/organisms/PageSwitchAnimation";
import { Header } from "@/components/templates/Header";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: ":)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <Header />
        <PageSwitchAnimation />
        <PageSwitchTransition>{children}</PageSwitchTransition>
      </body>
    </html>
  );
}
