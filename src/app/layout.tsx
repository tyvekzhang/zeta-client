import { AntdProvider } from '@/providers/antd-provider';
import '@/app/globals.css';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'FastWeb',
  description: 'One of the best scaffold in PyWeb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <AntdProvider>
            {/*<AuthProvider>{children}</AuthProvider>*/}
            {children}
          </AntdProvider>
      </body>
    </html>
  );
}
