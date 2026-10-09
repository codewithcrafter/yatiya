# ECOMMERCE_ARCHITECTURE.md

## Overview
This document outlines the Phase 1 backend and database architecture for the Yatiya Couture ecommerce platform. The architecture is designed for a scalable system including customer-facing storefronts, admin CMS, inventory management, carts, checkouts, and future payment and shipping integrations.

## Database Models

- **User / CustomerProfile / AdminUser:** Manages authentication, roles (CUSTOMER, ADMIN, MANAGER, STAFF), and profile information including linked addresses and order histories.
- **Product / ProductVariant / ProductImage:** Core catalog models. Products can belong to categories and collections. Each product can have multiple variants (sizes, colors, SKUs).
- **Category & Collection:** Organizational taxonomy for products. Support for nested categories and curated collections.
- **Inventory:** Tracks physical stock linked to specific ProductVariants with thresholds for low stock.
- **Cart & CartItem:** Temporary storage for items added by customers (logged-in or guest via sessionId), with price snapshotting to handle price changes during browsing.
- **Address:** Billing and shipping addresses for CustomerProfiles.
- **Order & OrderItem:** Core transactional models. Contains complete price snapshotting (subtotal, taxes, shipping, discounts).
- **Payment:** Stores transaction statuses and provider responses. Prepared for future integrations (e.g., Razorpay, Stripe).
- **Shipment:** Stores tracking and AWB details, ready for future Shiprocket webhook integration.
- **Coupon & CouponUsage:** Configurable discount rules with limits per user and total uses.
- **Wishlist & Review:** Customer engagement features for saving products and providing feedback.
- **ReturnRequest & Refund:** Framework for managing order disputes and returning items to inventory.
- **CMS Models (Banner, HomepageSection, Testimonial, BlogPost, Notification):** Extensible models for controlling storefront layout and content from a future admin interface.

## Important Relationships
- **Price Snapshots:** `OrderItem` and `CartItem` store prices as Snapshots (`Decimal`), so historical orders and active carts remain unaffected if the base product price is updated.
- **Soft Relations in Orders:** `OrderItem` keeps textual snapshot data (`productNameSnapshot`, `skuSnapshot`) to ensure order history remains intact even if a product is deleted.
- **Product Categorization:** A product can belong to multiple collections (many-to-many `ProductCollection`) and one primary category.

## Order Lifecycle
Orders flow through clearly defined statuses:
`PENDING_PAYMENT` -> `CONFIRMED` -> `PROCESSING` -> `READY_TO_SHIP` -> `SHIPPED` -> `OUT_FOR_DELIVERY` -> `DELIVERED`
Alternatively: `PAYMENT_FAILED`, `CANCELLED`, `RETURN_REQUESTED`, `RETURNED`, `REFUNDED`

## Payment & Shipping Future Integrations
- **Payments:** Payment processing is architected to rely on server-side webhook verifications mapping to the `Payment` model.
- **Shipping:** The `Shipment` model is ready to map to Shiprocket API responses (Shipment ID, AWB, Tracking URL).

## CMS Modules
The database structure is ready to support a robust headless CMS, managing product catalogs, banners, blog posts, and dynamic homepage sections directly from the backend.

## Planned Future Phases
- **Phase 2:** Product + Category + Collection + Inventory System (Admin UI and logic).
- **Phase 3:** Cart & Checkout implementation.
- **Phase 4:** Payment Gateway & Shiprocket Integration.
- **Phase 5:** Customer portal & advanced CMS.
