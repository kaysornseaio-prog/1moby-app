import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, otp } = body;

    // สำหรับโหมดทดสอบ: ส่งรหัส OTP กลับไปที่ Frontend โดยตรงเพื่อให้ผู้ใช้มองเห็นและนำไปกรอกได้ทันที
    return NextResponse.json({
      success: true,
      otpCode: otp, 
      message: 'สร้างรหัส OTP สำเร็จ',
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสร้างรหัส OTP' },
      { status: 500 }
    );
  }
}