import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AppContext.tsx";
import { specialityData } from "../assets/assets_frontend/assets";

const Doctors = () => {
  const { speciality } = useParams();
  console.log(speciality)
  const navigate = useNavigate();

  const ctx = useContext(UserContext);
  if (!ctx) return null;

  const { doctors, loading, error } = ctx;


  // Filter doctors by speciality (or show all if no speciality selected)
const filteredDoctors = doctors.filter(
  (d) =>
    !speciality ||
    d.speciality === speciality
);


return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* -------- Filters -------- */}
      <div className="w-full bg-white pb-6 mb-10 border-b">
        <div className="flex flex-wrap gap-3">
          {/* All Doctors Button */}
          <button
            onClick={() => navigate("/doctors")}
            className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap
              ${
                !speciality
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
              } transition`}
          >
            All Doctors
          </button>

          {/* Speciality Filters */}
          {specialityData.map((s) => (
            <button
              key={s.speciality}
              onClick={() =>
                speciality === s.speciality
                  ? navigate("/doctors")
                  : navigate(`/doctors/${s.speciality}`)
              }
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap
                ${
                  speciality === s.speciality
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                } transition`}
            >
              {s.speciality}
            </button>
          ))}
        </div>
      </div>

      {/* -------- Loading/Error -------- */}
      {loading && (
        <div className="text-center text-blue-600 font-medium py-12">
          Loading doctors...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-medium py-12">{error}</div>
      )}

      {/* -------- Doctor Cards -------- */}
      {!loading && !error && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((d) => (
            <article
              key={d.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image */}
              <div className="h-56 flex items-center justify-center bg-gray-50">
                <img
                  src={d.image}
                  alt={d.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{d.name}</h2>
                    <p className="text-sm text-gray-600">
                      {d.degree} • {d.experience}
                    </p>
                  </div>

                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {d.speciality}
                  </span>
                </div>

                <p className="text-gray-500 text-sm line-clamp-3">{d.about}</p>

                {/* Fees & CTA */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-lg font-semibold text-blue-600">
                    PKR {d.fees}
                  </div>
                  <button
                    onClick={() => navigate(`/oppointment/${d.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </div>

                {/* Address */}
                <div className="text-gray-500 text-sm mt-3">
                  <p>{d.address1}</p>
                  <p>{d.address2}</p>
                </div>
              </div>
            </article>
          ))}

          {/* No Results State */}
          {filteredDoctors.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No doctors found for "{speciality}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Doctors;
