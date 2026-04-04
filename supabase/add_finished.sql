alter table bryggeskjema
  add column if not exists finished boolean not null default false;
