import { createClient } from '@sanity/client';

const config = {
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2025-08-01',
  useCdn: true,
  perspective: 'published' as const,
};
if (process.env.SANITY_API_TOKEN) {
  (config as any).token = process.env.SANITY_API_TOKEN;
}

export const sanity = createClient(config);
