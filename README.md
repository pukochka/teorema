# Teorema Service

Коммерческий сайт СТО **Teorema Service** на Quasar + Vue 3 + TypeScript + Pinia + Supabase + SSR.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Откроется локальный сервер Vite (обычно `http://localhost:9000`).

## SSR development

```bash
npm run dev:ssr
```

или

```bash
quasar dev -m ssr
```

## Production build

```bash
npm run build:ssr
```

или

```bash
quasar build -m ssr
```

SPA-сборка:

```bash
npm run build
```

Проверка типов и линта:

```bash
npm run typecheck
npm run lint
```

## Environment

Скопируйте `.env.example` в `.env` и заполните:

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
PUBLIC_SITE_URL=
BUSINESS_LAT=
BUSINESS_LNG=
```

- `SUPABASE_URL` и `SUPABASE_ANON_KEY` — публичные ключи проекта Supabase.
- `PUBLIC_SITE_URL` — канонический адрес сайта, например `https://example.com`. Нужен для SEO (canonical, Open Graph, sitemap).
- `BUSINESS_LAT` и `BUSINESS_LNG` — координаты сервиса. Пока они пустые, на странице контактов показывается ссылка на поиск по адресу.

Секреты Resend и `service_role` в frontend `.env` не класть. Они задаются только в Supabase Edge Functions.

## Контакты

Все контактные данные меняются в одном файле:

```text
src/config/site.ts
```

Там же телефоны, адрес, график, CTA и SEO-значения по умолчанию.

## Логотип

Положите файл сюда:

```text
public/logo.svg
```

или

```text
public/logo.png
```

Сейчас используется текстово-графический знак `public/logo.svg`. Фотографию вывески в логотип не конвертировать.

Референс вывески можно положить в:

```text
public/brand-reference.png
```

## Фотографии и видео

Структура слотов:

```text
public/images/
├── hero/workshop.jpg
├── hero/workshop.mp4
├── workshop/body.jpg
├── workshop/overview.jpg
├── workshop/overview.mp4
├── painting/booth.jpg
├── painting/booth.mp4
├── frame/bench.jpg
├── commercial/van.jpg
├── commercial/fleet.jpg
├── before-after/before.jpg
├── before-after/after.jpg
├── equipment/paint-booth.jpg
├── equipment/frame.jpg
├── equipment/lifts.jpg
├── equipment/diagnostics.jpg
├── equipment/tires.jpg
├── team/team.jpg
└── og-cover.jpg
```

Пока файлов нет, в вёрстке показываются аккуратные плейсхолдеры. Достаточно положить файл с указанным именем — карточка подхватит его через `q-img`.

Реальные работы добавляются в `src/data/works.ts`. Если запись демонстрационная, поставьте `isDemo: true` — на карточке появится метка «Демонстрационный проект».

Отзывы — в `src/data/reviews.ts`. Пока массив пустой, на сайте показывается empty state без фиктивных звёзд.

## Supabase

1. Создайте проект в Supabase.
2. Выполните SQL из `supabase/migrations/20260823_init.sql`.
3. Заполните `SUPABASE_URL` и `SUPABASE_ANON_KEY`.
4. `service_role` используйте только в Edge Functions.

Таблицы:

- `repair_estimates`
- `bookings`
- `fleet_requests`

RLS включён. Клиент пишет только через Edge Functions.

## Storage

Bucket:

```text
repair-photos
```

Создаётся миграцией как приватный. Фото повреждений загружаются с уникальным UUID-именем. Оригинальное имя файла не используется как идентификатор.

## Edge Functions

Функции:

```text
supabase/functions/submit-repair-estimate
supabase/functions/submit-booking
supabase/functions/submit-fleet-request
```

Секреты функций:

```text
RESEND_API_KEY
LEADS_NOTIFICATION_EMAIL
```

`SUPABASE_URL` и `SUPABASE_SERVICE_ROLE_KEY` задаёт сам Supabase.

Деплой:

```bash
npx supabase functions deploy submit-repair-estimate
npx supabase functions deploy submit-booking
npx supabase functions deploy submit-fleet-request
```

Письмо «Новая заявка Teorema Service» уходит через Resend. Если письмо не отправилось, заявка в базе всё равно остаётся.

## SEO

- SSR-режим Quasar
- `useMeta` / `useSeo` на страницах
- Open Graph, canonical, robots
- JSON-LD `AutoRepair`
- `public/robots.txt`
- `public/sitemap.xml` — после запуска замените пути на абсолютные URL из `PUBLIC_SITE_URL`

## Будущий статус ремонта

Маршрут `/repair-status` зарезервирован, но сейчас не реализован.

Планируемая функция: клиент вводит номер заказа и телефон, видит статус:

- Принят
- Диагностика
- Ожидание деталей
- Кузовной ремонт
- Подготовка
- Покраска
- Сборка
- Готов

## Необходимый контент от владельца

- логотип
- фотографии мастерской
- фотографии покрасочной камеры
- фотографии стапеля
- фотографии выполненных работ
- реальные отзывы
- реальные цены
- координаты
- email и ссылки на мессенджеры, если они появятся
