-- Add published flag to schemas
alter table bryggeskjema
  add column if not exists published boolean not null default false;

-- Allow all authenticated users to read published schemas
create policy "Authenticated users can view published schemas"
  on bryggeskjema for select
  using (published = true);

-- Profiles table so we can show display names on published schemas
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text
);

alter table profiles enable row level security;

create policy "Anyone can read profiles"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
