import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Footer from "./components/Footer"
import Speciality from "./pages/Speciality";
import Oppointment from "./pages/Oppointment";
import MyOppointments from "./pages/MyOppointments";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors/:speciality" element={<Speciality />}/>
        <Route path="/oppointment/:docId" element={<Oppointment />}/>
        <Route path="/my-oppointments" element={<MyOppointments />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
