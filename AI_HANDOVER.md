# AI Handover Documentation (Tafaneen Order Bloom)

## 📌 Project Overview
This represents the **Frontend (Phase 1 & 2)** of the "Tafaneen Order Bloom" e-commerce application. The project has been refactored to match a specific mobile app design, featuring a **Right-to-Left (RTL)** layout and a distinct **Red (#C02626)** color theme.

**Current State (Mocked Backend)**: The UI flow is complete and functional. ALL backend dependencies (Supabase) have been removed. The application currently runs in a "Mock Mode" using local state and `localStorage` to simulate authentication, cart operations, and security logs.

---

## 🎨 Design System & Standards
**Crucial**: Any future changes MUST adhere to these rules to maintain consistency.

- **Primary Color**: `#C02626` (Tafaneen Red). Used for primary buttons, active states, and highlights.
- **Secondary Color**: `#DAA520` (Golden). Used for section headers and special offers.
- **Layout**: **RTL (Right-to-Left)**.
    - All text must be aligned right.
    - Icons (Back arrows, Search buttons) must be flipped or positioned for RTL context.
- **Typography**: Custom Arabic font stack (as defined in `index.css`).
- **Icons**: `lucide-react` library.
- **UI Components**: Shadcn UI (Radix based).
- **Reusable Components**:
    - `ProductCard.tsx`: **MUST** be used for any product listing (Grid or Carousel).
    - `Header.tsx`: Handles dynamic titles and back navigation.
    - `BottomNav.tsx`: Main navigation bar for mobile view.

---

## 🔄 Backend Status: REMOVED / MOCKED
The previous Supabase integration has been intimately stripped out to allow for a fresh backend start.

- **AuthContext**: Uses local state mock.
- **Login Page**: Simulates login and stores session in `localStorage` (`admin_user`).
- **CartContext**: Cart works locally but does not sync to DB.
- **Hooks**: `useRealtimeProducts`, `useSecurity`, `securityAuditLogger`, etc., have been mocked to prevent errors.

---

## ✅ Completed Modules

| Module | Status | Description |
| :--- | :--- | :--- |
| **Home Page** | ✅ Done | Hero carousel, Categories slider, Featured rows. |
| **Navigation** | ✅ Done | BottomNav, Dynamic Header, Sidebar Menu (Hamburger). |
| **Categories** | ✅ Done | Sidebar layout with dynamic sub-category switching. |
| **Products** | ✅ Done | `CategoryProductsPage` (Grid), `ProductDetailsPage` (Gallery, Qty). |
| **Cart** | ✅ Done | `CartContext`, Add/Remove items, Total calculation (Local Only). |
| **Search** | ✅ Done | Functional Search Page with filters and RTL layout. |
| **Favorites** | ✅ Done | Wishlist functionality linked to local dummy state. |
| **Offers** | ✅ Done | dedicated offers page with banner grid. |
| **User Profile** | ✅ Done | Settings and Account pages (UI only). |
| **Admin Dashboard** | ✅ Done | Full admin UI (Products, Orders, Users) preserved and mocked. |

---

## 🚧 Missing / Remaining Tasks (Next Steps)
The frontend is ready to be connected to a NEW backend of choice (e.g., Firebase, Node.js/Mongo, or a fresh Supabase instance).

### 1. Re-implement Backend
- **Choose Technology**: Select a new backend provider.
- **Data Integration**: Replace the mock hooks (e.g., `useRealtimeProducts`) with real API calls.
- **Authentication**: Replace the mock logic in `LoginPage.tsx` and `AuthContext.tsx` with real auth SDKs.

### 2. Connect Data Feeds
- **Products**: Source from real DB.
- **Orders**: Implement "Place Order" to actually save data.
- **Admin**: Connect the Admin Dashboard charts and tables to real data.

---

## 🛠 File Structure Guide
- `src/components`: Shared UI components (`Header`, `BottomNav`, `ProductCard`).
- `src/pages`: Main view components (`Index`, `CartPage`, `SearchPage`).
- `src/contexts`: State logic (`CartContext`, `AuthContext`).
- `src/data`: Mock data (currently used for products).

---

**Note to next Developer/AI**:
The application is currently "stand-alone". It will build and run without errors, but data is static or ephemeral. Your first job is to implement the new backend client and replace the mocks in `src/contexts` and `src/hooks`.
