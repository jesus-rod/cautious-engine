import type {Metadata} from "next";
import {ThemeProvider} from 'next-themes';
import {Inter} from "next/font/google";
import Container from "./components/container";
import Header from "./components/header";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Topic Modeling",
  description: "Using topic modeling to analyze text files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Container>
            <Header />
            {children}
          </Container>
        </ThemeProvider>
      </body>

    </html>
  );
}
