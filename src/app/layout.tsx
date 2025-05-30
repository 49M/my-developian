import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Developian',
  description: 'Your ultamite personal growth and goal oriented assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
