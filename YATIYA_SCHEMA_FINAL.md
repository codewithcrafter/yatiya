# Yatiya Couture Final Schema Documentation (Phase 8B-1)

This document details the hardened schema architecture prepared for the real PostgreSQL database.

## 1. Final Models
- **Users**: `User`, `CustomerProfile`, `AdminUser`.
- **Products**: `Product`, `Category`, `Collection`, `ProductCollection`, `ProductImage`, `ProductVariant`.
- **Inventory**: `Inventory` (moved cleanly to attach to `ProductVariant`).
- **Orders**: `Order`, `OrderItem`, `Cart`, `CartItem`, `Address`.
- **Payments & Shipments**: `Payment`, `Shipment`.
- **Marketing & CMS**: `Coupon`, `CouponUsage`, `Wishlist`, `WishlistItem`, `Review`, `Banner`, `HomepageSection`, `Testimonial`, `BlogPost`, `Notification`.
- **Support**: `ReturnRequest`, `Refund`.
- **Config**: `StoreSetting`.

## 2. Important Relations
- **Product Details & Variants**: The `Product` model now encapsulates global details (including `tags`, `fabric`, `care`, `fit`, `details` via native `String[]` types). `ProductVariant` handles the granular skus, colors, and sizes.
- **Inventory architecture**: `Inventory` maps 1-to-1 with `ProductVariant` instead of `Product`.
- **Customer architecture**: Authentication identity is stored in `User`, while all business-logic relations (Orders, Reviews, Wishlist) map safely to `CustomerProfile`.

## 3. Order Snapshot Strategy
Historical integrity has been prioritized:
- `Order` captures physical snapshots of shipping coordinates (Name, Phone, AddressLine, City, State, Pincode) at the time of checkout. This ensures edits to the live `Address` model do not retroactively alter old invoices.
- `OrderItem` captures snapshots of the product name, SKU, price, variant size, and variant color.
- Soft relations (`onDelete: SetNull`) have been used for linking `Order` and `OrderItem` to `Product` and `Address` respectively. If an admin deletes a product, the order history survives completely intact.

## 4. Money Handling
- All monetary fields (prices, subtotals, shipping charges, discounts, taxes, and payments) strictly utilize `@db.Decimal(10, 2)`.
- The frontend currently utilizes JS `number`. The future backend service layers will cast `number` to `Decimal` upon insertion, ensuring precise float operations inside PostgreSQL.

## 5. Coupon Architecture
- `Coupon` maintains limits, constraints (min order, max discount), and date validity.
- `CouponUsage` enforces a unique constraint on `[couponId, customerProfileId, orderId]` to prevent multi-usage races.

## 6. CMS Architecture
- Models for `Banner`, `HomepageSection`, `Testimonial`, and `BlogPost` have been verified with `isActive` flags, `sortOrder` for deterministic frontend rendering, and appropriate timestamps.

## 7. Enums
Refined and standardized enums:
- `Role`: `CUSTOMER`, `ADMIN`, `MANAGER`, `STAFF`, `CONTENT_MANAGER`, `ORDER_MANAGER`
- `ProductStatus`: `DRAFT`, `ACTIVE`, `ARCHIVED`
- `OrderStatus`: `PENDING_PAYMENT`, `PAYMENT_FAILED`, `CONFIRMED`, `PROCESSING`, `READY_TO_SHIP`, `SHIPPED`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`, `RETURN_REQUESTED`, `RETURNED`, `REFUNDED`
- `PaymentStatus`: `PENDING`, `SUCCESS`, `FAILED`, `REFUNDED`
- `ShipmentStatus`: `PENDING`, `SCHEDULED`, `PICKED_UP`, `IN_TRANSIT`, `OUT_FOR_DELIVERY`, `DELIVERED`, `RTO`, `CANCELLED`
- `DiscountType`: `PERCENTAGE`, `FIXED`
- `ReturnStatus`: `REQUESTED`, `APPROVED`, `REJECTED`, `PICKUP_SCHEDULED`, `RECEIVED`, `REFUNDED`

## 8. Important Indexes
Heavy-read patterns were optimized:
- `@@index([slug])` added to `Product`, `Category`, `Collection`, `BlogPost`.
- `@@index([categoryId])` and `@@index([status])` added to `Product` for catalog filtering.
- `@@index([orderNumber])` and `@@index([status])` on `Order` for Admin Dashboard efficiency.
- `@@index([code])` on `Coupon`.
- Foreign key fields natively indexed (`orderId`, `productId`, `userId`).

## 9. Unique Constraints
- `Product.slug`, `Product.sku`, `ProductVariant.sku`.
- `Category.slug`, `Collection.slug`, `BlogPost.slug`.
- `Order.orderNumber`, `Payment.transactionId`, `Shipment.shipmentId`, `Shipment.awb`.
- Composite unique lock on `WishlistItem` (`[wishlistId, productId]`) and `Review` (`[customerProfileId, productId]`).

## 10. Future Migration Notes
- **Prisma 8 RC Anomalies**: The installed Prisma RC (`8.0.0-rc.20`) drops legacy commands like `validate`, `format`, and `generate` from the `npx prisma` CLI entry point. Future migrations might require shifting to `@prisma/cli` or verifying the exact command paths required by Prisma v8.
- **Database Initializer**: When the real PostgreSQL `DATABASE_URL` is mounted, a single `npx prisma migrate dev --name initial_schema_hardening` will construct the database perfectly based on these blueprints.
