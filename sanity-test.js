const fetch = require('node-fetch');

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
const API_VERSION = 'v2025-08-01';

const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${SANITY_DATASET}?query=*[_type%20defined][0]{_id,%20_type,%20_updatedAt}`;

fetch(url, {
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log('Sanity API response:', data);
  })
  .catch((err) => {
    console.error('Sanity API error:', err);
    process.exit(1);
  });
