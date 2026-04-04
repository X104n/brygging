-- Extend profiles table with fun fields
alter table profiles
  add column if not exists avatar_url text,
  add column if not exists bio text,
  add column if not exists hjemmebryggeri text,
  add column if not exists brygg_siden smallint,
  add column if not exists sted text,
  add column if not exists favoritt_ol_stil text,
  add column if not exists favoritt_humle text,
  add column if not exists favoritt_gjaer text;

-- Avatar storage bucket (public read)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage RLS
create policy "Public avatar read"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (string_to_array(name, '/'))[1]
  );

create policy "Users can update own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (string_to_array(name, '/'))[1]
  );
