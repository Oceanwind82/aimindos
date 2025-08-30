import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    'Missing required Sanity environment variables. Please set SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_API_TOKEN in your .env.local file.'
  );
}

const sanity = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-08-01',
  useCdn: false,
  perspective: 'published',
});

export async function GET() {
  try {
    // simple sample query: fetch first doc with metadata
    const sample = await sanity.fetch(`*[_type defined][0]{_id, _type, _updatedAt}`);

    return NextResponse.json({
      ok: true,
      sample,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
