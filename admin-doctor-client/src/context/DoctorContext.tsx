import { createContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";

// Context type
interface DoctorContextType {
  doctorToken: string | null;
  setDoctorToken: Dispatch<SetStateAction<string | null>>;
}

// Create context (initially undefined)
export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorAppContext = ({ children }: { children: ReactNode }) => {
  const [doctorToken, setDoctorToken] = useState<string | null>(localStorage.getItem("dtoken"));

  const value = {
    doctorToken, 
    setDoctorToken
  }
  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};
