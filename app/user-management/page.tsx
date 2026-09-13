'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  department: string;
  role: string;
  status: 'Active' | 'Offline';
}

interface NotificationItem {
  id: string;
  type: 'CRITICAL' | 'INFO' | 'WARNING';
  time: string;
  title: string;
  description: string;
  ago: string;
}

interface EmailItem {
  id: string;
  sender: string;
  time: string;
  subject: string;
  snippet: string;
}

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportStep, setExportStep] = useState<'confirm' | 'success'>('confirm');

  // State สำหรับควบคุมการเปิด-ปิด Notification Dropdown
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // State สำหรับควบคุมการเปิด-ปิด Email Dropdown
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const emailRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'Marketing',
    role: 'Viewer',
    password: '',
    avatar: '',
    status: 'Active' as 'Active' | 'Offline',
  });

  // รายการผู้ใช้งานเริ่มต้น
  const [users, setUsers] = useState<User[]>([
    { id: '1A120', name: 'James Williams', email: 'james.w@company.com', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100', department: 'IT Support', role: 'Administrator', status: 'Active' },
    { id: '1A121', name: 'Emma Sofia', email: 'emma.s@company.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', department: 'IT Support', role: 'Administrator', status: 'Active' },
    { id: '1A122', name: 'Emma Sofia', email: 'emma.s2@company.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', department: 'IT Support', role: 'Editor', status: 'Offline' },
    { id: '1A123', name: 'James Williams', email: 'james.w2@company.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', department: 'Marketing', role: 'Editor', status: 'Offline' },
    { id: '1A124', name: 'James Williams', email: 'james.w3@company.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', department: 'Sales', role: 'Viewer', status: 'Offline' },
    { id: '1A125', name: 'James Williams', email: 'james.w4@company.com', avatar: '', department: 'Sales', role: 'Viewer', status: 'Active' },
    { id: '1A126', name: 'James Williams', email: 'james.w5@company.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', department: 'Marketing', role: 'Viewer', status: 'Offline' },
    { id: '1A127', name: 'James Williams', email: 'james.w6@company.com', avatar: '', department: 'Sales', role: 'Viewer', status: 'Offline' },
    { id: '1A128', name: 'James Williams', email: 'james.w7@company.com', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100', department: 'Sales', role: 'Viewer', status: 'Offline' },
  ]);

  // รายการ Notification ตัวอย่าง
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

  // รายการ Email Messages ตัวอย่าง
  const emailMessages: EmailItem[] = [
    {
      id: '1',
      sender: 'IT Support Team',
      time: '10:30 AM',
      subject: 'Weekly Model Training Status',
      snippet: 'The scheduled model training pipeline has completed with 92.5% accuracy...',
    },
    {
      id: '2',
      sender: 'Alex Rivera',
      time: 'Yesterday',
      subject: 'Data Drift Warning on Batch_01',
      snippet: 'Please check the latest feature distribution for customer segment B...',
    },
    {
      id: '3',
      sender: 'System Administrator',
      time: '2 days ago',
      subject: 'Scheduled Infrastructure Maintenance',
      snippet: 'Servers will undergo maintenance this Sunday from 02:00 UTC to 04:00 UTC...',
    },
  ];

  // ปิด Popups เมื่อคลิกภายนอก
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

  // คำนวณจำนวนผู้ใช้งานที่ออนไลน์อยู่
  const activeSessionsCount = users.filter(user => user.status === 'Active').length;

  // เปิด Modal เพื่อสร้างผู้ใช้งานใหม่
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({
      fullName: '',
      email: '',
      department: 'Marketing',
      role: 'Viewer',
      password: '',
      avatar: '',
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  // เปิด Modal เพื่อแก้ไขผู้ใช้งาน
  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      fullName: user.name,
      email: user.email || '',
      department: user.department,
      role: user.role,
      password: '',
      avatar: user.avatar || '',
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // จัดการการอัปโหลดรูปภาพ
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // บันทึกข้อมูล (ทั้งสร้างใหม่และแก้ไข)
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName) return;

    if (editingUser) {
      // โหมดแก้ไข (Edit)
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { 
              ...u, 
              name: formData.fullName, 
              email: formData.email,
              department: formData.department,
              role: formData.role,
              avatar: formData.avatar,
              status: formData.status
            } 
          : u
      ));
    } else {
      // โหมดสร้างใหม่ (Create)
      const nextIdNum = users.length > 0 ? parseInt(users[users.length - 1].id.slice(2)) + 1 : 120;
      const newUser: User = {
        id: `1A${nextIdNum}`,
        name: formData.fullName,
        email: formData.email,
        avatar: formData.avatar,
        department: formData.department,
        role: formData.role,
        status: formData.status,
      };

      setUsers([...users, newUser]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteUser = (id: string) => {
    Swal.fire({
      title: 'ยืนยันการลบผู้ใช้งาน',
      text: 'คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        popup: 'rounded-2xl',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(user => user.id !== id));
      }
    });
  };

  const handleOpenExportModal = () => {
    setExportStep('confirm');
    setIsExportModalOpen(true);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('User Management Report', 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableColumn = ['User ID', 'Full Name', 'Department', 'Access Role', 'Status'];
    const tableRows = users.map(user => [
      user.id,
      user.name,
      user.department,
      user.role,
      user.status
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });

    doc.save('user_list.pdf');

    setExportStep('success');
    setTimeout(() => {
      setIsExportModalOpen(false);
      setExportStep('confirm');
    }, 1800);
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="flex h-screen overflow-hidden bg-[#f0f4f9] text-gray-800 relative">
        
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

              {/* NOTIFICATION BUTTON & DROPDOWN */}
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

                {/* Notifications Popup Box */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <h3 className="text-base font-extrabold text-gray-900 mb-4">Notifications</h3>

                    <div className="space-y-4">
                      {notifications.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 text-xs">
                          {/* Dot Badge Colors */}
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

              {/* EMAIL BUTTON & DROPDOWN */}
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

                {/* Email Messages Popup Box */}
                {isEmailOpen && (
                  <div className="absolute right-0 mt-3 w-[360px] bg-white rounded-3xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-extrabold text-[#0f172a]">Email Messages</h3>
                      <a 
                        href="https://mail.google.com" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Open Gmail <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                      </a>
                    </div>

                    <div className="space-y-3">
                      {emailMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className="p-3 rounded-2xl bg-white hover:bg-gray-50 border border-gray-100 transition duration-150 cursor-pointer shadow-xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-extrabold text-gray-900">{msg.sender}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{msg.time}</span>
                          </div>
                          <p className="text-xs font-bold text-gray-800 leading-snug mb-1">{msg.subject}</p>
                          <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{msg.snippet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/account" className="transition hover:opacity-85">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User Profile" className="w-8 h-8 rounded-full object-cover" />
              </Link>
            </div>
          </header>

          <div className="p-8 space-y-6 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleOpenAddModal}
                  className="bg-[#3b82f6] hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i> Add New User
                </button>
                <button 
                  onClick={handleOpenExportModal}
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-file-export text-gray-400"></i> Export Users
                </button>
              </div>
            </div>

            {/* TOP STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Active Session</p>
                  <p className="text-2xl font-bold text-gray-900">{activeSessionsCount}</p>
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
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-6 font-mono text-gray-900">{user.id}</td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-3">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
                                <i className="fa-solid fa-user text-xs"></i>
                              </div>
                            )}
                            <span className="text-gray-900 font-semibold">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-gray-600">{user.department}</td>
                        <td className="py-3.5 px-6 text-gray-600">{user.role}</td>
                        <td className="py-3.5 px-6">
                          {user.status === 'Active' ? (
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold bg-[#dcfce7] text-[#15803d]">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold bg-[#e5e7eb] text-[#4b5563]">
                              Offline
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center justify-center gap-2">
                            {/* ปุ่มแก้ไขข้อมูล */}
                            <button 
                              onClick={() => handleOpenEditModal(user)}
                              className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition flex items-center justify-center cursor-pointer"
                              title="Edit User"
                            >
                              <i className="fa-solid fa-pen-to-square text-xs"></i>
                            </button>
                            {/* ปุ่มลบผู้ใช้งาน */}
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition flex items-center justify-center cursor-pointer"
                              title="Delete User"
                            >
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

        {/* === ADD / EDIT USER MODAL POPUP === */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center transition cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>

              <h2 className="text-center text-lg font-bold text-gray-900 mb-4">
                {editingUser ? 'Edit Profile' : 'Add Profile'}
              </h2>

              {/* ส่วนแสดงและเลือกรูปภาพโปรไฟล์ */}
              <div className="flex flex-col items-center mb-5">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-blue-100 shadow-inner overflow-hidden">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <i className="fa-solid fa-user text-4xl text-gray-300"></i>
                    )}
                  </div>
                  
                  {/* ปุ่มกล้องสำหรับคลิกอัปโหลดรูปภาพ */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md transition cursor-pointer"
                    title="Upload Photo"
                  >
                    <i className="fa-solid fa-camera text-xs"></i>
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 text-[11px] font-semibold text-blue-500 hover:underline cursor-pointer"
                >
                  {formData.avatar ? 'Change Photo' : 'Upload Photo'}
                </button>
              </div>

              <form onSubmit={handleSaveUser} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="กรอกชื่อ-นามสกุล"
                    className="w-full bg-[#edf4ff] border border-blue-200 text-gray-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="กรอกอีเมลบริษัท"
                    className="w-full bg-[#edf4ff] border border-blue-200 text-gray-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Department
                    </label>
                    <div className="relative">
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-300 text-gray-800 rounded-xl px-3 py-2 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition cursor-pointer"
                      >
                        <option value="Marketing">Marketing</option>
                        <option value="IT Support">IT Support</option>
                        <option value="Sales">Sales</option>
                        <option value="BD">BD</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] pointer-events-none"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-[#edf4ff] border border-blue-200 text-gray-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      >
                        <option value="Active">Active</option>
                        <option value="Offline">Offline</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">
                    {editingUser ? 'New Password (Optional)' : 'Temporary Password'}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={editingUser ? 'เว้นว่างไว้หากไม่ต้องการเปลี่ยน' : 'ตั้งรหัสผ่านชั่วคราว'}
                    className="w-full bg-[#edf4ff] border border-blue-200 text-gray-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-xs transition shadow-md cursor-pointer"
                  >
                    {editingUser ? 'Save Changes' : 'Create User'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* === EXPORT PDF MODAL === */}
        {isExportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              
              <button 
                onClick={() => setIsExportModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center transition cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>

              {exportStep === 'confirm' && (
                <div className="flex flex-col items-center py-4">
                  <div className="flex items-center gap-3 text-gray-400 text-xl font-medium mb-8">
                    <i className="fa-regular fa-id-card text-2xl"></i>
                    <span>: Export PDF</span>
                  </div>

                  <div className="flex gap-3 w-full justify-center">
                    <button
                      onClick={handleDownloadPdf}
                      className="bg-[#3b82f6] hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg text-xs transition cursor-pointer shadow-sm"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => setIsExportModalOpen(false)}
                      className="bg-white hover:bg-gray-50 text-gray-500 border border-gray-200 font-medium px-6 py-2 rounded-lg text-xs transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {exportStep === 'success' && (
                <div className="flex flex-col items-center py-6 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-xl bg-gray-200/60 flex items-center justify-center mb-3 text-[#22c55e]">
                    <i className="fa-solid fa-check text-2xl"></i>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Successfully</p>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </>
  );
}