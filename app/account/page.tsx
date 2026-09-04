'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  // States สำหรับ Preferences
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('10 Minutes');

  // States สำหรับ Form ข้อมูลผู้ใช้
  const [fullName, setFullName] = useState('Emma Sofia');
  const [email, setEmail] = useState('emma.bd@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('086-456-7894');
  const [role, setRole] = useState('Admin Panel');

  return (
    <>
      {/* Import Font Awesome Icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="flex h-screen overflow-hidden bg-[#f0f4f9] text-gray-800">
        
        {/* === SIDEBAR === */}
        <aside className="w-64 bg-gradient-to-b from-[#1e4fcb] to-[#4376f6] text-white flex flex-col justify-between p-5 shrink-0">
          <div>
            <div className="text-2xl font-bold tracking-wider mb-8 mt-2 flex items-center gap-1">
              <span className="text-white font-extrabold">1MOBY</span>
            </div>
            
            {/* Navigation Menu */}
            <nav className="space-y-2">
              <Link href="/system-overview" className="flex items-center gap-3 text-white/90 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-house text-xs"></i> System Overview
              </Link>
              <Link href="/user-management" className="flex items-center gap-3 text-white/90 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-user text-xs"></i> User Management
              </Link>
              <Link href="/model-configuration" className="flex items-center gap-3 text-white/90 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-chart-line text-xs"></i> Model Configuration
              </Link>
              <Link href="/data-pipeline" className="flex items-center gap-3 text-white/90 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-bars text-xs"></i> Data Pipeline
              </Link>
            </nav>
          </div>

          {/* User Profile Card */}
          <Link 
            href="/account" 
            className="bg-[#337CFF] border border-white/10 rounded-2xl p-3 flex items-center justify-between shadow-md mb-2 transition hover:bg-[#256be5] active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="Emma" 
                className="w-10 h-10 rounded-full object-cover border border-white/10" 
              />
              <span className="text-sm font-bold text-white tracking-wide">Emma.S</span>
            </div>
          </Link>
        </aside>

        {/* === MAIN CONTENT AREA === */}
        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Header Navbar */}
          <header className="bg-white px-8 py-3 flex items-center justify-between shrink-0">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
              Account
            </h1>

            {/* Right Status / Actions */}
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
              
              <Link href="/account" className="w-8 h-8 rounded-full overflow-hidden transition hover:opacity-80">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User Profile" className="w-full h-full object-cover" />
              </Link>
            </div>
          </header>

          {/* Wrapper สำหรับ Grid Content ด้านล่าง */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-y-auto">
            
            {/* === LEFT COLUMN: Profile Setting === */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-6">Profile Setting</h2>
                
                <div className="flex gap-6 items-start mb-6">
                  {/* Avatar Profile */}
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
                      alt="Emma Large" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Form Inputs */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#94a3b8] mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white border border-[#e2e8f0] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#334155] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#94a3b8] mb-1.5">Email</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-[#e2e8f0] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#475569] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#94a3b8] mb-1.5">Phone Number</label>
                      <input 
                        type="text" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-white border border-[#e2e8f0] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#475569] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#94a3b8] mb-1.5">Role</label>
                      <input 
                        type="text" 
                        value={role}
                        disabled
                        className="w-full bg-[#f8fafc] border border-[#e2e8f0] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#64748b] cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button className="bg-[#f06445] hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl w-24 shadow-sm transition active:scale-95">
                Logout
              </button>
            </div>

            {/* === RIGHT COLUMN: Preferences & Change Password === */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* SECTION: Preferences */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-5">Preferences</h2>
                
                <div className="space-y-5">
                  {/* System Alerts */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800">
                        <i className="fa-solid fa-bell text-lg"></i>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1e293b]">System Alerts</h4>
                        <p className="text-xs font-semibold text-[#94a3b8]">Notify when pipeline or retraining fails</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSystemAlerts(!systemAlerts)}
                      className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${systemAlerts ? 'bg-[#3b82f6]' : 'bg-gray-200'}`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${systemAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  {/* Two-Factor Auth (2FA) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800">
                        <i className="fa-solid fa-shield-halved text-lg"></i>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1e293b]">Two-Factor Auth (2FA)</h4>
                        <p className="text-xs font-semibold text-[#94a3b8]">Secure your admin panel account</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                      className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${twoFactorAuth ? 'bg-[#3b82f6]' : 'bg-gray-200'}`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${twoFactorAuth ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  {/* Session Timeout */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800">
                        <i className="fa-solid fa-clock text-lg"></i>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1e293b]">Session Timeout</h4>
                        <p className="text-xs font-semibold text-[#94a3b8]">Auto logout after inactivity</p>
                      </div>
                    </div>
                    <select 
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="bg-white text-slate-700 border border-[#e2e8f0] px-3 py-1.5 rounded-xl text-xs font-bold focus:outline-none cursor-pointer shadow-sm"
                    >
                      <option>5 Minutes</option>
                      <option>10 Minutes</option>
                      <option>30 Minutes</option>
                      <option>1 Hour</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION: Change Password */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-[#1e293b]">Change Password</h2>
                    <span className="text-[11px] font-bold text-[#22c55e]">Strong password required</span>
                  </div>

                  {/* ปรับโครงสร้างชุดนี้เป็น space-y-4 เพื่อจัดเรียงตรงลงมาทีละชั้น */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94a3b8] mb-1.5">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-[#f4f7fc] border border-[#cbd5e1] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94a3b8] mb-1.5">New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-[#f4f7fc] border border-[#cbd5e1] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94a3b8] mb-1.5">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-[#f4f7fc] border border-[#cbd5e1] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Buttons - ย้ายชิดขวาตาม Mockup */}
                <div className="flex justify-end gap-3 mt-6">
                  <button className="bg-[#3b82f6] hover:bg-blue-600 text-white text-xs font-bold px-7 py-2.5 rounded-xl shadow-sm transition active:scale-95">
                    Save Changes
                  </button>
                  <button className="bg-[#cbd5e1] hover:bg-slate-400 text-slate-600 hover:text-white text-xs font-bold px-9 py-2.5 rounded-xl transition active:scale-95">
                    Cancel
                  </button>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </>
  );
}