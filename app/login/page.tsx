'use client';

import { Orbitron, Inter } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function LoginPage() {
  return (
    <main 
      className={`min-h-screen w-screen flex items-center justify-center p-6 ${inter.className}`} 
      style={{
        background: 'linear-gradient(135deg, #0055ff 0%, #0044cc 40%, #d45500 85%, #ffaa00 100%)'
      }}
    >
      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[520px]">
        
        {/* ฝั่งซ้าย: ฟอร์ม Sign in */}
        <div className="w-full md:w-1/2 bg-white p-10 md:p-14 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-[#0066ff] font-bold text-4xl text-center mb-8 tracking-wide">
              Sign in
            </h2>

            {/* ใช้ HTML Form Action บังคับย้ายหน้าไปที่ /system-overview ทันที */}
            <form action="/system-overview" method="GET" className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#0066ff] mb-2 pl-1 uppercase tracking-wider">Email</label>
                <div className="relative flex items-center">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your Email" 
                    defaultValue="admin@1moby.com"
                    className="w-full pl-5 pr-12 py-3 bg-[#FFFDE7] text-[#1B2559] placeholder-gray-400 font-medium rounded-full text-sm border border-yellow-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0066ff]/50 transition-all"
                    required 
                  />
                  <span className="absolute right-5 text-purple-300 text-sm select-none">✉️</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0066ff] mb-2 pl-1 uppercase tracking-wider">Password</label>
                <div className="relative flex items-center">
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Enter your Password" 
                    defaultValue="123456"
                    className="w-full pl-5 pr-12 py-3 bg-[#FFFDE7] text-[#1B2559] placeholder-gray-400 font-medium rounded-full text-sm border border-yellow-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0066ff]/50 transition-all"
                    required 
                  />
                  <span className="absolute right-5 text-amber-500 text-sm select-none">🔒</span>
                </div>
              </div>

              {/* ปุ่ม Login ใช้ HTML submit ย้ายหน้าตรงๆ */}
              <div className="pt-4 text-center">
                <button 
                  type="submit" 
                  className="px-12 py-2.5 bg-white text-[#0066ff] hover:bg-[#0066ff] hover:text-white font-bold text-sm rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.08)] border border-gray-100 hover:border-[#0066ff] transition-all active:scale-95 cursor-pointer inline-block"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ฝั่งขวา: Banner 1MOBY (ถ้ากดตัวนี้จะพาถอยกลับหน้าแรก) */}
        <a 
          href="/"
          className="w-full md:w-1/2 bg-[#0066ff] p-10 flex flex-col items-center justify-center text-white cursor-pointer group relative no-underline block"
          style={{
            background: 'linear-gradient(135deg, #0066ff 0%, #0044cc 100%)'
          }}
          title="คลิกเพื่อย้อนกลับไปหน้าแรกสุด"
        >
          <div className="text-center select-none transform group-hover:scale-105 transition-transform">
            <h1 className={`${orbitron.className} text-5xl md:text-6xl font-extrabold tracking-widest italic`}>
              1MOBY
            </h1>
            <p className="text-white/30 text-[10px] uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              ➔ Back to Home
            </p>
          </div>
        </a>

      </div>
    </main>
  );
}