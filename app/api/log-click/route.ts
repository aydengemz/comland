import { NextRequest, NextResponse } from 'next/server';
import MobileDetect from 'mobile-detect';

export async function POST(req: NextRequest) {
  // 1. Get UA and IP
  const ua = req.headers.get('user-agent') || '';
  // x-forwarded-for may contain a comma list; take first
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0] || 'unknown';

  // 2. Run MobileDetect
  const md = new MobileDetect(ua);
  const isMobile = !!md.mobile();        // e.g. "iPhone" or "Android"
  const isPhone  = !!md.phone();         // e.g. "iPhone"
  const isTikTok = /TikTok/i.test(ua);   // TikTok UA sniff

  // 3. Decide
  const isLikelyRealDevice = isMobile && (isPhone) && isTikTok;

  // 4. Optional: log
  console.log({
    ip,
    ua,
    isMobile,
    isPhone,
    isTikTok,
    isLikelyRealDevice,
  });

  return NextResponse.json({ isLikelyRealDevice });
}
