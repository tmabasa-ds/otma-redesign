-- Quote-request consent and private photo storage for submitted move briefs.
-- The public wizard submits through the server route, which uses the
-- service-role key. No public table or storage policies are intentional.

alter table public.quote_requests
  alter column home_size drop not null;

alter table public.quote_requests
  add column if not exists consent_version text,
  add column if not exists consent_accepted boolean not null default false,
  add column if not exists consent_name text,
  add column if not exists consent_accepted_at timestamptz;

create index if not exists quote_requests_consent_accepted_at_idx
  on public.quote_requests (consent_accepted_at desc);

create table if not exists public.quote_request_photos (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  reference text not null,
  storage_path text not null unique,
  original_name text not null,
  content_type text not null,
  byte_size bigint not null,
  created_at timestamptz not null default now()
);

create index if not exists quote_request_photos_request_id_idx
  on public.quote_request_photos (quote_request_id);

alter table public.quote_request_photos enable row level security;

insert into storage.buckets (id, name, public)
values ('quote-photos', 'quote-photos', false)
on conflict (id) do update set public = false;

-- There are deliberately no anon/authenticated policies. The server route
-- writes metadata and uploads files using the server-only service role key.
