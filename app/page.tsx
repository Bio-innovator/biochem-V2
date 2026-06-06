export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-6xl mb-4">🧬</div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Biochem-niche</h1>
      <p className="text-lg text-teal-600 mb-6">AP Biology 智能学习平台</p>
      <p className="text-slate-500 mb-8">迁移中，请稍后访问...</p>
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
          登录
        </button>
        <button className="px-6 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition">
          注册
        </button>
      </div>
    </main>
  );
}
