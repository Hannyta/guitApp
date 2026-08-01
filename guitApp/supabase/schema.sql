-- Ejecutar en el SQL Editor del proyecto de Supabase.

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  type text not null check (type in ('income', 'expense')),
  color text not null default '#6b7280',
  icon text not null default 'other',
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  currency text not null default 'USD',
  color text not null default '#2a78d6',
  icon text not null default 'bank',
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete restrict,
  account_id uuid not null references public.accounts (id) on delete restrict,
  type text not null check (type in ('income', 'expense')),
  amount numeric(12, 2) not null check (amount > 0),
  description text,
  occurred_on date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  year int not null,
  month int not null check (month between 1 and 12),
  amount numeric(12, 2) not null check (amount > 0),
  created_at timestamptz not null default now(),
  unique (user_id, category_id, year, month)
);

create index if not exists transactions_user_date_idx on public.transactions (user_id, occurred_on);
create index if not exists budgets_user_period_idx on public.budgets (user_id, year, month);

alter table public.categories enable row level security;
alter table public.accounts enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;

create policy "categories_owner" on public.categories
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "accounts_owner" on public.accounts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "transactions_owner" on public.transactions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "budgets_owner" on public.budgets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
