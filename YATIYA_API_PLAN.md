# Yatiya Couture API Implementation Plan

This document outlines the RESTful API endpoints required to transition the frontend from `localStorage` mock data to the PostgreSQL database via Next.js Route Handlers.

## 1. Catalog & Products
### `GET /api/products`
- **Purpose**: Fetch product catalog for customer browsing.
- **Method**: `GET`
- **Auth**: Public
- **Input**: Query params (`category`, `collection`, `sort`, `page`, `limit`).
- **Output**: Array of `Product` with `ProductImage` relations.
- **Models**: `Product`, `ProductImage`, `Category`, `Collection`.

### `GET /api/products/[slug]`
- **Purpose**: Fetch detailed product view.
- **Method**: `GET`
- **Auth**: Public
- **Output**: Single `Product` with `ProductVariant`, `Inventory`, and `ProductImage`.

### `POST /api/admin/products`
- **Purpose**: Create a new product.
- **Method**: `POST`
- **Auth**: Admin Only
- **Input**: Product details, variant array, image URLs.
- **Models**: `Product`, `ProductVariant`, `ProductImage`, `Inventory`.

*(Analogous `PATCH` and `DELETE` endpoints for products).*

---

## 2. Categories & Collections
### `GET /api/categories`
- **Purpose**: Fetch site navigation.
- **Method**: `GET`
- **Auth**: Public
- **Models**: `Category`

### `GET /api/collections`
- **Purpose**: Fetch curated collections for homepage and navigation.
- **Method**: `GET`
- **Auth**: Public
- **Models**: `Collection`

*(Admin requires `POST`, `PATCH`, `DELETE` for both).*

---

## 3. Cart Management
### `GET /api/cart`
- **Purpose**: Retrieve current session cart.
- **Method**: `GET`
- **Auth**: Public (uses session cookie) or Customer JWT.
- **Models**: `Cart`, `CartItem`, `ProductVariant`.

### `POST /api/cart/items`
- **Purpose**: Add item to cart.
- **Method**: `POST`
- **Input**: `variantId`, `quantity`.
- **Logic**: Upsert `CartItem`, calculate price snapshot.

### `DELETE /api/cart/items/[id]`
- **Purpose**: Remove item from cart.
- **Method**: `DELETE`

---

## 4. Checkout & Orders
### `POST /api/checkout/initiate`
- **Purpose**: Start checkout process, lock inventory temporarily.
- **Method**: `POST`
- **Auth**: Customer or Guest.
- **Input**: Billing/Shipping `Address` IDs.
- **Output**: Payment gateway intent ID (e.g., Razorpay Order ID).
- **Models**: `Order`, `OrderItem`, `Address`.

### `POST /api/checkout/verify`
- **Purpose**: Verify payment gateway signature.
- **Method**: `POST`
- **Logic**: Marks `Order` as `CONFIRMED`, triggers email.
- **Models**: `Payment`, `Order`, `Inventory` (deducts stock permanently).

### `GET /api/orders`
- **Purpose**: Customer order history.
- **Method**: `GET`
- **Auth**: Customer JWT.
- **Models**: `Order`, `OrderItem`.

### `GET /api/admin/orders`
- **Purpose**: Comprehensive order list.
- **Method**: `GET`
- **Auth**: Admin Only.

### `PATCH /api/admin/orders/[id]/status`
- **Purpose**: Update order progress (Shipped, Delivered).
- **Method**: `PATCH`
- **Auth**: Admin Only.

---

## 5. Customers & Authentication
### `POST /api/auth/login`
- **Purpose**: Authenticate user.
- **Method**: `POST`
- **Input**: Email, Password.
- **Output**: JWT / Session Token.
- **Models**: `User`, `CustomerProfile`, `AdminUser`.

### `GET /api/customer/profile`
- **Purpose**: Fetch logged-in user profile.
- **Method**: `GET`
- **Auth**: Customer JWT.
- **Models**: `CustomerProfile`, `Address`.

---

## 6. LocalStorage Migration Plan
- **yatiya_customer**: Will be replaced by a secure HTTP-only cookie session (e.g. NextAuth.js or IronSession).
- **yatiya_addresses**: Replaced by API calls to `GET /api/customer/addresses`.
- **yatiya_orders**: Customer context will fetch live from `GET /api/orders`. Admin will fetch from `GET /api/admin/orders`.
- **cart/wishlist**: Fetched on initial mount from `GET /api/cart` and `GET /api/wishlist`, syncing offline state with the database.
- **Admin Mocks**: Will be fully replaced by `swr` or `react-query` fetches to `/api/admin/*` endpoints.

## 7. Migration Risks & Requirements
- **Risk**: Floating point issues. **Fix**: Ensure all API validations enforce rigid decimals.
- **Risk**: Over-fetching. **Fix**: Ensure API calls use Prisma `select` to minimize payload sizes (especially for products with many relations).
- **Requirement**: Strong validation layer (Zod) on all `POST`/`PATCH` endpoints to prevent schema injection or invalid ID references.
