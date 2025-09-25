import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";

declare module "express" {
  export interface Request {
    docId?: string;
  }
}

export const doctorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dtoken = req.headers["dtoken"] as string | undefined;

  if (!dtoken) {
    return res.status(400).json({ message: "Invalid or missing token" });
  }

  try {
    const decoded = jwt.verify(dtoken, JWT_SECRET) as JwtPayload;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized: invalid token" });
    }

    req.docId = decoded.id; 
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ message: "Unauthorized: token verification failed" });
  }
};
