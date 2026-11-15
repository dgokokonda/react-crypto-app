# React Crypto App

Приложение для учёта криптовалютного портфеля на **React 19**, **TypeScript** и **Vite** с UI на базе **Ant Design v6**.

## Возможности

- 📊 **Портфель активов** — таблица с криптовалютами, сортировкой по названию, цене и количеству.
- 💰 **Добавление актива** — форма во всплывающей панели (Drawer) с выбором монеты, вводом количества, цены, даты и автоматическим расчётом итоговой суммы.
- ℹ️ **Информация о монете** — модальное окно с иконкой, названием, символом, ценой, рыночной капитализацией, ценой в BTC, адресом контракта и изменениями цены за 1 час / 1 день / 1 неделю.
- ✅ **Подтверждение добавления** — экран результата после успешного добавления актива в портфель.
- ⌨️ **Горячая клавиша** — нажмите `/`, чтобы открыть/закрыть выпадающий список выбора монеты.
- 🟢 / 🔴 **Цветовые индикаторы роста** — теги изменения цены окрашиваются в зелёный или красный в зависимости от направления.
- ⚡ **React Compiler** — включён через `babel-plugin-react-compiler` для автоматической оптимизации рендеринга.
- 🎨 **Тёмная тема шапки** — фиксированный хедер `#011c4c` с центрированным заголовком.

## Стек технологий

| Технология                  | Версия  | Назначение            |
| --------------------------- | ------- | --------------------- |
| React                       | ^19.3.1 | UI-библиотека         |
| TypeScript                  | ~6.0.3  | Типизация             |
| Vite                        | ^8.3.6  | Сборка и dev-сервер   |
| Ant Design                  | ^6.7.0  | Компоненты интерфейса |
| babel-plugin-react-compiler | ^1.0.0  | React Compiler        |
| @vitejs/plugin-react        | ^6.1.2  | Vite плагин для React |

## Структура проекта

```
src/
├── main.tsx               # Точка входа React (StrictMode + createRoot)
├── App.tsx                # Корневой компонент (CryptoContextProvider + AppLayout)
├── index.css              # Глобальные стили
├── types/
│   └── crypto.ts          # TypeScript интерфейсы (Asset, CryptoCoin, AssetWithStats и др.)
├── api.ts                 # Имитация API-запросов (fakeFetchCrypto, fakeFetchAssets)
├── data.ts                # Моковые данные криптовалют и активов
├── utils.ts               # Вспомогательные функции (percentDifference, capitalize)
├── context/
│   └── crypto-context.tsx # CryptoContextProvider: состояние портфеля, монет, метод addAsset
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx       # Layout (Header + Sider + Content), Spin при загрузке
│   │   ├── AppHeader.tsx       # Шапка: Select монеты, кнопка "Add asset", Drawer, Modal
│   │   ├── AppSider.tsx        # Боковая панель
│   │   └── AppContent.tsx      # Основная область контента
│   └── common/
│       ├── AssetForm.tsx       # Форма добавления актива (Select → Form с полями)
│       ├── AssetsTable.tsx     # Таблица портфеля с сортировкой
│       ├── CoinInfo.tsx        # Краткая информация о монете (иконка + название)
│       └── CoinInfoModal.tsx   # Модальное окно с деталями о монете
```

## Модели данных

### Asset

```ts
interface Asset {
  id: string;
  name?: string;
  amount: number;
  price: number;
  date: Date & { $d?: Date };
  total?: number;
}
```

### CryptoCoin

```ts
interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  icon: string;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  priceBtc: number;
  marketCap: number;
  contractAddress?: string | null;
  decimals?: number;
  [key: string]: unknown;
}
```

### AssetWithStats (Asset + расчётные поля)

```ts
interface AssetStats {
  grow: boolean;
  growPercent: number;
  totalAmount: number;
  totalProfit: number;
}
```

## Запуск и сборка

### Установка зависимостей

```bash
npm install
```

### Режим разработки

```bash
npm run dev
```

Запускает Vite dev-сервер с HMR. По умолчанию приложение доступно по адресу `http://localhost:5173`.

### Продакшн сборка

```bash
npm run build
```

Выполняет `tsc -b` (проверка типов) и `vite build` в папку `dist/`.

### Превью сборки

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Особенности реализации

- **Drawer (`Add asset`)** — прикреплён к правому краю экрана (`placement="right"`), ширина 600px, внутренняя прокрутка при переполнении.
- **Form** — поля Amount, Price, Date & Time и Total растянуты на 100% ширины wrapper-колонки (`wrapperCol span: 18`), лейблы — `labelCol span: 6`.
- **DatePicker** — с компонентом времени (`showTime`), ширина 100%.
- **AssetsTable** — antd `<Table>` с удалением дублей при скрытии (`destroyOnHidden` в Drawer), сортировка по трём колонкам.
- **CoinInfoModal** — отображает изменения цены за 1ч/1д/1н, рыночную капитализацию, цену в BTC и адрес контракта (если есть).
- **Кэширование монет** — при добавлении нового актива имя и текущая цена подтягиваются из уже загруженного списка `crypto`.

## Что планируется реализовать

- Mock API заменить на реальный на основе OpenAPI CoinStats: https://openapi.coinstats.app/
- Добавить транзакции
- Добавить Redux, Router

## Лицензия

MIT
