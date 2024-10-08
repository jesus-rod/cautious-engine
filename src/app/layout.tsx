import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SessionWrapper from '../components/SessionWrapper';
import './globals.css';

const fontSas = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Topicfy',
  description: 'Model topics from text files securely in your browser.',
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={fontSas.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionWrapper>
            <Container>
              <Header />
              {children}
              <Footer />
            </Container>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
