create table if not exists public.site_settings (
  id text primary key default 'default',
  phones jsonb not null default '[]'::jsonb,
  email text,
  address text,
  working_hours jsonb,
  messengers jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  category text not null,
  damage text not null default '',
  works text[] not null default '{}',
  before_url text,
  process_url text,
  after_url text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text text not null,
  rating integer not null default 5,
  source text not null default '',
  date date not null default current_date,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.works enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "Public read site_settings" on public.site_settings;
create policy "Public read site_settings"
  on public.site_settings
  for select
  using (true);

drop policy if exists "Authenticated write site_settings" on public.site_settings;
create policy "Authenticated write site_settings"
  on public.site_settings
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Public read published works" on public.works;
create policy "Public read published works"
  on public.works
  for select
  using (published = true);

drop policy if exists "Authenticated read all works" on public.works;
create policy "Authenticated read all works"
  on public.works
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated write works" on public.works;
create policy "Authenticated write works"
  on public.works
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Public read published reviews" on public.reviews;
create policy "Public read published reviews"
  on public.reviews
  for select
  using (published = true);

drop policy if exists "Authenticated read all reviews" on public.reviews;
create policy "Authenticated read all reviews"
  on public.reviews
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated write reviews" on public.reviews;
create policy "Authenticated write reviews"
  on public.reviews
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated read bookings" on public.bookings;
create policy "Authenticated read bookings"
  on public.bookings
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated read repair_estimates" on public.repair_estimates;
create policy "Authenticated read repair_estimates"
  on public.repair_estimates
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated read fleet_requests" on public.fleet_requests;
create policy "Authenticated read fleet_requests"
  on public.fleet_requests
  for select
  to authenticated
  using (true);

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists "Public read site-media" on storage.objects;
create policy "Public read site-media"
  on storage.objects
  for select
  using (bucket_id = 'site-media');

drop policy if exists "Authenticated insert site-media" on storage.objects;
create policy "Authenticated insert site-media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site-media');

drop policy if exists "Authenticated update site-media" on storage.objects;
create policy "Authenticated update site-media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site-media')
  with check (bucket_id = 'site-media');

drop policy if exists "Authenticated delete site-media" on storage.objects;
create policy "Authenticated delete site-media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site-media');

insert into public.site_settings (id, phones, email, address, working_hours, messengers)
values (
  'default',
  '[
    {"raw":"+375256669313","display":"+375 25 666 93 13","label":"Основной"},
    {"raw":"+375445189432","display":"+375 44 518 94 32","label":"Дополнительный"}
  ]'::jsonb,
  '',
  'ул. Солтыса, 10В',
  '{"display":"9:00–18:00","closed":"Воскресенье — выходной","schema":["Mo-Sa 09:00-18:00"]}'::jsonb,
  '[
    {"id":"telegram","name":"Telegram","handle":"","icon":"mdi-telegram","enabled":false,"prefillMessage":"Здравствуйте! Хочу записаться в Teorema Service."},
    {"id":"viber","name":"Viber","handle":"","icon":"mdi-chat","enabled":false,"prefillMessage":"Здравствуйте! Хочу записаться в Teorema Service."}
  ]'::jsonb
)
on conflict (id) do nothing;
