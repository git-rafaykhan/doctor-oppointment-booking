import Speciality from "../components/Speciality";
import { FaUserMd, FaCalendarCheck, FaShieldAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* ---------------- Hero Section ---------------- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Book Appointments with Trusted Doctors Easily
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Your health matters. Find the right specialist, schedule
            appointments, and manage your health journey all in one place.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* ---------------- Features Section ---------------- */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <FaUserMd className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Expert Doctors
            </h3>
            <p className="text-gray-600">
              Access a network of highly qualified and experienced doctors
              across multiple specialities.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <FaCalendarCheck className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Easy Appointments
            </h3>
            <p className="text-gray-600">
              Book, reschedule, or cancel appointments anytime with just a few
              clicks.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
            <FaShieldAlt className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your health information is encrypted and protected with the
              highest standards.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Speciality Section ---------------- */}
      <Speciality />

      {/* ---------------- Call to Action ---------------- */}
      <section className="bg-blue-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Care of Your Health?
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust our platform for reliable,
            secure, and hassle-free healthcare.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition">
            Book Your Appointment
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
