update public.site_settings
set
  phones = '[{"raw":"+375445189432","display":"+375 44 518 94 32","label":"Основной"}]'::jsonb,
  address = 'г. Минск, ул. Солтыса, 108',
  updated_at = now()
where id = 'default';
