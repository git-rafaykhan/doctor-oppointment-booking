import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["token"] as string | undefined;

  if (!token) {
    return res.status(400).json({ message: "Invalid or missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized: invalid token" });
    }

    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ message: "Unauthorized: token verification failed" });
  }
};
