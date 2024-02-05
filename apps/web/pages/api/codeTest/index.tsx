import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  try {
    const allBookings = await prisma.booking.findMany();
    res.status(200).json(allBookings);
  } catch (error) {
    console.error("Error fetching data from Prisma:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
