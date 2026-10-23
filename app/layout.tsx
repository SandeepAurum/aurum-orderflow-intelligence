import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aurum Orderflow Intelligence',
  description: 'Market planning dashboard with ORDERFLOW and ANALYTICS tabs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
