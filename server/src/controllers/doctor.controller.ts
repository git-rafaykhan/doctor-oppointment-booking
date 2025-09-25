import type { Request, Response } from "express";
import { prismaClient } from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "random123";

export const signin = async (req: Request, res: Response)=> {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            res.status(400).json({message: "all fields are required"})
            return;
        }
        const doctorExist = await prismaClient.doctor.findUnique({where : {email}});
        if(!doctorExist) {
            res.status(400).json({message: "You are Not signed up on our platform. contact admin"})
            return;
        }
        
        const passwordCheck = await bcrypt.compare(password, doctorExist.password);
        if(!passwordCheck) {
            res.status(400).json({message: "incorrect password"})
            return;
        }
        
        const token = jwt.sign(
            { id: doctorExist.id },
            JWT_SECRET,
            {
              expiresIn: (process.env.JWT_EXPIRES_IN ?? "1d") as jwt.SignOptions["expiresIn"],
            } as jwt.SignOptions
          );

          res.status(200).json({message: "Signed In ", token});

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "server side error"})
    }
}

export const doctorAppointments = async (req: Request, res: Response) => {
  const docId = req.docId;

  try {
    if (!docId) {
      return res.status(400).json({ message: "Invalid docId" });
    }

    const appointments = await prismaClient.oppointment.findMany({
      where: { docId: Number(docId) }, // ✅ convert to number
    });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json({
      message: "Your appointments",
      appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server side error" });
  }
};