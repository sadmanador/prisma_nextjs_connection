// pages/api/users.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch users from the database
    const users = await prisma.user.findMany();

    // Return the users as a JSON response
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    // Handle any errors and return a 500 response
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
