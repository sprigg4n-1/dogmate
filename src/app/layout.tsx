import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';

import { AuthProvider } from '@/app/Provider';
import { MantineProvider } from '@mantine/core';
import { CartProvider } from '@/hooks/useCart';
import { DogProvider } from '@/config/DogPrivider';

export const metadata: Metadata = {
  title: 'DogMate',
  description: 'Created by Vertex',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative h-screen flex flex-col bg-darkGreen">
        <CartProvider>
          <AuthProvider>
            <DogProvider>
              <MantineProvider>
                <Header />
                {children}
              </MantineProvider>
            </DogProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
