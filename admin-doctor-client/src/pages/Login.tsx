import { useContext, useState } from "react";
import { admin_backend_url, doctor_backend_url } from "../config/config";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AdminContext);
  const doctorContext = useContext(DoctorContext);

  if(!context || !doctorContext){
    console.log("context is not defined")
    return;
  }

  const { adminToken, setAdminToken } = context;
  const {doctorToken, setDoctorToken } = doctorContext;

  const handleSignin = async (e: React.FormEvent)=> {
    e.preventDefault();
    try {
      if(isAdmin){
        const res = await fetch(`${admin_backend_url}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password})
        })
        const data = await res.json();
        if(data) {
          localStorage.setItem('atoken', data.token);
          setAdminToken(data.token)
          console.log(adminToken)
        }
      } else {
          const res = await fetch(`${doctor_backend_url}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password})
        })
        const data = await res.json();
        localStorage.setItem('dtoken', data.token);
        setDoctorToken(data.token);
        console.log(doctorToken)
        console.log(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          {isAdmin ? "Admin Login" : "Doctor Login"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isAdmin
            ? "Login to manage doctors and appointments"
            : "Login to view and manage your appointments"}
        </p>

        {/* Form */}
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          /> 

          {/* Button */}
          <button
            type="submit"
            onClick={handleSignin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isAdmin ? "Login as Admin" : "Login as Doctor"}
          </button>
        </form>

        {/* Toggle */}
        <div className="flex items-center justify-center mt-6 text-gray-700 text-sm">
          {isAdmin ? (
            <>
              <span className="mr-2">Are you a doctor?</span>
              <button
                type="button"
                onClick={() => setIsAdmin(false)}
                className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
              >
                Click to login
              </button>
            </>
          ) : (
            <>
              <span className="mr-2">Are you an Admin?</span>
              <button
                type="button"
                onClick={() => setIsAdmin(true)}
                className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
              >
                Click to login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
