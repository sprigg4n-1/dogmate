import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';

export const metadata: Metadata = {
  title: 'DogMate',
  description: 'Created by Vertex',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative h-screen flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
