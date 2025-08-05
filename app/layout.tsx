import type { Metadata } from "next";
import "./globals.css";

import { PageSwitchTransition } from "@/components/organisms/PageSwitchTransition";
import { PageSwitchAnimation } from "@/components/organisms/PageSwitchAnimation";
import Header from "@/components/templates/Header";

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
      <body className="font-family-primary">
        <Header />
        <PageSwitchAnimation />
        <PageSwitchTransition>{children}</PageSwitchTransition>
      </body>
    </html>
  );
}
