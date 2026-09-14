update public.site_settings
set
  street = 'ул. Солтыса, 108, корпус 3',
  address = 'г. Минск, ул. Солтыса, 108, корпус 3',
  updated_at = now()
where id = 'default';

update public.pages
set
  seo_title = 'Автосервис в Минске на Солтыса — СТО | Teorema Service',
  seo_description = 'СТО в Минске на ул. Солтыса, 108, корпус 3 (Дражня): ремонт, кузовной ремонт, покраска, шиномонтаж и полировка. Запись по телефону или на сайте.',
  faq = case
    when exists (
      select 1
      from jsonb_array_elements(coalesce(faq, '[]'::jsonb)) item
      where item->>'id' = 'home-where'
    ) then faq
    else coalesce(faq, '[]'::jsonb) || '[{"id":"home-where","question":"Где находится Teorema Service?","answer":"Автосервис в Минске на ул. Солтыса, 108, корпус 3 — микрорайон Дражня, Партизанский район. Как проехать, смотрите на карте на главной и на странице контактов."}]'::jsonb
  end,
  updated_at = now()
where id = 'home';

update public.pages
set
  seo_title = 'О сервисе Teorema Service в Минске на Солтыса',
  seo_description = 'Teorema Service — автосервис в Минске на ул. Солтыса, 108, корпус 3 (Дражня, Партизанский район). Легковые автомобили и лёгкий коммерческий транспорт.',
  subtitle = 'Автосервис в Минске на Солтыса: легковые автомобили и лёгкий коммерческий транспорт.',
  intro = 'Teorema Service находится в Минске на ул. Солтыса, 108, корпус 3 — микрорайон Дражня, Партизанский район. Принимаем легковые автомобили и лёгкий коммерческий транспорт, включая небольшие грузовики. В одном месте можно сделать обслуживание и ремонт, кузовные работы на стапеле, покраску в камере, шиномонтаж, заправку кондиционера и полировку кузова.',
  faq = case
    when exists (
      select 1
      from jsonb_array_elements(coalesce(faq, '[]'::jsonb)) item
      where item->>'id' = 'about-where'
    ) then faq
    else coalesce(faq, '[]'::jsonb) || '[{"id":"about-where","question":"В каком районе Минска вы находитесь?","answer":"В Партизанском районе, микрорайон Дражня. Адрес: ул. Солтыса, 108, корпус 3."}]'::jsonb
  end,
  updated_at = now()
where id = 'about';

update public.pages
set
  seo_title = 'Контакты Teorema Service — Минск, Солтыса 108, корпус 3',
  seo_description = 'Teorema Service, г. Минск, ул. Солтыса, 108, корпус 3, микрорайон Дражня. Телефон +375 44 518 94 32. График 9:00–18:00, воскресенье — выходной.',
  subtitle = 'Адрес на Солтыса, телефон и график работы.',
  blocks = case
    when coalesce(blocks, '[]'::jsonb) = '[]'::jsonb then '[{"id":"how-to-find","title":"Как добраться","text":"Сервис в Партизанском районе Минска, микрорайон Дражня: ул. Солтыса, 108, корпус 3. Ближайшие остановки — «Дражня» и «Переулок Солтыса». На карте на этой странице — точка въезда."}]'::jsonb
    else blocks
  end,
  faq = case
    when coalesce(faq, '[]'::jsonb) = '[]'::jsonb then '[{"id":"contacts-where","question":"Где находится Teorema Service?","answer":"г. Минск, ул. Солтыса, 108, корпус 3. Микрорайон Дражня, Партизанский район."},{"id":"contacts-hours","question":"Когда вы работаете?","answer":"С понедельника по субботу с 9:00 до 18:00. Воскресенье — выходной."}]'::jsonb
    else faq
  end,
  updated_at = now()
where id = 'contacts';

update public.pages
set
  seo_description = 'Плановое ТО легковых автомобилей и LCV в Минске, ул. Солтыса, 108, корпус 3. Запись по телефону или через форму на сайте.',
  updated_at = now()
where id = 'maintenance';

update public.pages
set
  seo_description = 'Ремонт легковых автомобилей и LCV в автосервисе на Солтыса: от текущих неисправностей до работ любой сложности.',
  updated_at = now()
where id = 'repair';

update public.pages
set
  seo_description = 'Кузовной ремонт и стапель в Минске на ул. Солтыса, 108, корпус 3. Оценка по фото или на осмотре.',
  updated_at = now()
where id = 'body-repair';

update public.pages
set
  seo_description = 'Покраска кузова и отдельных деталей в камере Teorema Service, Партизанский район Минска.',
  updated_at = now()
where id = 'painting';

update public.pages
set
  seo_description = 'Шиномонтаж и сезонная смена шин в Дражне: ул. Солтыса, 108, корпус 3.',
  updated_at = now()
where id = 'tires';

update public.pages
set
  seo_description = 'Заправка автокондиционера в Teorema Service на Солтыса. Запись по телефону или через форму.',
  updated_at = now()
where id = 'ac';

update public.pages
set
  seo_description = 'Полировка кузова в автосервисе на Солтыса: блеск ЛКП и менее заметные мелкие поверхностные дефекты.',
  updated_at = now()
where id = 'polishing';

update public.pages
set
  seo_description = 'Примеры работ Teorema Service в Минске на Солтыса: ремонт, кузовной ремонт, покраска, шиномонтаж и полировка.',
  updated_at = now()
where id = 'works';

update public.pages
set
  seo_description = 'Стоимость услуг автосервиса на Солтыса определяем после осмотра. Для ремонта можно отправить фотографии.',
  updated_at = now()
where id = 'prices';

update public.pages
set
  seo_description = 'Онлайн-запись в Teorema Service на ул. Солтыса, 108, корпус 3: имя, телефон и нужная услуга.',
  updated_at = now()
where id = 'booking';
