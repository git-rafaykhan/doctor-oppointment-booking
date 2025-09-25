import type { Request, Response } from "express";
import { prismaClient } from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";

// Helper to generate token
const generateToken = (userId: number): string => {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN ?? "1d") as jwt.SignOptions["expiresIn"],
    } as jwt.SignOptions
  );
};

// ---------------- Signup ----------------
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prismaClient.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Generate token
    const token = generateToken(user.id);

    return res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ---------------- Signin ----------------
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user.id);

    return res.status(200).json({
      message: "Signin successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ---------------- Book Oppointment ----------------
export const bookOppointment = async (req: Request, res: Response) => {
  try {
    const { docId, slotDate, slottime, amount } = req.body;
    const userId = req.userId

    console.log(docId, slotDate, slottime, amount, userId);
    
    const doctor = await prismaClient.doctor.findFirst({
      where: { id: parseInt(docId, 10) },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await prismaClient.oppointment.create({
      data: {
        slotDate,
        slottime: new Date(slottime), 
        userId: Number(userId),
        docId: doctor.id,
        amount: parseFloat(amount),
      },
    });

    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const myOppointments = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    if(!userId) {
      res.status(400).json({message: "user is not found"});
      return;
    }

    const myOppointments = await prismaClient.oppointment.findMany({where: {userId: Number(userId)}});

    if(!myOppointments) {
      res.status(400).json({message : "No such Oppointments"});
      return;
    }

    res.status(200).json({message: "Oppointments", myOppointments});

  } catch (error) {
    console.log(error)
    res.status(500).json({message : "server side error"});
  }
}