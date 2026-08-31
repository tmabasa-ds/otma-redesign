# On The Move Again — Website Redesign

A production-ready Next.js redesign for On The Move Again (OTMA), built from a proven logistics-site foundation but re-art-directed around OTMA's own fleet, moving services and practical customer experience.

## Experience

- Distinct OTMA cobalt / navy / white identity
- Real OTMA fleet and moving imagery
- Home, office/commercial and national-removals positioning
- Wrapping, boxes/crate rental and storage-support service content
- Structured move-brief quotation flow with address lookup, room-by-room inventory, access notes, packing/storage requirements and photo upload
- WhatsApp/email handoff after quote submission
- Mobile-first navigation and quote access

## Routes

- `/`
- `/services`
- `/about`
- `/long-distance`
- `/storage`
- `/contact`
- `/quote`

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run typecheck
npm run build
```

The public-facing content avoids unverified awards, years-in-business claims, insurance claims, customer counts, tracking promises and fabricated client logos. Configure Supabase and optional email settings using `.env.example` before enabling production quote persistence/notifications.
