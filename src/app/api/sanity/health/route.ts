import { NextResponse } from 'next/server';

export async function GET() {
  const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN } = process.env;

  const status = {
    ok: Boolean(SANITY_PROJECT_ID && SANITY_DATASET && SANITY_API_TOKEN),
    sanity: {
      projectIdSet: Boolean(SANITY_PROJECT_ID),
      datasetSet: Boolean(SANITY_DATASET),
      apiTokenSet: Boolean(SANITY_API_TOKEN),
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(status, { status: status.ok ? 200 : 500 });
}
