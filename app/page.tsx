'use client';

import Link from 'next/link';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ 
  subsets: ['latin'],
  weight: ['700'] 
});

export default function Home() {
  return (
    <main 
      className="min-h-screen w-screen flex items-center justify-center p-4 select-none overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0055ff 0%, #0044cc 40%, #d45500 85%, #ffaa00 100%)',
        margin: 0
      }}
    >
      <div className="text-center">
        {/* ใช้ Link Component ของ Next.js บังคับเปลี่ยน Route */}
        <Link 
          href="/login" 
          className="inline-block transition-transform hover:scale-105 active:scale-95 cursor-pointer no-underline"
        >
          <h1 className={`${orbitron.className} text-7xl md:text-8xl text-white font-bold tracking-wider drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]`}>
            1moby
          </h1>
        </Link>
      </div>
    </main>
  );
}