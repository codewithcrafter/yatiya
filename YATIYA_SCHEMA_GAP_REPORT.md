# Yatiya Couture Schema Gap Report

This document compares the current `prisma/schema.prisma` against the requirements established in the Phase 2–7 frontend mockups.

## 1. Product Model
**Missing Fields in Prisma Schema:**
- `tags` (String[]): Missing. Needed for search and categorizations.
- `fabric` (String): Missing. Highly specific to couture.
- `care` (String): Missing. Important for luxury garments.
- `fit` (String): Missing. Crucial sizing context.
- `details` (String[]): Missing. Bullet points for features.
- *Recommendation*: Add these as scalar arrays (`String[]`) or JSON fields on the `Product` model, or create a `ProductDetail` relationship table if complex querying is required.

## 2. Store Settings
**Missing Model:**
- There is no `StoreSetting` or `Configuration` model. The Admin CMS (Phase 7) assumes fields like:
  - `Store Name`
  - `Support Email`
  - `Default Shipping Cost`
  - `Free Shipping Threshold`
- *Recommendation*: Create a `StoreSetting` model (Key-Value pairs or single-row config table) to store these operational metrics.

## 3. Order Model
**Missing Fields/Gaps:**
- The `Order` model uses relations for `Payment` and `Shipment`, but the Admin UI frequently lists orders directly displaying the `Payment Method` (e.g., UPI, Card).
- *Recommendation*: Ensure the API responses join the `Payment` relation reliably, or add a denormalized `paymentMethodSnapshot` to the `Order` model for quick indexing.

## 4. Product Variants & Inventory
**Structural Gap:**
- Frontend mock data assumes sizes and colors are simple arrays on a product (`sizes: ['S', 'M']`, `colors: ['Gold']`), and stock status is a single generic string.
- The Prisma schema is correct in enforcing strict `ProductVariant` relationships. However, the future API layer will need significant mapping logic to convert the frontend's simple arrays into individual variant rows for CRUD operations in the Admin CMS.

## 5. Reviews and Ratings
**Missing Fields:**
- The frontend expects `rating: number` and `reviews: number` to be immediately available on product cards.
- *Recommendation*: Add `averageRating` (Decimal/Float) and `reviewCount` (Int) as cached aggregate fields on the `Product` model to avoid complex `GROUP BY` SQL operations during heavy catalog browsing.

## 6. Cart Management
**Gap:**
- Guest carts currently rely exclusively on `localStorage`. The Prisma schema provides `sessionId` on the `Cart` model to support this.
- *Recommendation*: Ensure backend APIs respect cookie-based `sessionId` headers for anonymous visitors to properly instantiate a database-backed `Cart` without requiring authentication.
