import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});
