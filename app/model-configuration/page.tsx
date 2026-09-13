'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface NotificationItem {
  id: string;
  type: 'CRITICAL' | 'INFO' | 'WARNING';
  time: string;
  title: string;
  description: string;
  ago: string;
}

interface EmailNotificationItem {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  time: string;
  gmailUrl: string;
}

export default function ModelConfiguration() {
  const [algorithm, setAlgorithm] = useState('Auto-Select (Best Precision)');
  const [learningRate, setLearningRate] = useState('0.095');
  const [regularization, setRegularization] = useState('2');
  
  // State 1: เปิด/ปิด Automated Retraining
  const [autoRetraining, setAutoRetraining] = useState(true);
  
  // State 2: ค่า Churn Risk Threshold (0.0 ถึง 1.0)
  const [threshold, setThreshold] = useState(0.35);

  // State สำหรับควบคุมการเปิด-ปิด System Notifications & Email Dropdowns
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  const activityLogs = [
    { timestamp: '2026-06-14 14:15', action: 'MODEL_TUNING', target: 'Learning Rate', status: 'SUCCESS' },
    { timestamp: '2026-06-14 11:20', action: 'TOGGLE_SWITCH', target: 'Automated Retraining', status: 'SUCCESS' },
    { timestamp: '2026-06-13 09:45', action: 'PARAM_UPDATE', target: 'Regularization', status: 'SUCCESS' },
    { timestamp: '2026-06-12 14:15', action: 'MODEL_SYNC', target: 'Batch_Customer_01', status: 'FAIL (Retry)' },
    { timestamp: '2026-06-11 14:15', action: 'MODEL_TUNING', target: 'Learning Rate', status: 'SUCCESS' },
  ];

  // รายการ System Notification
  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'CRITICAL',
      time: '14:10:01',
      title: 'Model Re-training Failed',
      description: '"Model Configuration error detected"',
      ago: '1 Min ago',
    },
    {
      id: '2',
      type: 'INFO',
      time: '14:10:01',
      title: 'New Data Sync Successful',
      description: '"1.2M records updated from CRM"',
      ago: '1h ago',
    },
    {
      id: '3',
      type: 'WARNING',
      time: '09:15:32',
      title: 'CPU Usage reached 90%',
      description: '',
      ago: '5h ago',
    },
  ];

  // รายการ Email Notification พร้อมลิงก์ตรงไปยัง Gmail
  const emailNotifications: EmailNotificationItem[] = [
    {
      id: 'e1',
      senderName: 'IT Support Team',
      senderEmail: 'support@company.com',
      subject: 'Weekly Model Training Status',
      snippet: 'The scheduled model training pipeline has completed with 92.5% accuracy...',
      time: '10:30 AM',
      gmailUrl: 'https://mail.google.com/mail/u/0/#inbox',
    },
    {
      id: 'e2',
      senderName: 'Alex Rivera',
      senderEmail: 'alex.r@company.com',
      subject: 'Data Drift Warning on Batch_01',
      snippet: 'Please check the latest feature distribution for customer segment B...',
      time: 'Yesterday',
      gmailUrl: 'https://mail.google.com/mail/u/0/#inbox',
    },
    {
      id: 'e3',
      senderName: 'System Administrator',
      senderEmail: 'admin@company.com',
      subject: 'Scheduled Infrastructure Maintenance',
      snippet: 'Servers will undergo maintenance this Sunday from 02:00 UTC to 04:00 UTC...',
      time: '2 days ago',
      gmailUrl: 'https://mail.google.com/mail/u/0/#inbox',
    },
  ];

  // ปิด Dropdown เมื่อคลิกภายนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (emailRef.current && !emailRef.current.contains(event.target as Node)) {
        setIsEmailOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
            
            <nav className="space-y-2">
              <Link href="/system-overview" className="flex items-center gap-3 text-white/80 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-house text-xs"></i> System Overview
              </Link>
              <Link href="/user-management" className="flex items-center gap-3 text-white/80 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-user text-xs"></i> User Management
              </Link>
              <Link href="/model-configuration" className="flex items-center gap-3 bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-chart-line text-xs"></i> Model Configuration
              </Link>
              <Link href="/data-pipeline" className="flex items-center gap-3 text-white/80 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition">
                <i className="fa-solid fa-bars text-xs"></i> Data Pipeline
              </Link>
            </nav>
          </div>

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

        {/* === MAIN CONTENT === */}
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

              {/* SYSTEM NOTIFICATIONS DROPDOWN */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsEmailOpen(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 relative cursor-pointer pt-1"
                >
                  <i className="fa-solid fa-bell text-lg"></i>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <h3 className="text-base font-extrabold text-gray-900 mb-4">Notifications</h3>

                    <div className="space-y-4">
                      {notifications.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 text-xs">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${
                            item.type === 'CRITICAL' ? 'bg-red-500' :
                            item.type === 'INFO' ? 'bg-emerald-500' : 'bg-amber-400'
                          }`} />

                          <div className="space-y-0.5">
                            <p className="font-bold text-gray-900 leading-tight">
                              [{item.type}] <span className="font-semibold text-gray-700">{item.time}</span>
                            </p>
                            <p className="text-gray-600 font-medium">{item.title}</p>
                            {item.description && (
                              <p className="text-gray-400 italic">{item.description}</p>
                            )}
                            <p className="text-gray-400 pt-0.5">{item.ago}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* EMAIL NOTIFICATIONS DROPDOWN */}
              <div className="relative" ref={emailRef}>
                <button 
                  onClick={() => {
                    setIsEmailOpen(!isEmailOpen);
                    setIsNotificationOpen(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 relative cursor-pointer pt-1"
                >
                  <i className="fa-solid fa-envelope text-lg"></i>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {isEmailOpen && (
                  <div className="absolute right-0 mt-3 w-88 bg-white rounded-3xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-extrabold text-gray-900">Email Messages</h3>
                      <a 
                        href="https://mail.google.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
                      >
                        Open Gmail <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                      </a>
                    </div>

                    <div className="space-y-3">
                      {emailNotifications.map((mail) => (
                        <a
                          key={mail.id}
                          href={mail.gmailUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block p-3 rounded-2xl hover:bg-blue-50/60 transition border border-gray-50 group cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition">
                              {mail.senderName}
                            </span>
                            <span className="text-[10px] text-gray-400">{mail.time}</span>
                          </div>
                          <p className="text-xs font-semibold text-gray-700 truncate">{mail.subject}</p>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">{mail.snippet}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/account">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User" className="w-8 h-8 rounded-full object-cover" />
              </Link>
            </div>
          </header>

          <div className="p-8 space-y-6 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Model Configuration</h1>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-microchip"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">AI Model Version</p>
                  <p className="text-2xl font-bold text-gray-900">v3.1</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-chart-bar"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Model Precision</p>
                  <p className="text-2xl font-bold text-gray-900">92.5%</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-gauge-high"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Model Latency</p>
                  <p className="text-2xl font-bold text-gray-900">1.2s</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-box"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Model Size</p>
                  <p className="text-2xl font-bold text-gray-900">120 MB</p>
                </div>
              </div>
            </div>

            {/* MIDDLE ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Algorithm Selection */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Algorithm Selection</h3>
                  <select 
                    value={algorithm} 
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="w-full bg-white text-gray-700 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option>Auto-Select (Best Precision)</option>
                    <option>Auto-Select (Fastest Latency)</option>
                    <option>Ensemble Voting (All Models)</option>
                    <option>Force XGBoost Only</option>
                    <option>Force LightGBM Only</option>
                  </select>
                </div>
              </div>

              {/* Churn Risk Threshold Slider */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-800">Churn Risk Threshold</h3>
                  <span className="text-[11px] font-bold text-[#1e4fcb] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 shadow-sm">
                    {threshold.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-1.5 my-auto">
                  <div className="relative w-full h-7 flex items-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-full bg-gradient-to-r from-green-400 via-amber-400 to-orange-400 pointer-events-none" />

                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#1e4fcb] rounded-full shadow-md pointer-events-none z-10 transition-none"
                      style={{ 
                        left: `calc(${threshold * 100}% - ${(threshold * 24)}px + 12px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />

                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={threshold}
                      onChange={(e) => setThreshold(parseFloat(e.target.value))}
                      className="w-full h-full opacity-0 cursor-pointer relative z-20"
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-bold text-gray-400 px-0.5">
                    <span>0.0</span>
                    <span>1.0</span>
                  </div>
                </div>
              </div>

              {/* Risk Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <p className="text-xs font-bold text-gray-800">Avg. Churn Risk</p>
                  <div className="flex flex-col items-center justify-center py-2">
                    <i className="fa-solid fa-gauge-simple text-2xl text-yellow-500 mb-1"></i>
                    <p className="text-xl font-bold text-gray-900">{Math.round(threshold * 100)}%</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <p className="text-xs font-bold text-gray-800">Total At-Risk Clients</p>
                  <div className="flex flex-col items-center justify-center py-2">
                    <div className="relative">
                      <i className="fa-solid fa-users text-2xl text-blue-500 mb-1"></i>
                      <i className="fa-solid fa-triangle-exclamation text-xs text-red-500 absolute -bottom-1 -right-1 bg-white rounded-full"></i>
                    </div>
                    <p className="text-xl font-bold text-gray-900">1,250</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <h3 className="text-sm font-bold text-gray-800">Hyperparameter Tuning</h3>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Learning Rate</label>
                    <input 
                      type="text" 
                      value={learningRate} 
                      onChange={(e) => setLearningRate(e.target.value)}
                      className="w-full bg-white text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Regularization</label>
                    <input 
                      type="text" 
                      value={regularization} 
                      onChange={(e) => setRegularization(e.target.value)}
                      className="w-full bg-white text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <h3 className="text-sm font-bold text-gray-800">Model Training</h3>
                  
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs font-semibold text-gray-700">Automated Retraining</span>
                    
                    <button 
                      type="button"
                      role="switch"
                      aria-checked={autoRetraining}
                      onClick={() => setAutoRetraining(!autoRetraining)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        autoRetraining ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span 
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          autoRetraining ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase shadow-sm transition cursor-pointer">
                    Save Configuration
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Training Data Source</h3>
                  <div className="space-y-3 text-xs font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-medium">Data Pipeline:</span>
                      <span>Batch_Customer_01</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-medium">Training Window:</span>
                      <span>Last 30 Days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-medium">Data Status:</span>
                      <span className="text-green-600 font-bold">Ready (Synced)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LOGS TABLE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">System Activity Logs</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100">
                        <th className="py-3 px-5">Timestamp</th>
                        <th className="py-3 px-5">Action</th>
                        <th className="py-3 px-5">Target Resource</th>
                        <th className="py-3 px-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                      {activityLogs.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-5 font-mono">{log.timestamp}</td>
                          <td className="py-3 px-5 font-mono text-gray-800">{log.action}</td>
                          <td className="py-3 px-5 text-gray-500">{log.target}</td>
                          <td className="py-3 px-5">
                            <span className={`font-bold ${log.status === 'SUCCESS' ? 'text-green-600' : 'text-red-500'}`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="text-sm font-bold text-gray-800">Login Attempts</h3>
                <div className="space-y-2.5 text-xs font-semibold text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Date:</span>
                    <span>2026-06-14</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Total Attempts:</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Successful:</span>
                    <span className="text-gray-900">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Failed Attempts:</span>
                    <span className="text-red-500">1</span>
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