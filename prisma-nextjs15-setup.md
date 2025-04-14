
# 🚀 Prisma + TypeScript Setup in Next.js 15

A complete guide to setting up **Prisma** in a **Next.js 15** project using the **App Router**, **TypeScript**, and **PostgreSQL**.

---

## 📁 1. Initialize a Next.js 15 Project

```bash
npx create-next-app@latest my-app
cd my-app
```

Choose:
- TypeScript ✅
- App Router ✅
- Tailwind CSS (optional)

---

## 📦 2. Install Dependencies

```bash
npm install prisma @prisma/client
npm install --save-dev ts-node
```

---

## 🛠️ 3. Initialize Prisma

```bash
npx prisma init --datasource-provider postgresql
```

This creates:
- `prisma/schema.prisma`
- `.env`

Update `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

---

## 🧱 4. Define a Model

Edit `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

## 📤 5. Run Migration

```bash
npx prisma migrate dev --name init
```

Then generate Prisma Client:

```bash
npx prisma generate
```

---

## 🔄 6. Setup Prisma Client (Singleton)

Create `lib/prisma.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 📂 7. Create API Routes with App Router

In `app/api/users/route.ts`:

```ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST hardcoded user
export async function POST() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
```

---

## 🧪 8. Test Your API

Start your dev server:

```bash
npm run dev
```

Visit:

- [http://localhost:3000/api/users](http://localhost:3000/api/users)

Use **Postman** or **REST Client** to test GET/POST routes.

---

## 🔍 9. Use Prisma Studio (Optional)

```bash
npx prisma studio
```

---

## ✅ Final Checklist

| Item | Done? |
|------|-------|
| Next.js 15 project setup | ✅ |
| Installed Prisma packages | ✅ |
| Created schema & migration | ✅ |
| Setup Prisma client singleton | ✅ |
| Added App Router API handlers | ✅ |
| Verified with Studio or Postman | ✅ |

---

Let me know if you'd like to add client-side fetching examples or deploy this on Vercel!
