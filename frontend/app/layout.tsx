import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "./providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Chat-app",
  description: "Built to learn Redis and Kafka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Toaster richColors duration={10000} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
