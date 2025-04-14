
-- Create homepage content table
create table if not exists public.homepage_content (
  id text primary key,
  title text not null,
  subtitle text,
  learn_more_url text,
  listen_now_url text,
  image_url text,
  section_type text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Add RLS policies
alter table public.homepage_content enable row level security;

-- Allow anyone to read
create policy "Anyone can read homepage content"
  on public.homepage_content
  for select
  to public
  using (true);

-- Only authenticated users can edit
create policy "Only authenticated users can modify homepage content"
  on public.homepage_content
  for all
  to authenticated
  using (true)
  with check (true);

-- Add initial hero content
insert into public.homepage_content (id, title, subtitle, learn_more_url, listen_now_url, image_url, section_type)
values (
  'hero',
  'Empowering Women Through Stories',
  'Join our community where women''s voices are amplified through podcasts, documentaries, and inspiring content.',
  '/about',
  '/podcasts',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
  'hero'
) on conflict (id) do nothing;
