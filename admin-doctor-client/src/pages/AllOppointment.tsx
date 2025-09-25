import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";

const AllOppointment = () => {
  const context = useContext(AdminContext);
  const [oppointments, setOppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  if (!context) {
    return null;
  }

  const { getAllAppointments } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAppointments();
        setOppointments(data.allOppointments || []);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getAllAppointments]);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div>
      <h2>All Appointments</h2>
      {oppointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        oppointments.map((appt: any) => (
          <div
            key={appt.id}
            style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
          >
            <p><strong>ID:</strong> {appt.id}</p>
            <p><strong>Slot Date:</strong> {appt.slotDate}</p>
            <p><strong>Slot Time:</strong> {new Date(appt.Slottime).toLocaleTimeString()}</p>
            <p><strong>User ID:</strong> {appt.userId}</p>
            <p><strong>Doctor ID:</strong> {appt.docId}</p>
            <p><strong>Amount:</strong> {appt.amount} PKR</p>
            <p><strong>Created At:</strong> {new Date(appt.date).toLocaleDateString()}</p>
            <p><strong>Cancelled:</strong> {appt.cancelled ? "Yes" : "No"}</p>
            <p><strong>Payment Done:</strong> {appt.payment ? "Yes" : "No"}</p>
            <p><strong>Completed:</strong> {appt.iscompleted ? "Yes" : "No"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllOppointment;
