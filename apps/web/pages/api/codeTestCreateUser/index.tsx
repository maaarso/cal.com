import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@calcom/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { username, email, password, name } = req.body;

    console.log("Request body:", req.body);

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
        name: name,
      },
    });

    console.log("User created:", user);

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
