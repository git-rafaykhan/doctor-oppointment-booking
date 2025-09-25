import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import { prismaClient } from "../db/index.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

// -------------------- Admin Login --------------------
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { combo: `${email}:${password}`, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Admin login successful",
      admin: { email: ADMIN_EMAIL, name: "Super Admin" },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// -------------------- Add Doctor --------------------
export const addDoctor = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address1,
      address2,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address1
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Doctor image is required" });
    }

    const existingDoctor = await prismaClient.doctor.findUnique({
      where: { email },
    });

    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "doctors",
    });

    const doctor = await prismaClient.doctor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees: Number(fees),
        address1,
        address2: address2 || "", 
        image: uploadResult.secure_url,
      },
    });

    return res.status(201).json({
      message: "Doctor added successfully",
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality,
        degree: doctor.degree,
        experience: doctor.experience,
        about: doctor.about,
        fees: doctor.fees,
        address1: doctor.address1,
        address2: doctor.address2,
        image: doctor.image,
        createdAt: doctor.createdAt,
      },
    });
  } catch (err) {
    console.error("Add Doctor Error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// -------------------- All Appointments --------------------
export const oppointmentsAdmin = async (req: Request, res: Response) => {
  try {
    const allOppointments = await prismaClient.oppointment.findMany({
      include: {
        user: true,
        doc: true,
      },
    });

    res.status(200).json({ message: "All appointments", allOppointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// -------------------- Cancel Appointment --------------------
export const cancelOppointment = async (req: Request, res: Response) => {
  try {
    const { oppointmentId } = req.body;

    if (!oppointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    const existing = await prismaClient.oppointment.findUnique({
      where: { id: oppointmentId },
    });

    if (!existing) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await prismaClient.oppointment.delete({
      where: { id: oppointmentId },
    });

    return res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// -------------------- All Doctors --------------------
export const alldoctors = async (req: Request, res: Response) => {
  try {
    const allDoc = await prismaClient.doctor.findMany({});
    res.status(200).json({ message: "All doctors", allDoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// -------------------- Delete Doctor --------------------
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const existing = await prismaClient.doctor.findUnique({
      where: { id: docId },
    });

    if (!existing) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await prismaClient.doctor.delete({
      where: { id: docId },
    });

    return res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
