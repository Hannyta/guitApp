-- Ejecutar UNA VEZ en el SQL Editor para corregir el ícono/color de las
-- categorías por defecto que ya tenías creadas antes de este cambio
-- (les actualiza el ícono y color solo si coinciden por nombre exacto).

update public.categories set icon = 'food',      color = '#eb6834' where name = 'Alimentación';
update public.categories set icon = 'home',      color = '#eda100' where name = 'Renta';
update public.categories set icon = 'leisure',   color = '#e87ba4' where name = 'Ocio';
update public.categories set icon = 'transport', color = '#4a3aa7' where name = 'Transporte';
update public.categories set icon = 'health',    color = '#e34948' where name = 'Salud';
update public.categories set icon = 'other',     color = '#898781' where name = 'Otros gastos';
update public.categories set icon = 'briefcase', color = '#2a78d6' where name = 'Salario';
update public.categories set icon = 'laptop',    color = '#1baf7a' where name = 'Freelance';
update public.categories set icon = 'coin',      color = '#008300' where name = 'Otros ingresos';
