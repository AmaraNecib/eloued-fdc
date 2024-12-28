import { siteConfig } from "@/config/site-config";
import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Viewport, Metadata } from "next";
import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import Siteheader from "@/components/layout/siteheader";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  ...siteConfig,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html
        className={cn("min-h-screen", GeistSans.variable, GeistMono.variable)}
      >
        <body>
          <AppProviders>
            <Siteheader />
            {children}
            <SiteFooter />
          </AppProviders>
        </body>
      </html>
    </SessionProvider>
  );
}
