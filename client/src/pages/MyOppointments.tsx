import { useEffect, useState } from "react";
import { FaUserMd, FaCalendarAlt, FaClock, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";

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

interface User {
  id: number;
  name: string;
  email: string;
}

interface Oppointment {
  id: string;
  slotDate: string;
  userId: number;
  docId: number;
  amount: number;
  date: string;
  cancelled: boolean;
  payment: boolean;
  iscompleted: boolean;
  slottime: string;
  doc: Doctor;
  user: User;
}

const MyOppointments = () => {
  const [loading, setLoading] = useState(false);
  const [oppointments, setOppointments] = useState<Oppointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const fetchOppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://doctor-oppointment-booking.onrender.com/api/user/myOppointments", {
        headers: {
          token: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch appointments");

      const data = await res.json();
      setOppointments(data.myOppointments || []);
    } catch (err) {
      setError("Error fetching appointments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOppointments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
        My Appointments
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : oppointments.length === 0 ? (
        <div className="text-center text-gray-500">No appointments found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {oppointments.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition flex flex-col justify-between"
            >
              {/* Doctor Info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaUserMd className="text-blue-600 text-xl" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {o.doc?.name}
                    </h3>
                    <p className="text-sm text-gray-500">{o.doc?.speciality}</p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <span>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(o.slotDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-gray-500" />
                    <span>
                      <span className="font-medium">Time:</span>{" "}
                      {new Date(o.slottime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-gray-500" />
                    <span>
                      <span className="font-medium">Fees:</span> PKR {o.amount}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    {o.iscompleted ? (
                      <>
                        <FaCheckCircle className="text-green-600" />
                        <span className="text-green-600 font-semibold">
                          Completed
                        </span>
                      </>
                    ) : o.cancelled ? (
                      <>
                        <FaTimesCircle className="text-red-600" />
                        <span className="text-red-600 font-semibold">
                          Cancelled
                        </span>
                      </>
                    ) : (
                      <>
                        <FaHourglassHalf className="text-yellow-600" />
                        <span className="text-yellow-600 font-semibold">
                          Upcoming
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-3">
                {!o.cancelled && !o.iscompleted && (
                  <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium">
                    Cancel
                  </button>
                )}
                {o.payment ? (
                  <button className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-lg cursor-not-allowed text-sm font-medium">
                    Paid
                  </button>
                ) : (
                  <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOppointments;
