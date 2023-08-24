# Order Reactions Widget Example

This repo shows how you can use custom Entities, Services, Endpoints, and Admin Extensions to build an Order Reaction feature in [Medusa](https://medusajs.com/).

https://github.com/srindom/medusa-order-reactions/assets/7554214/10540e0c-f906-4205-bf5c-3b583baf9083

## Get Started

```
git clone git@github.com:srindom/medusa-order-reactions.git
cd medusa-order-reactions
yarn
medusa migrations run
yarn seed
yarn dev
```

The Admin Panel will open and you can log in with email: `admin@medusa-test.com` password: `supersecret`. Create an order and visit the Order Details page to see the Order Reactions widget.

## Overview

The Order Reactions widget allows admin users to add Emoji reactions to Orders in their store. This is a fun little feature but is unlikely to bring a ton of business value to merchants. The approach used in building this feature is, however, a good example of how you can create deep customizations in Medusa that include both backend logic and a merchant UI, thereby tailoring Medusa to complex business requirements and bringing value to merchants that other platforms can't easily match.

### Who is this repo for?
This repo is for developers who want to build customizations in Medusa, and is meant to serve as inspiration for how to get started.

### Features used
- Custom Entity 
  - Example: [src/models/order-reaction.ts](https://github.com/srindom/medusa-order-reactions/blob/main/src/models/order-reaction.ts) 
  - [Visit Docs](https://docs.medusajs.com/development/entities/overview)
- Custom Service 
  - Example: [src/services/order-reaction.ts](https://github.com/srindom/medusa-order-reactions/blob/main/src/services/order-reaction.ts) 
  - [Visit Docs](https://docs.medusajs.com/development/services/overview)
- Custom Endpoints 
  - Example: [src/api/order-reactions](https://github.com/srindom/medusa-order-reactions/blob/main/src/api/order-reactions) 
  - [Visit Docs](https://docs.medusajs.com/development/endpoints/overview)
- Admin Widget 
  - Example: [src/admin/widgets/order-widget.tsx](https://github.com/srindom/medusa-order-reactions/blob/main/src/admin/widgets/order-widget.tsx) 
  - [Visit Docs](https://docs.medusajs.com/admin/widgets)
- Medusa UI 
  - Example: [src/admin/widgets/order-widget.tsx](https://github.com/srindom/medusa-order-reactions/blob/main/src/admin/widgets/order-widget.tsx) 
  - [Visit Docs](https://docs.medusajs.com/ui)

## More resources
- [Medusa Website](https://medusajs.com/)
- [Medusa Docs](https://docs.medusajs.com/)
- [Medusa Nextjs Storefront Starter Template](https://medusajs.com/nextjs-commerce/)
