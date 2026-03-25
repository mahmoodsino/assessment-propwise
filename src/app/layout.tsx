import type { Metadata } from "next";
import { Provider } from "jotai";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropWise CRM",
  description: "PropWise CRM Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
