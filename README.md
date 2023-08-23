# Order Reactions Widget Example

This repo showcases how you can use custom Entities, Services, Endpoints, and Admin Extensions to build an Order Reaction feature in Medusa.

https://github.com/srindom/medusa-order-reactions/assets/7554214/10540e0c-f906-4205-bf5c-3b583baf9083

## Overview

The Order Reactions widget allows admin users to add Emoji reactions to Orders in their store. This is a fun little feature but is unlikely to bring a ton of business value to merchants. Nevertheless, this repo showcases how you can create deep customizations in Medusa that include both backend logic and a merchant UI, thereby tailoring Medusa to more complex business requirements.

### Features used
- Custom Entity - see src/models/order-reaction.ts
- Custom Service - see src/services/order-reaction.ts
- Custom Endpoints - see src/api/order-reactions
- Admin Widget - see src/admin/widgets/order-widget.tsx
- Medusa UI - visit docs

## Get Started

```
git clone https://github.com/srindom/medusa-order-reactions
cd medusa-order-reactions
yarn
medusa migrations run
yarn seed
yarn dev
```
