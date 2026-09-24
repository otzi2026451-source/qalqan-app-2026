# QALQAN — Цифровая экосистема Академии

Многопроектный монорепозиторий образовательной платформы: `Next.js` frontend, `NestJS` API, `Prisma` и локальные demo-данные для академии, госуслуг, библиотеки, AI-ассистента, рынка и личного кабинета.

## Архитектура

```text
qalqan-project/
├─ apps/
│  ├─ web/                    # Next.js 15 App Router, PWA, образовательный интерфейс
│  └─ api/                    # NestJS API, Prisma, auth, learning ecosystem services
├─ legacy/                    # старый статический прототип
├─ docs/                      # проектная и маркетинговая документация
├─ docker-compose.yml         # PostgreSQL + сервисы окружения
├─ package.json               # workspace scripts
├─ pnpm-workspace.yaml
├─ README.md
└─ metadata.json
```

## Что включено

- Главная экосистема QALQAN с навигацией по Академии, eGov, Market, AI, Library, Security
- Личный кабинет и dashboard для студента
- Академическое расписание, оценки, успеваемость и уведомления
- Библиотека учебных материалов и цифровой каталог
- eGov-поддержка и демо-госуслуги
- Market с корзиной, избранным, пошаговым оформлением заказа и расширенным каталогом образовательных товаров
- AI-ассистент с быстрыми подсказками, безопасным серверным AI роутом и поддержкой вложений: фото, PDF, DOCX, TXT и CSV
- Платформа в образовательном дизайне QALQAN без старых банковских/финансовых брендов

## Технологии

- `Next.js 15` + `React 19` + TypeScript
- `NestJS` + `Prisma` + PostgreSQL
- `lucide-react`, `recharts`, JWT/auth patterns, PWA shell
- `@google/genai` для безопасного серверного Gemini AI

## Быстрый старт

### 1) Установка Node.js

Если в Windows отсутствует `npm`, установите LTS-версию Node.js и добавьте каталог `C:\Program Files\nodejs` в `PATH`.

Проверка:

```powershell
node -v
npm -v
```

Если PowerShell блокирует `npm.ps1`, временно добавьте путь вручную:

```powershell
$env:Path += ';C:\Program Files\nodejs'
npm -v
```

### 2) Установка зависимостей

```bash
npm install
```

### 3) Настройка Gemini API key

Для живого AI-ответа создайте файл `apps/web/.env.local` со следующим содержимым:

```env
GEMINI_API_KEY=ВАШ_РЕАЛЬНЫЙ_GEMINI_API_KEY
```

> Ключ хранится только на серверной стороне в `.env.local` и не должен попадать в клиентский код или репозиторий.

### 4) Запуск локального dev-сервера

```bash
npm run dev
```

или, если среда PowerShell не видит `npm` напрямую:

```powershell
$env:Path += ';C:\Program Files\nodejs'
npm run dev
```

Откройте:

- http://localhost:3000

### 5) Production build

```bash
npm run build
```

### 6) Запуск production-сервера

```bash
npm run start
```

### 7) Публичный деплой на GitHub Pages + AI backend

Так как GitHub Pages — это статический хостинг, реальный AI-эндпоинт нельзя держать на Pages. Правильная схема:

1. Главный frontend публикуется через GitHub Pages.
2. Реальный Gemini API вызов идёт на отдельный публичный backend.
3. В frontend нужно указать `NEXT_PUBLIC_CHAT_API_URL` на публичный URL backend.

Пример:

```env
NEXT_PUBLIC_CHAT_API_URL=https://your-backend.example.com/api/chat
```

Для публичного backend достаточно запустить Node-сервер из файла `api/server.js` на любом хостинге (Render, Railway, Fly.io, Cloud Run, VPS), а в окружении указать:

```env
GEMINI_API_KEY=ваш_ключ
GEMINI_MODEL=gemini-3.6-flash
PORT=3001
```

После этого GitHub Pages frontend сможет обращаться к вашему публичному backend со сторонних компьютеров.

## Основные команды

```bash
npm run dev
npm run build
npm run lint
npm run start
```

## AI и безопасность

- AI UI реализован в приложении `/ai`.
- Запросы к Gemini идут через серверный Route Handler в `apps/web/app/api/ai/route.ts`.
- Поддержка вложений файлов и изображений добавлена на клиенте и передается в серверный AI роут.
- Если `GEMINI_API_KEY` пустой или отсутствует, приложение возвращает безопасное сообщение, а не падает с ошибкой.

## Market и функциональность

- Расширенный каталог товаров QALQAN Market с реальными карточками по категориям: Учёба, Гигиена, Спорт, Общежитие, Книги.
- Корзина, избранное, фильтрация и пошаговое оформление заказа сохранены и работают в текущем интерфейсе.
- Встроенная карточка товара поддерживает расширенную метаинформацию, модель, источник, статус наличия, отзывы и описание.

## Решенные проблемы

- Исправлена проблема с Windows/Powershell и отсутствием `npm` в `PATH`
- Удалены старые банковские и финтех-метки, заменены на QALQAN-экосистему
- Обновлены учебные материалы, catalog data и Market product data под образовательную платформу
- Подключен безопасный Gemini AI Route и добавлена поддержка вложений в QALQAN AI
- Исправлены основные маршруты и навигационные дескрипторы страницы

## Примечание

Этот проект является demo-экосистемой Академии и не должен рассматриваться как финансовое приложение без дополнительной проверки безопасности, данных и интеграций.
