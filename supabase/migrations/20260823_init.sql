create extension if not exists "pgcrypto";

create table if not exists public.repair_estimates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  vehicle_type text,
  brand text,
  model text,
  year integer,
  plate text,
  vin text,
  service_type text not null,
  description text,
  photo_paths text[] default '{}',
  ip text,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  brand text,
  model text,
  year integer,
  vehicle_type text,
  service text not null,
  preferred_date date,
  preferred_time text,
  comment text,
  ip text,
  created_at timestamptz not null default now()
);

create table if not exists public.fleet_requests (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact_name text not null,
  phone text not null,
  email text,
  vehicle_count text,
  vehicle_types text,
  services text[] default '{}',
  comment text,
  ip text,
  created_at timestamptz not null default now()
);

alter table public.repair_estimates enable row level security;
alter table public.bookings enable row level security;
alter table public.fleet_requests enable row level security;

insert into storage.buckets (id, name, public)
values ('repair-photos', 'repair-photos', false)
on conflict (id) do nothing;
