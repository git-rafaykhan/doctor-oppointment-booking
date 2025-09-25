import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/AppContext";

const Oppointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const ctx = useContext(UserContext);
  if (!ctx) return null;
  const { doctors } = ctx;

  const doctor = doctors.find((d) => d.id == Number(docId));

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  if (!doctor) {
    return <div className="text-center text-gray-600 mt-10">Doctor not found</div>;
  }

  // ✅ Handle booking
  const handleBooking = async () => {
    try {
      // Get token directly from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to book an appointment.");
        return navigate("/login");
      }

      // Convert time string like "10:00 AM" to ISO DateTime with selectedDate
      const dateTimeString = `${selectedDate} ${selectedTime}`;
      const slotDate = selectedDate;
      const slottime = new Date(dateTimeString);

      const res = await fetch("https://doctor-oppointment-booking.onrender.com/api/user/bookOppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token, // ✅ pulled from localStorage
        },
        body: JSON.stringify({
          docId: doctor.id,
          slotDate,
          slottime,
          amount: doctor.fees,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Appointment booked successfully!");
        navigate("/my-oppointments");
      } else {
        alert(data.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Doctor Info */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex gap-6 items-center border border-gray-100">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-40 h-40 object-cover rounded-2xl border-4 border-blue-100"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
          <p className="text-blue-600 font-medium">{doctor.speciality}</p>
          <p className="text-blue-600 font-medium">PKR {doctor.fees}</p>
          <p className="text-gray-600 mt-2">
            {doctor.about || "Experienced and compassionate doctor providing quality healthcare services."}
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="mt-10 bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Book an Appointment</h2>

        {/* Date Picker */}
        <label className="block mb-3 text-gray-700 font-medium">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Time Slots */}
        <div className="mt-6">
          <label className="block mb-3 text-gray-700 font-medium">Available Time Slots:</label>
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-lg border transition ${
                  selectedTime === time
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-8">
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
              selectedDate && selectedTime
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Oppointment;
