import { NextResponse } from 'next/server';
import { sanity } from '@/lib/sanity';
import { LESSON_LIST_GROQ } from '@/lib/queries';

export const revalidate = 0; // no cache at the edge, always fresh here

export async function GET() {
  const lessons = await sanity.fetch(LESSON_LIST_GROQ);
  return NextResponse.json({ lessons });
}
