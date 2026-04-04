-- Run this in the Supabase SQL editor to set up the database

create table if not exists bryggeskjema (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Metadata
  batch_navn text,
  batch_nr text,
  bryggedato date,
  tappedato date,

  -- Gravity & metrics
  forv_og numeric,
  forv_fg numeric,
  malt_og numeric,
  malt_fg numeric,
  abv numeric,
  effektivitet numeric,

  -- Section 2: Meskeprosess
  meskevann_liter numeric,
  skyllevann_liter numeric,
  mesketemp numeric,
  mesketid text,

  -- Section 3: Koking
  koketid text,
  antall_liter_til_kok numeric,
  tidspunkt_start text,

  -- Section 5: Gjæring
  gjaeringstemp numeric,
  antall_liter_gjaering numeric,

  -- Checklists – Section 1: Forberedelser
  sjekk_vannmengde boolean default false,
  sjekk_bryggeutstyr boolean default false,
  sjekk_ingredienser boolean default false,
  sjekk_gjaeringskar boolean default false,
  sjekk_meskevann_klargjort boolean default false,

  -- Checklists – Section 2: Meskeprosess
  sjekk_meskevann_temp boolean default false,
  sjekk_tilsatt_malt boolean default false,
  sjekk_rort_i_mesken boolean default false,
  sjekk_skyllevann_klargjort boolean default false,
  sjekk_mesking_ferdig boolean default false,

  -- Checklists – Section 3: Koking
  sjekk_humle boolean default false,
  sjekk_gjaernaring boolean default false,
  sjekk_spiralkjoler boolean default false,

  -- Checklists – Section 4: Nedkjøling
  sjekk_vorter_kjolt boolean default false,
  sjekk_malt_og boolean default false,

  -- Checklists – Section 5: Gjæring
  sjekk_oksygenert boolean default false,
  sjekk_tilsatt_gjaer boolean default false,
  sjekk_torrhumle boolean default false,

  -- Notes
  bryggenotater text,
  smaksnotater text,
  karakter smallint check (karakter between 1 and 10)
);

-- Enable Row Level Security
alter table bryggeskjema enable row level security;

-- Each user can only see and modify their own schemas
create policy "Users can view own schemas"
  on bryggeskjema for select
  using (auth.uid() = user_id);

create policy "Users can insert own schemas"
  on bryggeskjema for insert
  with check (auth.uid() = user_id);

create policy "Users can update own schemas"
  on bryggeskjema for update
  using (auth.uid() = user_id);

create policy "Users can delete own schemas"
  on bryggeskjema for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at on change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger bryggeskjema_updated_at
  before update on bryggeskjema
  for each row execute function update_updated_at();
