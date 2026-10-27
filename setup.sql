-- California Board Supabase setup
-- Replace all email placeholders before executing.
create table if not exists public.invited_emails (email text primary key);
insert into public.invited_emails(email) values
 ('ece@example.com'), ('albert@example.com'), ('kaan@example.com'), ('isil@example.com')
on conflict do nothing;
create table if not exists public.places (
 id text primary key, name text not null, city text not null, category text not null,
 lat double precision, lng double precision, image text not null default '',
 fallback text not null default '', status text not null default 'want',
 day text not null default '', notes text not null default '',
 added_by text not null default '', updated_by text not null default '',
 sort integer not null default 0, updated_at timestamptz not null default now()
);
create or replace function public.is_invited() returns boolean language sql stable security definer set search_path=public as $$
 select exists (select 1 from public.invited_emails where lower(email)=lower(coalesce(auth.jwt()->>'email','')));
$$;
revoke all on public.invited_emails from anon, authenticated;
revoke all on public.places from anon;
grant select, insert, update, delete on public.places to authenticated;
grant execute on function public.is_invited() to authenticated;
alter table public.invited_emails enable row level security;
alter table public.places enable row level security;
drop policy if exists "invited read" on public.places;
drop policy if exists "invited insert" on public.places;
drop policy if exists "invited update" on public.places;
drop policy if exists "invited delete" on public.places;
create policy "invited read" on public.places for select to authenticated using (public.is_invited());
create policy "invited insert" on public.places for insert to authenticated with check (public.is_invited());
create policy "invited update" on public.places for update to authenticated using (public.is_invited()) with check (public.is_invited());
create policy "invited delete" on public.places for delete to authenticated using (public.is_invited());
do $$ begin
 alter publication supabase_realtime add table public.places;
 exception when duplicate_object then null;
end $$;
