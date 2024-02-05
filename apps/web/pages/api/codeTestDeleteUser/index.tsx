import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Si c'est une requête GET, récupérez l'ID du paramètre d'URL
      const userId = parseInt(req.body.id, 10);

      if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
      }

      console.log("User ID:", userId);

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      console.log("User:", user);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        console.log("User not found");
        return;
      }

      const userDeleted = await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error handling request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
