-- Ejecutar UNA VEZ en el SQL Editor de tu proyecto ya existente para:
-- 1) reasignar transacciones/presupuestos de categorías duplicadas a la más antigua,
-- 2) borrar las categorías duplicadas,
-- 3) agregar el constraint único que evita que vuelva a pasar.

update public.transactions t
set category_id = keep.id
from public.categories dup
join public.categories keep
  on keep.user_id = dup.user_id
  and keep.name = dup.name
  and keep.created_at < dup.created_at
where t.category_id = dup.id;

update public.budgets b
set category_id = keep.id
from public.categories dup
join public.categories keep
  on keep.user_id = dup.user_id
  and keep.name = dup.name
  and keep.created_at < dup.created_at
where b.category_id = dup.id;

delete from public.categories dup
using public.categories keep
where dup.user_id = keep.user_id
  and dup.name = keep.name
  and dup.created_at > keep.created_at;

alter table public.categories
  add constraint categories_user_name_unique unique (user_id, name);
