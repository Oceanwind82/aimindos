import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-08-01",
  useCdn: false,
  perspective: "published",
});

export async function GET() {
  try {
    // simple sample query: fetch first doc with metadata
    const sample = await sanity.fetch(
      `*[_type defined][0]{_id, _type, _updatedAt}`
    );

    return NextResponse.json({
      ok: true,
      sample: sample ?? null,
      timestamp: new Date().toISOString(),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

