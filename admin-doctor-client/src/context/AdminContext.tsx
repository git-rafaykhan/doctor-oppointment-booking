import type { ReactNode, Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";
import { admin_backend_url } from "../config/config";

// Define the type for the context
interface AdminContextType {
  adminToken: string | null;
  setAdminToken: Dispatch<SetStateAction<string | null>>;
  getAllAppointments: () => Promise<any>;
  getAllDoctors: () => Promise<any>;
  deleteDoctor: (id: string) => Promise<any>;
}

// ✅ API Functions
const getAllAppointments = async () => {
  const res = await fetch(`${admin_backend_url}/appointments`, {
    headers: {
      Authorization: `${localStorage.getItem("atoken")}`,
    },
  });
  return await res.json();
};

const getAllDoctors = async () => {
  const res = await fetch(`${admin_backend_url}/doctors`, {
    headers: {
      Authorization: `${localStorage.getItem("atoken")}`,
    },
  });
  return await res.json();
};
const deleteDoctor = async (id: string) => {
  const res = await fetch(`${admin_backend_url}/delete-doctor`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("atoken")}`,
    },
    body: JSON.stringify({ docId: id }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete doctor");
  }

  return await res.json();
};


// ✅ Create Context
export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);

export const AdminAppContext = ({ children }: { children: ReactNode }) => {
  const [adminToken, setAdminToken] = useState<string | null>(
    localStorage.getItem("atoken")
  );

  const value: AdminContextType = {
    adminToken,
    setAdminToken,
    getAllAppointments,
    getAllDoctors,
    deleteDoctor,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
