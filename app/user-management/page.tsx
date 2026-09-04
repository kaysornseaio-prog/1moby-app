'use client';

import Link from 'next/link';

export default function UserManagement() {
  const users = [
    { id: '1A120', name: 'James Williams', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100', department: 'IT Support', role: 'Administrator', status: 'Active' },
    { id: '1A121', name: 'Emma Sofia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', department: 'IT Support', role: 'Administrator', status: 'Active' },
    { id: '1A122', name: 'Emma Sofia', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', department: 'IT Support', role: 'Editor', status: 'Offline' },
    { id: '1A123', name: 'James Williams', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', department: 'Marketing', role: 'Editor', status: 'Offline' },
    { id: '1A124', name: 'James Williams', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', department: 'Sales', role: 'Viewer', status: 'Offline' },
    { id: '1A125', name: 'James Williams', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100', department: 'Sales', role: 'Viewer', status: 'Active' },
    { id: '1A126', name: 'James Williams', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', department: 'Marketing', role: 'Viewer', status: 'Offline' },
    { id: '1A127', name: 'James Williams', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100', department: 'Sales', role: 'Viewer', status: 'Offline' },
    { id: '1A128', name: 'James Williams', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100', department: 'Sales', role: 'Viewer', status: 'Offline' },
  ];

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="flex h-screen overflow-hidden bg-[#f0f4f9] text-gray-800">
        
        {/* === SIDEBAR === */}
        <aside className="w-64 bg-gradient-to-b from-[#1e4fcb] to-[#4376f6] text-white flex flex-col justify-between p-5 shrink-0">
          <div>
            <div className="text-2xl font-bold tracking-wider mb-8 mt-2 flex items-center gap-1">
              <span className="text-white font-extrabold">1MOBY</span>
            </div>
            
            {/* Navigation Menu (ลบลิงก์ Account ซ้ำซ้อนออกแล้ว) */}
            <nav className="space-y-2">
              <Link href="/system-overview" className="flex items-center gap-3 text-white/80 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-house text-xs"></i> System Overview
              </Link>
              <Link href="/user-management" className="flex items-center gap-3 bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-user text-xs"></i> User Management
              </Link>
              <Link href="/model-configuration" className="flex items-center gap-3 text-white/80 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-chart-line text-xs"></i> Model Configuration
              </Link>
              <Link href="/data-pipeline" className="flex items-center gap-3 text-white/80 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-bars text-xs"></i> Data Pipeline
              </Link>
            </nav>
          </div>

          {/* User Profile Card - ปุ่มกดไปหน้า Account หลักจุดเดียวด้านล่าง */}
          <Link 
            href="/account" 
            className="bg-[#1034a6]/30 p-3 rounded-2xl flex items-center justify-between border border-white/5 transition hover:bg-[#1034a6]/50 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="Emma" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20" 
              />
              <div>
                <p className="text-sm font-semibold text-white">Emma.S</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-white/50 pr-1"></i>
          </Link>
        </aside>

        {/* === MAIN CONTENT AREA === */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="bg-white px-8 py-3 flex items-center justify-between border-b border-gray-100 shrink-0">
            <div className="relative w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input type="text" placeholder="Search system..." className="w-full bg-[#f1f5f9] text-gray-700 pl-11 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 bg-[#e2f9ec] text-[#22c55e] px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span> ONLINE
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-bell text-lg"></i>
              </button>
              <button className="text-gray-400 hover:text-gray-600 relative">
                <i className="fa-solid fa-envelope text-lg"></i>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* รูปโปรไฟล์หัวมุมขวาบนกดไปหน้า Account */}
              <Link href="/account" className="transition hover:opacity-85">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User Profile" className="w-8 h-8 rounded-full object-cover" />
              </Link>
            </div>
          </header>

          <div className="p-8 space-y-6 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
              <div className="flex items-center gap-3">
                <button className="bg-[#3b82f6] hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-2">
                  <i className="fa-solid fa-plus"></i> Add New User
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-2">
                  <i className="fa-solid fa-file-export text-gray-400"></i> Export Users
                </button>
              </div>
            </div>

            {/* 3 TOP STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">125</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Active Session</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-microchip"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">AI Model Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">90%</p>
                </div>
              </div>
            </div>

            {/* DATA TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#e5e7eb]/60 text-gray-600 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                      <th className="py-4 px-6">User ID</th>
                      <th className="py-4 px-6">FullName</th>
                      <th className="py-4 px-6">Department</th>
                      <th className="py-4 px-6">Access Role</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                    {users.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-6 font-mono text-gray-900">{user.id}</td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                            <span className="text-gray-900 font-semibold">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-gray-600">{user.department}</td>
                        <td className="py-3.5 px-6 text-gray-600">{user.role}</td>
                        <td className="py-3.5 px-6">
                          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-bold ${
                            user.status === 'Active' 
                              ? 'bg-[#e2f9ec] text-[#22c55e]' 
                              : 'bg-[#f1f5f9] text-gray-400 border border-gray-200'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-blue-600 shadow-sm transition flex items-center justify-center">
                              <i className="fa-solid fa-arrow-right-to-bracket text-xs rotate-270"></i>
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition flex items-center justify-center">
                              <i className="fa-solid fa-trash-can text-xs"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}