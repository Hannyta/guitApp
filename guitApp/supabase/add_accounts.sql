-- Ejecutar UNA VEZ en el SQL Editor para agregar cuentas/billeteras a un
-- proyecto que ya tenía movimientos cargados sin este concepto.

-- 1) Tabla de cuentas
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

alter table public.accounts enable row level security;

create policy "accounts_owner" on public.accounts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2) Columna account_id en transacciones (todavía sin "not null", para
--    poder rellenarla en los movimientos que ya existen).
alter table public.transactions
  add column if not exists account_id uuid references public.accounts (id) on delete restrict;

-- 3) Crear una "Cuenta principal" para cada usuario que tenga movimientos
--    sin cuenta asignada, usando USD como moneda de partida (podés cambiarla
--    después desde la página de Cuentas).
insert into public.accounts (user_id, name, currency, color, icon)
select distinct t.user_id, 'Cuenta principal', 'USD', '#2a78d6', 'bank'
from public.transactions t
where t.account_id is null
on conflict (user_id, name) do nothing;

-- 4) Asignar esa cuenta a los movimientos que quedaron sin una.
update public.transactions t
set account_id = a.id
from public.accounts a
where t.account_id is null
  and a.user_id = t.user_id
  and a.name = 'Cuenta principal';

-- 5) Ahora sí, hacer la columna obligatoria.
alter table public.transactions
  alter column account_id set not null;
