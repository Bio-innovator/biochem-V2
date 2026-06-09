'use client';

import { useState, useEffect } from 'react';
import { useAuth, useRole } from '@/components/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  displayName: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const role = useRole();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [filtered, setFiltered] = useState<UserData[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && (!user || role !== 'admin')) {
      router.push('/dashboard');
    }
  }, [user, isLoading, role, router]);

  useEffect(() => {
    if (role === 'admin') fetchUsers();
  }, [role]);

  useEffect(() => {
    filterUsers();
  }, [users, statusFilter, roleFilter, searchQuery]);

  async function fetchUsers() {
    try {
      setLoading(true);
      const data = await api.get('/api/admin/users');
      setUsers(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function filterUsers() {
    let result = users;

    if (statusFilter !== 'all') {
      result = result.filter((u) => u.status === statusFilter);
    }

    if (roleFilter !== 'all') {
      result = result.filter((u) => u.role === roleFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.displayName && u.displayName.includes(searchQuery))
      );
    }

    setFiltered(result);
  }

  const stats = {
    total: users.length,
    pending: users.filter((u) => u.status === 'PENDING').length,
    approved: users.filter((u) => u.status === 'APPROVED').length,
    students: users.filter((u) => u.role === 'STUDENT').length,
    teachers: users.filter((u) => u.role === 'TEACHER').length,
    admins: users.filter((u) => u.role === 'ADMIN').length,
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">加载中...</div>;
  }

  if (!user || role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">⚙️ 管理后台</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: '总用户', value: stats.total, color: 'text-slate-700' },
            { label: '待审核', value: stats.pending, color: 'text-amber-600' },
            { label: '已通过', value: stats.approved, color: 'text-green-600' },
            { label: '学生', value: stats.students, color: 'text-blue-600' },
            { label: '教师', value: stats.teachers, color: 'text-teal-600' },
            { label: '管理员', value: stats.admins, color: 'text-purple-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border border-slate-200 p-4 text-center">
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">状态</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="all">全部状态</option>
                <option value="PENDING">待审核</option>
                <option value="APPROVED">已通过</option>
                <option value="REJECTED">已拒绝</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">角色</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="all">全部角色</option>
                <option value="STUDENT">学生</option>
                <option value="TEACHER">教师</option>
                <option value="ADMIN">管理员</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-slate-500 mb-1.5">搜索</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="用户名、邮箱..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition"
            >
              刷新
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">用户列表</h2>
            <span className="text-xs text-slate-400">共 {filtered.length} 条</span>
          </div>

          {error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">用户名</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">邮箱</th>
                    <th className="text-center text-xs font-medium text-slate-500 px-4 py-3">角色</th>
                    <th className="text-center text-xs font-medium text-slate-500 px-4 py-3">状态</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">注册时间</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-slate-800">{u.username}</div>
                        {u.displayName && (
                          <div className="text-xs text-slate-400">{u.displayName}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{u.email}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          u.role === 'ADMIN'
                            ? 'bg-purple-50 text-purple-600'
                            : u.role === 'TEACHER'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-blue-50 text-blue-600'
                        }`}>
                          {u.role === 'STUDENT' ? '学生' : u.role === 'TEACHER' ? '教师' : '管理员'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          u.status === 'APPROVED'
                            ? 'bg-green-50 text-green-600'
                            : u.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-red-50 text-red-500'
                        }`}>
                          {u.status === 'APPROVED' ? '已通过' : u.status === 'PENDING' ? '待审核' : '已拒绝'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {new Date(u.createdAt).toLocaleDateString('zh-CN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtered.length === 0 && !error && (
            <div className="p-8 text-center text-slate-400">
              没有找到匹配的用户
            </div>
          )}
        </div>

        {/* System Info */}
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-3">📊 系统数据统计</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: '知识点总数', value: '53', sub: '8 个单元' },
              { label: '小测题目', value: '40', sub: '覆盖全部单元' },
              { label: '词汇量', value: '202+', sub: '中英双语' },
              { label: '专业方向', value: '10', sub: '本硕覆盖' },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 rounded-lg p-3">
                <div className="text-lg font-bold text-teal-600">{s.value}</div>
                <div className="text-xs text-slate-600">{s.label}</div>
                <div className="text-[10px] text-slate-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
