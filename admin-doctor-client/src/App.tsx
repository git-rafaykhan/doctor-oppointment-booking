import { useContext } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminContext } from "./context/AdminContext"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import AddDoctor from "./pages/AddDoctor"
import AllOppointment from "./pages/AllOppointment"
import AllDoctors from "./pages/AllDoctors"
import Layout from "./components/Layout"
import { DoctorContext } from "./context/DoctorContext"
import DoctorAppointments from "./pages/DoctorAppointments"

const App = () => {
  const context = useContext(AdminContext);
  const doctorContext = useContext(DoctorContext);
  if(!context || !doctorContext) {
    return null;
  }
  const { adminToken } = context; 
  const {doctorToken} = doctorContext; 
  
  return adminToken || doctorToken ? (
    <div>
      <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/admin-dashboard" element={<AdminDashboard />}  />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/all-oppointments" element={<AllOppointment />} /> 
              <Route path="/all-doctors" element={<AllDoctors />} />
              <Route path="/doctor-appointments" element={<DoctorAppointments/>} />
            </Routes>
            </Layout>
      </BrowserRouter>
    </div>
  ) : (
    <>
      <Login />
    </>
  )
}

export default App
