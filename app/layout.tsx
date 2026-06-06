export const metadata = {
  title: 'Biochem-niche | AP Biology Learning Platform',
  description: 'AP Biology learning platform with role-based access',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-white text-slate-800">{children}</body>
    </html>
  );
}
