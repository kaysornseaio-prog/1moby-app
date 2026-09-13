'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// === ข้อมูลแจ้งเตือน (Notifications) ===
const notificationsList = [
  {
    id: 1,
    level: '[CRITICAL]',
    time: '14:10:01',
    title: 'Model Re-training Failed',
    detail: '"Model Configuration error detected"',
    timeAgo: '1 Min ago',
    dotColor: 'bg-red-500',
  },
  {
    id: 2,
    level: '[INFO]',
    time: '14:10:01',
    title: 'New Data Sync Successful',
    detail: '"1.2M records updated from CRM"',
    timeAgo: '1h ago',
    dotColor: 'bg-emerald-500',
  },
  {
    id: 3,
    level: '[WARNING]',
    time: '09:15:32',
    title: 'CPU Usage reached 90%',
    detail: '',
    timeAgo: '5h ago',
    dotColor: 'bg-amber-400',
  },
];

// === ข้อมูลอีเมล (Email Messages) ===
const emailsList = [
  {
    id: 1,
    sender: 'IT Support Team',
    time: '10:30 AM',
    subject: 'Weekly Model Training Status',
    snippet: 'The scheduled model training pipeline has completed with 92.5% accuracy...',
  },
  {
    id: 2,
    sender: 'Alex Rivera',
    time: 'Yesterday',
    subject: 'Data Drift Warning on Batch_01',
    snippet: 'Please check the latest feature distribution for customer segment B...',
  },
  {
    id: 3,
    sender: 'System Administrator',
    time: '2 days ago',
    subject: 'Scheduled Infrastructure Maintenance',
    snippet: 'Servers will undergo maintenance this Sunday from 02:00 UTC to 04:00 UTC...',
  },
];

export default function AccountPage() {
  // States สำหรับ Preferences
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('10 Minutes');

  // States สำหรับ Form ข้อมูลผู้ใช้
  const [fullName, setFullName] = useState('Emma Sofia');
  const [email, setEmail] = useState('emma.bd@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('0123456789');
  const [role, setRole] = useState('Admin Panel');

  // States สำหรับเปิด/ปิด Dropdown Popover
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmails, setShowEmails] = useState(false);

  // === SECURITY STATES FOR PASSWORD CHANGE & 2FA ===
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  // 2FA Flow States
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtpCode, setGeneratedOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timer, setTimer] = useState(60);

  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Validation Checklists
  const passwordCriteria = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  // Timer Countdown สำหรับส่งรหัสซ้ำ
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (show2FAModal && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [show2FAModal, timer]);

  // ฟังก์ชันสุ่มรหัส OTP และดึงค่ามาแสดงบนหน้าจอ Modal
  const sendSmsOtp = async () => {
    setIsSendingSms(true);
    setOtpError('');

    // สุ่มรหัส OTP 6 หลัก
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtpCode(randomOtp);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          otp: randomOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'ไม่สามารถสร้างรหัส OTP ได้');
      }

      setTimer(60);
    } catch (error: any) {
      setOtpError(error.message || 'เกิดข้อผิดพลาดในการสร้าง OTP');
    } finally {
      setIsSendingSms(false);
    }
  };

  // Handle Form Submission Step 1: ตรวจสอบความถูกต้องและเปิด Modal
  const handleInitiatePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!currentPassword) {
      setPasswordError('กรุณากรอกรหัสผ่านปัจจุบัน');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }
    if (Object.values(passwordCriteria).filter(Boolean).length < 4) {
      setPasswordError('รหัสผ่านใหม่ต้องตรงตามเงื่อนไขความปลอดภัยอย่างน้อย 4 ข้อ');
      return;
    }

    // เปิด Modal และสร้างรหัส OTP จำลองโชว์บนจอ
    setShow2FAModal(true);
    await sendSmsOtp();
  };

  // Handle OTP Input Change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtp(digits);
      otpInputRefs[5].current?.focus();
    }
  };

  // Handle Final 2FA Verification
  const handleVerify2FA = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setOtpError('กรุณากรอกรหัส OTP ให้ครบ 6 หลัก');
      return;
    }

    if (fullOtp !== generatedOtpCode) {
      setOtpError('รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      return;
    }

    setIsSubmitting(true);
    setOtpError('');

    setTimeout(() => {
      setIsSubmitting(false);
      setShow2FAModal(false);
      setSuccessMessage('เปลี่ยนรหัสผ่านสำเร็จ!');

      // Reset Form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setOtp(['', '', '', '', '', '']);

      setTimeout(() => setSuccessMessage(''), 5000);
    }, 1200);
  };

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
          
          <header className="bg-white px-8 py-3 flex items-center justify-between shrink-0 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
              Account
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 bg-[#e2f9ec] text-[#22c55e] px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span> ONLINE
              </div>

              {/* Notifications Popover */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (showEmails) setShowEmails(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 relative p-1 focus:outline-none"
                >
                  <i className="fa-solid fa-bell text-lg"></i>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      {notificationsList.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 text-xs">
                          <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor} mt-1 shrink-0`}></span>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 leading-snug">
                              {item.level} <span className="font-medium text-gray-500">{item.time}</span>
                            </p>
                            <p className="text-gray-700 font-medium leading-snug">{item.title}</p>
                            {item.detail && (
                              <p className="text-gray-400 italic text-[11px] leading-snug">{item.detail}</p>
                            )}
                            <p className="text-gray-400 text-[11px] mt-0.5">{item.timeAgo}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Email Popover */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowEmails(!showEmails);
                    if (showNotifications) setShowNotifications(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 relative p-1 focus:outline-none"
                >
                  <i className="fa-solid fa-envelope text-lg"></i>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showEmails && (
                  <div className="absolute right-0 mt-3 w-[340px] bg-white rounded-3xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-bold text-gray-900">Email Messages</h3>
                      <a 
                        href="https://mail.google.com" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-1"
                      >
                        Open Gmail <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                      </a>
                    </div>
                    
                    <div className="space-y-3">
                      {emailsList.map((emailItem) => (
                        <div 
                          key={emailItem.id} 
                          className="p-3.5 bg-slate-50/70 hover:bg-slate-100/80 rounded-2xl transition cursor-pointer"
                        >
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-gray-900 text-xs">{emailItem.sender}</h4>
                            <span className="text-[10px] text-gray-400 font-medium">{emailItem.time}</span>
                          </div>
                          <p className="text-xs font-semibold text-gray-800 leading-snug mb-1">{emailItem.subject}</p>
                          <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{emailItem.snippet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/account" className="w-8 h-8 rounded-full overflow-hidden transition hover:opacity-80">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User Profile" className="w-full h-full object-cover" />
              </Link>
            </div>
          </header>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-y-auto">
            
            {/* === LEFT COLUMN: Profile Setting === */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-6">Profile Setting</h2>
                
                <div className="flex gap-6 items-start mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
                      alt="Emma Large" 
                      className="w-full h-full object-cover"
                    />
                  </div>

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

              <Link 
                href="/" 
                className="inline-flex items-center justify-center bg-[#f06445] hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl w-24 shadow-sm transition active:scale-95 no-underline"
              >
                Logout
              </Link>
            </div>

            {/* === RIGHT COLUMN: Preferences & Change Password === */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold text-[#1e293b] mb-5">Preferences</h2>
                
                <div className="space-y-5">
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800">
                        <i className="fa-solid fa-mobile-screen-button text-lg"></i>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1e293b]">SMS Two-Factor Auth (2FA)</h4>
                        <p className="text-xs font-semibold text-[#94a3b8]">Receive OTP code via SMS before password change</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                      className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${twoFactorAuth ? 'bg-[#3b82f6]' : 'bg-gray-200'}`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${twoFactorAuth ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

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

              {/* Change Password */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col justify-between relative">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold text-[#1e293b]">Change Password</h2>
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-100 flex items-center gap-1">
                        <i className="fa-solid fa-mobile-screen-button text-[9px]"></i> SMS 2FA Protected
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition flex items-center gap-1"
                    >
                      <i className={`fa-solid ${showPasswords ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      {showPasswords ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  {successMessage && (
                    <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                      <i className="fa-solid fa-circle-check text-emerald-500"></i>
                      {successMessage}
                    </div>
                  )}

                  {passwordError && (
                    <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                      <i className="fa-solid fa-circle-exclamation text-rose-500"></i>
                      {passwordError}
                    </div>
                  )}

                  <form onSubmit={handleInitiatePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94a3b8] mb-1.5">Current Password</label>
                      <input 
                        type={showPasswords ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        className="w-full bg-[#f4f7fc] border border-[#cbd5e1] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#94a3b8] mb-1.5">New Password</label>
                      <input 
                        type={showPasswords ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Create a strong new password"
                        className="w-full bg-[#f4f7fc] border border-[#cbd5e1] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />

                      {newPassword && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] grid grid-cols-2 gap-1.5 text-gray-500">
                          <div className={`flex items-center gap-1.5 ${passwordCriteria.length ? 'text-emerald-600 font-semibold' : ''}`}>
                            <i className={`fa-solid ${passwordCriteria.length ? 'fa-check' : 'fa-xmark'}`}></i> Min 8 characters
                          </div>
                          <div className={`flex items-center gap-1.5 ${passwordCriteria.uppercase ? 'text-emerald-600 font-semibold' : ''}`}>
                            <i className={`fa-solid ${passwordCriteria.uppercase ? 'fa-check' : 'fa-xmark'}`}></i> Uppercase letter
                          </div>
                          <div className={`flex items-center gap-1.5 ${passwordCriteria.lowercase ? 'text-emerald-600 font-semibold' : ''}`}>
                            <i className={`fa-solid ${passwordCriteria.lowercase ? 'fa-check' : 'fa-xmark'}`}></i> Lowercase letter
                          </div>
                          <div className={`flex items-center gap-1.5 ${passwordCriteria.number ? 'text-emerald-600 font-semibold' : ''}`}>
                            <i className={`fa-solid ${passwordCriteria.number ? 'fa-check' : 'fa-xmark'}`}></i> Number (0-9)
                          </div>
                          <div className={`flex items-center gap-1.5 ${passwordCriteria.special ? 'text-emerald-600 font-semibold' : ''}`}>
                            <i className={`fa-solid ${passwordCriteria.special ? 'fa-check' : 'fa-xmark'}`}></i> Special character
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#94a3b8] mb-1.5">Confirm New Password</label>
                      <input 
                        type={showPasswords ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your new password"
                        className="w-full bg-[#f4f7fc] border border-[#cbd5e1] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-2">
                      <button 
                        type="submit"
                        disabled={isSendingSms}
                        className="bg-[#3b82f6] hover:bg-blue-600 text-white text-xs font-bold px-7 py-2.5 rounded-xl shadow-sm transition active:scale-95 flex items-center gap-2 disabled:opacity-50"
                      >
                        <i className="fa-solid fa-paper-plane"></i> {isSendingSms ? 'Generating OTP...' : 'Send SMS OTP & Verify'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setCurrentPassword('');
                          setNewPassword('');
                          setConfirmPassword('');
                          setPasswordError('');
                        }}
                        className="bg-[#cbd5e1] hover:bg-slate-400 text-slate-600 hover:text-white text-xs font-bold px-8 py-2.5 rounded-xl transition active:scale-95"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* === SMS 2FA VERIFICATION MODAL (พร้อมช่องโชว์ OTP บนจอสำหรับทดสอบ) === */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-150">
            
            <button 
              onClick={() => setShow2FAModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-600 shadow-sm border border-blue-100">
                <i className="fa-solid fa-comment-sms text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">SMS OTP Verification</h3>
              <p className="text-xs text-gray-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
                จำลองการส่งรหัสไปยังเบอร์{' '}
                <span className="font-bold text-gray-800">{phoneNumber || 'เบอร์โทรศัพท์ของคุณ'}</span>
              </p>
            </div>

            {/* กล่องแสดงรหัส OTP จำลองให้ผู้ใช้เห็นทันทีบนหน้าจอ */}
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
              <p className="text-[11px] text-emerald-700 font-semibold mb-1">รหัส OTP สำหรับทดสอบของคุณคือ:</p>
              <span className="text-2xl font-black tracking-widest text-emerald-800 font-mono">
                {generatedOtpCode || '------'}
              </span>
            </div>

            {otpError && (
              <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium text-center">
                {otpError}
              </div>
            )}

            <div className="flex justify-between gap-2 mb-6" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpInputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 bg-slate-50 border-2 border-slate-200 rounded-xl text-center text-xl font-bold text-gray-800 focus:bg-white focus:border-blue-500 focus:outline-none transition"
                />
              ))}
            </div>

            <div className="space-y-3 text-center">
              <button
                type="button"
                onClick={handleVerify2FA}
                disabled={isSubmitting}
                className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-bold text-sm py-3 rounded-xl shadow-sm transition active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Verifying...' : 'Confirm & Update Password'}
              </button>

              <div className="text-xs text-gray-400">
                {timer > 0 ? (
                  <span>ขอรหัสใหม่ได้ใน {timer} วินาที</span>
                ) : (
                  <button 
                    type="button" 
                    onClick={sendSmsOtp} 
                    disabled={isSendingSms}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {isSendingSms ? 'กำลังสร้าง...' : 'สร้างรหัส OTP อีกครั้ง'}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}