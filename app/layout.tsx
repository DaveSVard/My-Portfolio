import type { Metadata } from "next";

import "./globals.css";
import { PageSwitchTransition } from "@/components/organisms/PageSwitchTransition";
import { PageSwitchAnimation } from "@/components/organisms/PageSwitchAnimation";
import Header from "@/components/templates/Header";
import { CustomThemeProvider } from "@/components/providers";
import { ThemeColorInjector } from "@/components/providers/ThemeColorInjector";
import { InteractiveCursor } from "@/components/atoms";

import "@fontsource/jetbrains-mono";
import "@fontsource/prata";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-family-primary">
        <ThemeColorInjector />
        <CustomThemeProvider>
          <InteractiveCursor />
          <Header />
          <PageSwitchAnimation />
          <main className="pt-24">
            <PageSwitchTransition>{children}</PageSwitchTransition>
          </main>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
