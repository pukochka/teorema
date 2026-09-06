alter table public.site_settings
  add column if not exists name text,
  add column if not exists city text,
  add column if not exists city_prepositional text,
  add column if not exists street text,
  add column if not exists lat double precision,
  add column if not exists lng double precision,
  add column if not exists maps_url text,
  add column if not exists socials jsonb not null default '[]'::jsonb,
  add column if not exists logo text,
  add column if not exists og_image text,
  add column if not exists title_template text,
  add column if not exists title_template_no_city text,
  add column if not exists yandex_verification text,
  add column if not exists google_verification text,
  add column if not exists yandex_metrika_id text,
  add column if not exists ga_measurement_id text;

update public.site_settings
set
  name = coalesce(name, 'Teorema Service'),
  city = coalesce(city, 'Минск'),
  city_prepositional = coalesce(city_prepositional, 'Минске'),
  street = coalesce(street, 'ул. Солтыса, 108'),
  address = coalesce(address, 'г. Минск, ул. Солтыса, 108')
where id = 'default';

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.site_admins enable row level security;

drop policy if exists "Admins read themselves" on public.site_admins;
create policy "Admins read themselves"
  on public.site_admins
  for select
  to authenticated
  using (user_id = auth.uid());

create table if not exists public.pages (
  id text primary key,
  type text not null check (type in ('home', 'service', 'static')),
  name text not null,
  slug text not null default '',
  path text not null unique,
  seo_title text not null default '',
  seo_description text not null default '',
  h1 text not null default '',
  subtitle text not null default '',
  intro text not null default '',
  blocks jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  image text,
  image_alt text,
  og_title text,
  og_description text,
  og_image text,
  status text not null default 'published' check (status in ('draft', 'published')),
  robots_index boolean not null default true,
  canonical text,
  updated_at timestamptz not null default now(),
  service_id text,
  icon text,
  cta text,
  estimate_preferred boolean not null default false,
  related_ids text[] not null default '{}',
  card_title text,
  card_description text,
  show_on_home boolean not null default false
);

create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null unique,
  to_path text not null,
  created_at timestamptz not null default now()
);

alter table public.pages enable row level security;
alter table public.redirects enable row level security;

drop policy if exists "Public read published pages" on public.pages;
create policy "Public read published pages"
  on public.pages
  for select
  using (status = 'published');

drop policy if exists "Admins read all pages" on public.pages;
create policy "Admins read all pages"
  on public.pages
  for select
  to authenticated
  using (exists (select 1 from public.site_admins where user_id = auth.uid()));

drop policy if exists "Admins write pages" on public.pages;
create policy "Admins write pages"
  on public.pages
  for all
  to authenticated
  using (exists (select 1 from public.site_admins where user_id = auth.uid()))
  with check (exists (select 1 from public.site_admins where user_id = auth.uid()));

drop policy if exists "Public read redirects" on public.redirects;
create policy "Public read redirects"
  on public.redirects
  for select
  using (true);

drop policy if exists "Admins write redirects" on public.redirects;
create policy "Admins write redirects"
  on public.redirects
  for all
  to authenticated
  using (exists (select 1 from public.site_admins where user_id = auth.uid()))
  with check (exists (select 1 from public.site_admins where user_id = auth.uid()));

drop policy if exists "Authenticated write site_settings" on public.site_settings;
create policy "Authenticated write site_settings"
  on public.site_settings
  for all
  to authenticated
  using (exists (select 1 from public.site_admins where user_id = auth.uid()))
  with check (exists (select 1 from public.site_admins where user_id = auth.uid()));

drop policy if exists "Authenticated write works" on public.works;
create policy "Authenticated write works"
  on public.works
  for all
  to authenticated
  using (exists (select 1 from public.site_admins where user_id = auth.uid()))
  with check (exists (select 1 from public.site_admins where user_id = auth.uid()));

drop policy if exists "Authenticated write reviews" on public.reviews;
create policy "Authenticated write reviews"
  on public.reviews
  for all
  to authenticated
  using (exists (select 1 from public.site_admins where user_id = auth.uid()))
  with check (exists (select 1 from public.site_admins where user_id = auth.uid()));

create or replace view public.page_visibility as
select id, status, path
from public.pages;

alter view public.page_visibility set (security_invoker = false);

grant select on public.page_visibility to anon, authenticated;

insert into public.redirects (from_path, to_path)
values
  ('/repair', '/uslugi/remont-avtomobiley'),
  ('/auto-service', '/uslugi/remont-avtomobiley'),
  ('/frame-repair', '/uslugi/kuzovnoy-remont'),
  ('/body-repair', '/uslugi/kuzovnoy-remont'),
  ('/painting', '/uslugi/pokraska-avtomobilya'),
  ('/polishing', '/uslugi/polirovka-kuzova'),
  ('/commercial-vehicles', '/'),
  ('/fleet', '/'),
  ('/equipment', '/')
on conflict (from_path) do nothing;
