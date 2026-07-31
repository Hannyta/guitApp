-- Ejecutar UNA VEZ en el SQL Editor si tu proyecto ya existía antes de esta
-- función (agrega la columna "icon" a las categorías).

alter table public.categories
  add column if not exists icon text not null default 'other';
