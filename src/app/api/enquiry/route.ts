import { NextResponse } from 'next/server';

interface EnquiryBody {
  name?: string; business?: string; city?: string; phone?: string;
  type?: string; message?: string; products?: string[];
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as EnquiryBody | null;
  if (!b?.name || !b.business || !b.city || !b.phone) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }
  // TODO: persist (Prisma/PostgreSQL) and notify sales (email / WhatsApp).
  console.log('New enquiry:', b);
  return NextResponse.json({ ok: true });
}
