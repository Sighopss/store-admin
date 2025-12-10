# Store-Admin Service

Employee web application for managing Algonquin Pet Store operations.

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Axios for API calls

## Features

- Product management (CRUD operations)
- Order management
- Inventory control
- Order status updates

## Local Development

```bash
npm install
npm run dev
```

Application will be available at http://localhost:3003

## Environment Variables

- `NEXT_PUBLIC_PRODUCT_SERVICE_URL`: Product service URL (default: http://localhost:3001)
- `NEXT_PUBLIC_ORDER_SERVICE_URL`: Order service URL (default: http://localhost:3002)

## Docker Build

```bash
docker build -t store-admin:latest .
docker run -p 3003:3003 store-admin:latest
```

## Health Check

```bash
curl http://localhost:3003/health
```

