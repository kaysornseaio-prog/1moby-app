'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Chart from 'chart.js/auto';

export default function SystemOverview() {
  const churnChartRef = useRef<HTMLCanvasElement | null>(null);
  const trainingChartRef = useRef<HTMLCanvasElement | null>(null);
  const sourcesChartRef = useRef<HTMLCanvasElement | null>(null);

  // State สำหรับเปิด-ปิด Popover
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  useEffect(() => {
    let churnChart: Chart | null = null;
    let trainingChart: Chart | null = null;
    let sourcesChart: Chart | null = null;

    // 1. Predicted vs Actual Churn Chart
    if (churnChartRef.current) {
      churnChart = new Chart(churnChartRef.current, {
        type: 'line',
        data: {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Predicted',
              data: [32, 42, 45, 35, 82, 75, 48],
              borderColor: '#94a3b8',
              backgroundColor: 'transparent',
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 0
            },
            {
              label: 'Actual',
              data: [0, 32, 48, 33, 85, 48, 115],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { min: 0, max: 120, ticks: { stepSize: 30, font: { size: 10 } }, grid: { color: '#f1f5f9' } },
            x: { ticks: { font: { size: 10 } }, grid: { display: false } }
          }
        }
      });
    }

    // 2. Model Training Success
    if (trainingChartRef.current) {
      trainingChart = new Chart(trainingChartRef.current, {
        type: 'bar',
        data: {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          datasets: [
            {
              data: [40, 100, 30, 80, 60, 50, 40, 100, 35, 50, 60, 80],
              backgroundColor: '#34d399',
              borderRadius: 4,
              barPercentage: 0.4
            },
            {
              data: [30, 0, 60, 0, 40, 0, 60, 0, 48, 0, 52, 0],
              backgroundColor: '#3b82f6',
              borderRadius: 4,
              barPercentage: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { min: 40, max: 100, ticks: { stepSize: 20, font: { size: 10 } }, grid: { color: '#f1f5f9' } },
            x: { ticks: { display: false }, grid: { display: false } }
          }
        }
      });
    }

    // 3. Data Sources Distribution
    if (sourcesChartRef.current) {
      sourcesChart = new Chart(sourcesChartRef.current, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [50, 33.3, 16.7],
            backgroundColor: ['#2563eb', '#34d399', '#94a3b8'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: { legend: { display: false } }
        }
      });
    }

    return () => {
      if (churnChart) churnChart.destroy();
      if (trainingChart) trainingChart.destroy();
      if (sourcesChart) sourcesChart.destroy();
    };
  }, []);

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
            
            {/* Navigation Menu */}
            <nav className="space-y-2">
              <Link href="/system-overview" className="flex items-center gap-3 bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-house text-xs"></i> System Overview
              </Link>
              <Link href="/user-management" className="flex items-center gap-3 text-white/80 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
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

          {/* User Profile Card */}
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
          <header className="bg-white px-8 py-3 flex items-center justify-between border-b border-gray-100 shrink-0 relative z-30">
            <div className="relative w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input type="text" placeholder="Search system..." className="w-full bg-[#f1f5f9] text-gray-700 pl-11 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 bg-[#e2f9ec] text-[#22c55e] px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span> ONLINE
              </div>

              {/* ===== NOTIFICATION BUTTON & POPOVER ===== */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsEmailOpen(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition cursor-pointer relative p-1"
                >
                  <i className="fa-solid fa-bell text-lg"></i>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Popover Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Notifications</h4>
                    
                    <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                      {/* Alert Item 1: Critical */}
                      <div className="flex items-start gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-1"></span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 leading-tight">
                            [CRITICAL] 14:10:01
                          </p>
                          <p className="text-gray-600 text-[11px] mt-0.5">Model Re-training Failed</p>
                          <p className="text-gray-500 text-[11px] italic">"Model Configuration error detected"</p>
                          <p className="text-gray-400 text-[10px] mt-1 font-medium">1 Min ago</p>
                        </div>
                      </div>

                      {/* Alert Item 2: Info */}
                      <div className="flex items-start gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-1"></span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 leading-tight">
                            [INFO] 14:10:01
                          </p>
                          <p className="text-gray-600 text-[11px] mt-0.5">New Data Sync Successful</p>
                          <p className="text-gray-500 text-[11px] italic">"1.2M records updated from CRM"</p>
                          <p className="text-gray-400 text-[10px] mt-1 font-medium">1h ago</p>
                        </div>
                      </div>

                      {/* Alert Item 3: Warning */}
                      <div className="flex items-start gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0 mt-1"></span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 leading-tight">
                            [WARNING] 09:15:32
                          </p>
                          <p className="text-gray-600 text-[11px] mt-0.5">CPU Usage reached 90%</p>
                          <p className="text-gray-400 text-[10px] mt-1 font-medium">5h ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ===== EMAIL MESSAGES BUTTON & POPOVER ===== */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsEmailOpen(!isEmailOpen);
                    setIsNotificationOpen(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition cursor-pointer relative p-1"
                >
                  <i className="fa-solid fa-envelope text-lg"></i>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Email Messages Popover Dropdown */}
                {isEmailOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 text-sm">Email Messages</h4>
                      <a 
                        href="https://mail.google.com" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 hover:underline text-[11px] font-medium flex items-center gap-1"
                      >
                        Open Gmail <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                      </a>
                    </div>
                    
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                      {/* Email Item 1 */}
                      <div className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-bold text-gray-800 text-[12px]">IT Support Team</span>
                          <span className="text-gray-400 text-[10px]">10:30 AM</span>
                        </div>
                        <p className="font-semibold text-gray-700 text-[11px] truncate">Weekly Model Training Status</p>
                        <p className="text-gray-400 text-[10px] truncate mt-0.5">
                          The scheduled model training pipeline has completed with 92.5% accuracy...
                        </p>
                      </div>

                      {/* Email Item 2 */}
                      <div className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-bold text-gray-800 text-[12px]">Alex Rivera</span>
                          <span className="text-gray-400 text-[10px]">Yesterday</span>
                        </div>
                        <p className="font-semibold text-gray-700 text-[11px] truncate">Data Drift Warning on Batch_01</p>
                        <p className="text-gray-400 text-[10px] truncate mt-0.5">
                          Please check the latest feature distribution for customer segment B...
                        </p>
                      </div>

                      {/* Email Item 3 */}
                      <div className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-bold text-gray-800 text-[12px]">System Administrator</span>
                          <span className="text-gray-400 text-[10px]">2 days ago</span>
                        </div>
                        <p className="font-semibold text-gray-700 text-[11px] truncate">Scheduled Infrastructure Maintenance</p>
                        <p className="text-gray-400 text-[10px] truncate mt-0.5">
                          Servers will undergo maintenance this Sunday from 02:00 UTC to 04:00 UTC...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* รูปโปรไฟล์หัวมุมขวาบนกดไปหน้า Account */}
              <Link href="/account" className="transition hover:opacity-85">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User Profile" className="w-8 h-8 rounded-full object-cover" />
              </Link>
            </div>
          </header>

          <div className="p-8 space-y-6 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Overview</h1>

            {/* 4 TOP STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">System Health</p>
                  <p className="text-2xl font-bold text-gray-900">90.89%</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Model Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">90.01%</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Active Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-rotate"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Last Sync</p>
                  <p className="text-2xl font-bold text-gray-900">5 mins ago</p>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Predicted vs Actual Churn (Last 7 Days)</h3>
                  <div className="h-64"><canvas ref={churnChartRef}></canvas></div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Model Training Success (Last 30 Days)</h3>
                  <div className="h-64"><canvas ref={trainingChartRef}></canvas></div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Server Load & Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-gray-600 mb-1"><span>CPU</span><span>90%</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-gray-600 mb-1"><span>RAM</span><span>60%</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-gray-600 mb-1"><span>Disk</span><span>10%</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Data Sources Distribution</h3>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-32 h-32"><canvas ref={sourcesChartRef}></canvas></div>
                    <div className="text-xs space-y-2 font-medium text-gray-500 pr-2 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-600 inline-block"></span><span>CRM:</span></div>
                        <span className="font-semibold text-gray-700">45 (50.0%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-400 inline-block"></span><span>POS:</span></div>
                        <span className="font-semibold text-gray-700">30 (33.3%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-gray-400 inline-block"></span><span>APP:</span></div>
                        <span className="font-semibold text-gray-700">15 (16.7%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">System Alerts</h3>
                  <p className="text-[10px] text-gray-400 font-bold mb-3">Severity:</p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-start gap-1">
                      <span className="text-red-600 font-bold shrink-0">[CRITICAL]</span>
                      <span className="text-gray-700 font-semibold">14:10:01 – Model Re-training Failed</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-green-600 font-bold shrink-0">[INFO]</span>
                      <span className="text-gray-700 font-semibold">14:10:01 – New Data Sync Successful</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-green-600 font-bold shrink-0">[INFO]</span>
                      <span className="text-gray-700 font-semibold">14:10:01 – New Data Sync Successful</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}