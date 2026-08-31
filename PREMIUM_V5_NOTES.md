# OTMA Premium Mover V5

This pass is a full visual-system reset, not a cosmetic refinement of V4.

## Design direction

- Removed the oversized editorial serif treatment.
- One restrained sans-serif family across the customer experience.
- Full-bleed, real OTMA photography carries the site.
- Tighter type scale, fewer decorative labels and fewer UI-like objects.
- No generic card grids, rounded SaaS panels, glassmorphism or fake metrics.
- OTMA blue is used as a brand accent rather than flooding the interface.
- The services experience is typographic and operational rather than card based.
- The quote experience is integrated as part of the moving service, not presented as a detached software widget.
- Secondary pages use the same photographic, premium mover language.

## Functionality preserved

The existing detailed move brief / quote flow remains intact, including route, address search, move type, room-by-room inventory, bulky item options, packaging and packing support, storage, access constraints, truck restrictions, preferred date/time, customer details, WhatsApp/email handoff, consent, optional photos, Supabase persistence and reference generation.

## QA

All active TypeScript/TSX source files pass a syntax transpilation check. A full Next.js production build could not be completed in this sandbox because the local npm install did not finish cleanly; run `npm install`, `npm run typecheck` and `npm run build` in the deployment environment.
