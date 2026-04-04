# Indexing API Status

## Configuration
- **Service Account:** `salestools-indexing@findsday-discover.iam.gserviceaccount.com`
- **Key File:** `indexing-key.json` (Local and in `../findsday-airtable/`)
- **Quota:** 200 URLs per day (resets midnight PT)

## Submission Log
- **2026-03-24:** 160 URLs submitted (via `../findsday-airtable/`)
- **2026-03-25:** 123 URLs submitted (Complete for `productphoto.pro`)

## Commands
- **Submit all:** `node scripts/submit-indexing.mjs --all`
- **Force re-submit:** `node scripts/submit-indexing.mjs --all --force`
- **Single URL:** `node scripts/submit-indexing.mjs --url <url>`
