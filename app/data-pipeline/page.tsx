'use client';

import { useState } from 'react';
import Link from 'next/link';

// === ข้อมูล Log ทั้ง 10 รายการตามรูปภาพ ===
const activityLogs = [
  { timestamp: '2026-05-13 14:15:02', taskName: 'Customer_Batch_03.csv', sourceDest: 'Sales_Sarah', activity: 'Waiting_In_Queue', status: 'PENDING', textColor: 'text-gray-800', dotColor: 'bg-yellow-400' },
  { timestamp: '2026-06-14 14:12:00', taskName: 'Marketing_Lead_Q2.xlsx', sourceDest: 'Mkt_Michael', activity: 'Waiting_In_Queue', status: 'PENDING', textColor: 'text-gray-800', dotColor: 'bg-yellow-400' },
  { timestamp: '2026-06-14 14:05:10', taskName: 'Customer_Batch_02.csv', sourceDest: 'Sales_Alex', activity: 'Model_Training', status: 'PROCESSING', textColor: 'text-gray-800', dotColor: 'bg-blue-500' },
  { timestamp: '2026-06-14 13:55:30', taskName: 'CRM_Ingest', sourceDest: 'CRM_System', activity: 'Ingestion_Complete', status: 'SUCCESS', textColor: 'text-gray-800', dotColor: 'bg-emerald-500' },
  { timestamp: '2026-06-14 11:20:15', taskName: 'Customer_Batch_01.csv', sourceDest: 'Sales_Emma', activity: 'Prediction_Calculated', status: 'SUCCESS', textColor: 'text-gray-800', dotColor: 'bg-emerald-500' },
  { timestamp: '2026-06-14 10:00:00', taskName: 'Old_Data_2025.csv', sourceDest: 'Admin_John', activity: 'File_Format_Error', status: 'FAILED', textColor: 'text-gray-800', dotColor: 'bg-red-500' },
  { timestamp: '2026-05-13 14:15:02', taskName: 'Customer_Batch_03.csv', sourceDest: 'Sales_Sarah', activity: 'Waiting_In_Queue', status: 'PENDING', textColor: 'text-gray-800', dotColor: 'bg-yellow-400' },
  { timestamp: '2026-06-14 14:12:00', taskName: 'Marketing_Lead_Q2.xlsx', sourceDest: 'Mkt_Michael', activity: 'Waiting_In_Queue', status: 'PENDING', textColor: 'text-gray-800', dotColor: 'bg-yellow-400' },
  { timestamp: '2026-06-14 14:05:10', taskName: 'Customer_Batch_02.csv', sourceDest: 'Sales_Alex', activity: 'Model_Training', status: 'PROCESSING', textColor: 'text-gray-800', dotColor: 'bg-blue-500' },
  { timestamp: '2026-06-14 13:55:30', taskName: 'CRM_Ingest', sourceDest: 'CRM_System', activity: 'Ingestion_Complete', status: 'SUCCESS', textColor: 'text-gray-800', dotColor: 'bg-emerald-500' },
];

export default function DataPipelinePage() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'model'>('pipeline');

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
            
            {/* Navigation Menu (ลบ Security Logs ออกแล้ว) */}
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
              
              <Link href="/data-pipeline" className="flex items-center gap-3  bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-bars text-xs"></i> Data Pipeline
              </Link>
            </nav>
          </div>


          {/* User Profile Card - เปลี่ยนเป็นปุ่มลิงก์กดไปหน้าโปรไฟล์ (/account) */}
          <Link 
            href="/account" 
            className="bg-[#1034a6]/30 p-3 rounded-2xl flex items-center justify-between border border-white/5 transition hover:bg-white/10 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Emma" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
              <div>
                <p className="text-sm font-semibold text-white">Emma.S</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-white/50 pr-1"></i>
          </Link>
        </aside>

        {/* === MAIN CONTENT AREA === */}
        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Header Navbar */}
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
              
              {/* รูปโปรไฟล์มุมขวาบน - เปลี่ยนเป็นลิงก์กดเข้าหน้าโปรไฟล์ได้ด้วยเช่นกัน */}
              <Link href="/account" className="w-8 h-8 rounded-full overflow-hidden transition hover:opacity-80">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User Profile" className="w-full h-full object-cover" />
              </Link>
            </div>
          </header>

          {/* Wrapper ห่อหุ้ม Content ทั้งหมด */}
          <div className="p-8 space-y-6 flex-1 flex flex-col overflow-y-auto">
            
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight shrink-0">
              Admin Portal - Data Pipeline
            </h1>
          
            {/* === STATS CARDS === */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 shrink-0">
              {/* Card 1 */}
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#E5EDFF] flex items-center justify-center text-[#4A72E1] shrink-0">
                  <i className="fa-solid fa-clipboard-list text-sm"></i>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-700 tracking-tight leading-none mb-1">Total Tasks</p>
                  <p className="text-[21px] font-black text-slate-800 leading-none">20</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#E5EDFF] flex items-center justify-center text-[#4A72E1] shrink-0">
                  <i className="fa-solid fa-network-wired text-xs"></i>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-700 tracking-tight leading-none mb-1">Total Destinations</p>
                  <p className="text-[21px] font-black text-slate-800 leading-none">4</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#E5EDFF] flex items-center justify-center text-[#4A72E1] shrink-0">
                  <i className="fa-solid fa-clock text-sm"></i>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-700 tracking-tight leading-none mb-1">Pipeline Uptime</p>
                  <p className="text-[21px] font-black text-slate-800 leading-none">90%</p>
                </div>
              </div>
              {/* Card 4 */}
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#E5EDFF] flex items-center justify-center text-[#4A72E1] shrink-0">
                  <i className="fa-solid fa-database text-xs"></i>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-700 tracking-tight leading-none mb-1">Data Transferred</p>
                  <p className="text-[21px] font-black text-slate-800 leading-none">1.8TB</p>
                </div>
              </div>
              {/* Card 5 */}
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#E4FBF0] flex items-center justify-center text-[#10B981] shrink-0">
                  <i className="fa-solid fa-circle-check text-sm"></i>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-700 tracking-tight leading-none mb-1">Pipeline Status</p>
                  <p className="text-[11px] font-black text-[#10B981] leading-none">ACTIVE & HEALTHY</p>
                </div>
              </div>
            </div>

            {/* === PIPELINE ACTIVITY LOGS TABLE === */}
            <div className="bg-white rounded-[20px] shadow-sm p-6 border border-slate-100 flex-1 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-5 shrink-0">
                <h2 className="text-[17px] font-extrabold text-slate-900 tracking-tight">Pipeline Activity Logs</h2>
                <button className="flex items-center gap-1.5 bg-[#4A72E1] hover:bg-blue-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition active:scale-95">
                  <i className="fa-solid fa-rotate text-[10px]"></i> Refresh
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-xs tracking-wider sticky top-0 bg-white z-10">
                      <th className="pb-3.5 font-semibold w-1/5">TimeStamp</th>
                      <th className="pb-3.5 font-semibold w-1/4">Task Name</th>
                      <th className="pb-3.5 font-semibold w-1/6">Source/Dest</th>
                      <th className="pb-3.5 font-semibold w-1/5">Activity</th>
                      <th className="pb-3.5 font-semibold w-1/6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activityLogs.map((log, index) => (
                      <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 text-[13px] text-slate-600 font-medium whitespace-nowrap">{log.timestamp}</td>
                        <td className="py-3 text-[13px] text-slate-900 font-bold whitespace-nowrap">{log.taskName}</td>
                        <td className="py-3 text-[13px] text-slate-600 font-semibold whitespace-nowrap">{log.sourceDest}</td>
                        <td className="py-3 text-[13px] text-slate-600 font-medium whitespace-nowrap">{log.activity}</td>
                        <td className="py-3 text-xs font-black whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 ${log.dotColor} rounded-full`}></span>
                            <span className={`${log.textColor} tracking-wider text-[11px]`}>{log.status}</span>
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