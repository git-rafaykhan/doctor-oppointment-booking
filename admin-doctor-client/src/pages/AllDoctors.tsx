import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { FaTrash, FaUserMd } from "react-icons/fa";

const AllDoctors = () => {
  const context = useContext(AdminContext);
  const [allDoctors, setAllDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!context) return null;
  const { getAllDoctors, deleteDoctor } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllDoctors();
        setAllDoctors(res.allDoc || []);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
        setError("Unable to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getAllDoctors]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      await deleteDoctor(id);
      setAllDoctors((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error("Failed to delete doctor", err);
      setError("Delete failed. Please try again.");
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-10 border-b pb-3">
        <FaUserMd className="text-blue-600 text-2xl" />
        <h2 className="text-3xl font-bold text-gray-800">All Doctors</h2>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 text-red-600 font-medium bg-red-100 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-blue-600 font-semibold animate-pulse text-lg">
            Loading doctors...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && allDoctors.length === 0 && (
        <div className="flex flex-col justify-center items-center h-40 text-gray-500">
          <FaUserMd className="text-4xl mb-2" />
          <p className="text-lg">No doctors found</p>
        </div>
      )}

      {/* Doctor Grid */}
      {!loading && allDoctors.length > 0 && (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {allDoctors.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl border shadow-md hover:shadow-lg transition flex flex-col min-h-[420px]"
            >
              {/* Profile Image */}
              <div className="flex flex-col items-center text-center p-8 border-b bg-gray-50 rounded-t-2xl">
                <img
                  src={d.image || "https://via.placeholder.com/150"}
                  alt={d.name}
                  className="w-36 h-36 object-cover rounded-full mb-5 border border-gray-200 shadow-sm"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  {d.name}
                </h3>
                <p className="text-base text-gray-500">{d.speciality}</p>
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between p-8 space-y-4">
                <div className="space-y-3 text-base text-gray-700">
                  <p>
                    <span className="font-medium">Degree:</span> {d.degree}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {d.experience} years
                  </p>
                  <p>
                    <span className="font-medium">Fee:</span>{" "}
                    <span className="text-blue-600 font-semibold">
                      {d.fees} PKR
                    </span>
                  </p>
                  {d.about && (
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                      {d.about}
                    </p>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(d.id)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete Doctor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDoctors;
