import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const required = ["SANITY_PROJECT_ID", "SANITY_DATASET", "SANITY_API_TOKEN"] as const;

export async function GET() {
  for (const key of required) {
    if (!process.env[key]) {
      return NextResponse.json({ ok: false, error: `Missing ${key}` }, { status: 500 });
    }
  }

  const sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: "2025-08-01",
    useCdn: false,
    perspective: "published",
  });

  try {
    const sample = await sanity.fetch('*[_type == "post"][0]{_id, _type}');
    return NextResponse.json({ ok: true, sample });
  } catch (e: unknown) {
    console.error("Sanity health check error:", e);
    const msg = e instanceof Error ? e.message : "Unknown Sanity error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
