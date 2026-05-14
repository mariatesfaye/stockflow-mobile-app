# StockFlow

Inventory demo for a take-home: register a user, add products (SKU, name, price, qty), adjust stock, see activity history with simple pagination. Built with Expo, React Native, TypeScript, and NativeWind.

## Setup & run

```bash
npm install
npm start
```

Then open the project in **Expo Go** (scan the QR from the terminal) or press `i` / `a` for a simulator.

## What’s in here

User signup (name + email, validated). Product form with unique SKU, positive price, non-negative quantity. Stock goes up/down from a modal; it won’t drop below zero. Each product shows SKU, name, qty, and last updated. History logs every change (add/remove, amount, time) with 5 items per page. There’s a fake delay on saves so buttons show loading states. Nothing persists — closing the app wipes data.

## Approach

State lives in **`App.tsx`** with **`useState`**. Shared pieces are user, products, and transactions; handlers update them and get passed down as props. **`useEffect`** only shows up for small UI stuff (e.g. resetting a modal when it closes, clamping the history page when the list shrinks). No Redux, no context — kept it flat on purpose.

Components are split into **`src/components`** (inputs, buttons, cards, list rows) and **`src/screens`**. Validation helpers live in **`src/utils/validation.ts`** so the forms aren’t full of inline checks.

Styling is **NativeWind** (`className` + Tailwind-style tokens). Faster than hand-rolling StyleSheets for something this size.

## Trade-offs

Everything stays **in memory** — no backend, no storage. Fine for a few-hour scope; you’d add persistence or an API next.

I skipped heavier architecture (global stores, navigation libraries) so the flow is easy to follow: open **`App.tsx`** and you see the whole story. Downside is a bit of prop drilling into the modals, but it’s only two screens deep.

## Screenshots

### User Registration
![User Registration](./assets/screenshots/user-registration.png)

### Inventory
![Inventory](./assets/screenshots/inventory.png)
![Inventory](./assets/screenshots/inventory2.png)

### Add Product
![Add Product](./assets/screenshots/add-product.png)

### Stock Adjustment
![Stock Adjustment](./assets/screenshots/stock-adjustment.png)

### Transaction History
![Transaction History](./assets/screenshots/transaction-history.png)

### Profile
![Profile](./assets/screenshots/profile.png)
