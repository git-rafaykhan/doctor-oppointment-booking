import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const DoctorAppointments = () => {
  // Later you can fetch from your API and set this dynamically
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      date: "2025-09-23",
      time: "10:30 AM",
      location: "Clinic Room 3",
    },
    {
      id: 2,
      patient: "Sarah Khan",
      date: "2025-09-24",
      time: "2:00 PM",
      location: "Clinic Room 1",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Doctor Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <FaUser className="text-blue-500" />
              <h2 className="text-lg font-semibold">{appt.patient}</h2>
            </div>

            {/* Body */}
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{appt.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{appt.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>{appt.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
