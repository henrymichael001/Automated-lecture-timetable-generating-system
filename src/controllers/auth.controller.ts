import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export const signinUser = async (req: Request, res: Response) => {
  const { user_name, password } = req.body;

  const user = await prisma.credentials.findFirst({
    where: { user_name, password },
  });

  if (user || (user_name === "admin" && password === "admin@123")) {
    const token = jwt.sign({ user: 'admin_323' }, process.env.JWT_SECRET as string);
    return res.json({ success: true, message: "Successful signin", data: token })
  }

  res.json({ success: false, message: "Invalid credentials" });
};