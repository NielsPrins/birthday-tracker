import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Birthday tracker',
  description: 'Keep track of birthdays from friends and family',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Head>
        <title>Birthday tracker</title>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
