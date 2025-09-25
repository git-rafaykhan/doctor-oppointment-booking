import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// --- Types ---
interface Doctor {
  id: number;
  name: string;
  degree: string;
  speciality: string;
  experience: string;
  about?: string;
  fees: number;
  image: string;
  address1: string;
  address2: string;
}

interface AppContextType {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  refetchDoctors: () => Promise<void>;
}

// --- Context ---
export const UserContext = createContext<AppContextType | undefined>(undefined);

export const AppContext = ({ children }: { children: ReactNode }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backend_url = "http://localhost:8080/api/admin/doctors";


  // Fetch doctors from backend
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(backend_url);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      setDoctors(data.allDoc || []); 
    } catch (err) {
      setError("Failed to fetch doctors");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run once on mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const value: AppContextType = {
    doctors,
    loading,
    error,
    refetchDoctors: fetchDoctors,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
