import type {Metadata} from "next";
import {ThemeProvider} from 'next-themes';
import {Plus_Jakarta_Sans} from "next/font/google";
import Footer from "./components/Footer";
import Container from "./components/container";
import Header from "./components/header";
import "./globals.css";

const fontSas = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Topicfy",
  description: "Model topics from text files securely in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSas.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>
        </ThemeProvider>
      </body>

    </html>
  );
}
