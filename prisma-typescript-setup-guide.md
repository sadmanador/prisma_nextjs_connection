
# ✅ Prisma + TypeScript Setup Guide

A complete step-by-step guide to set up Prisma in a TypeScript project (ideal for video tutorials).

---

## 📁 1. Project Initialization

```bash
npm init -y
```

Install dependencies:

```bash
npm install prisma @prisma/client
npm install --save-dev typescript ts-node @types/node nodemon
```

---

## ⚙️ 2. Configure TypeScript

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "lib": ["esnext"],
    "skipLibCheck": true
  },
  "include": ["./src/**/*"]
}
```

> 🔹 Create a `src/` folder to store your TypeScript files.

---

## 🛠️ 3. Initialize Prisma

```bash
npx prisma init --datasource-provider postgresql
```

This creates:

- `prisma/schema.prisma`
- `.env`

Update your `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

---

## 🧱 4. Define Your Prisma Model

In `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

## 📦 5. Run Initial Migration

```bash
npx prisma migrate dev --name init
```

> 🔹 `init` is the migration name

---

## 🧬 6. Generate Prisma Client

```bash
npx prisma generate
```

> 🔄 Run this every time the Prisma schema changes.

---

## 🧠 7. Setup Prisma Client Singleton (Recommended)

In `src/lib/prisma.ts`:

```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

> ✅ Prevents multiple instances of PrismaClient in development (especially with `nodemon` or `Next.js`).

---

## 🔁 8. Create Sample CRUD

In `src/index.ts`:

```ts
import { prisma } from './lib/prisma';

async function main() {
  // CREATE
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  });

  // READ
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 🔄 9. Setup Nodemon for Dev

Add this to `package.json`:

```json
"scripts": {
  "dev": "nodemon src/index.ts"
}
```

Create a `nodemon.json` file:

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

---

## ✅ Final Checklist

| Item | Done? |
|------|-------|
| Project initialized with `npm init` | ✅ |
| Installed Prisma + TypeScript tools | ✅ |
| tsconfig + nodemon setup | ✅ |
| Prisma model created | ✅ |
| Ran first migration | ✅ |
| Generated Prisma client | ✅ |
| CRUD example written | ✅ |
| Used Prisma client singleton | ✅ |
| `.env` configured | ✅ |
| Prisma Studio used (`npx prisma studio`) | ✅ |
| Mentioned VS Code Prisma extension (optional) | ✅ |

---

## 🧪 Bonus Commands

- Run Prisma Studio:

```bash
npx prisma studio
```

- Add a new model, then apply:

```bash
npx prisma migrate dev --name added-model
npx prisma generate
```

---

Let me know if you’d like to add Express/Next.js examples or structure this into a full-stack project!
