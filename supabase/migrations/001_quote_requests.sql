-- Quote requests captured from the public quote wizard (Hero + /contact).
-- Run this in the Supabase SQL editor, or via the Supabase CLI:
--   supabase db push

create extension if not exists "pgcrypto";

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,

  -- Step 1: move details
  from_address text not null,
  to_address text not null,
  move_date date,
  move_type text not null,

  -- Step 2: scope
  home_size text not null,
  services text[] not null default '{}',
  access text,
  notes text,

  -- Step 3: contact
  name text not null,
  phone text not null,
  email text,

  -- Pipeline state for internal quote operations
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'booked', 'lost')),

  created_at timestamptz not null default now()
);

create index if not exists quote_requests_created_at_idx on quote_requests (created_at desc);
create index if not exists quote_requests_status_idx on quote_requests (status);

alter table quote_requests enable row level security;

-- No public read/write policies are defined: all access goes through the
-- server-side route using the service role key, which bypasses RLS.
-- Add an authenticated "select" policy here once an internal operations view is wired to
-- read live data for an internal operations view.
