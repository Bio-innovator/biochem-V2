import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthContext';
import { LanguageProvider } from '@/components/LanguageContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Biochem-niche | Biology Learning Platform',
  description: 'Biology learning platform with quiz and exam',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
