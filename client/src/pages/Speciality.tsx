import { useNavigate, useParams } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";
import { UserContext } from "../context/AppContext";
import { useContext } from "react";

const Speciality = () => {
  const { speciality } = useParams(); 

  const context = useContext(UserContext)
  if(!context) return null;

  const {doctors} = context;

  console.log(speciality)
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* ---------- Filters (attached to top of content) ---------- */}
      <div className="w-full bg-white pb-6 mb-8 border-b">
        <div className="flex flex-wrap gap-3">
          {/* All Doctors button */}
          <button
            onClick={() => navigate("/doctors")}
            className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap
              ${!speciality
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"}
              transition`}
          >
            All Doctors
          </button>

          {specialityData.map((s) => (
            <button
              key={s.speciality}
              onClick={() =>
                speciality === s.speciality
                  ? navigate("/doctors") // toggle back to all
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

      {/* ---------- Doctor Cards ---------- */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {doctors
          .filter((d) => !speciality || d.speciality === speciality)
          .map((d) => (
            <article
              key={d.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image container prevents cutting: centered, with padding and object-contain */}
              <div className="h-56 flex items-center justify-center bg-gray-50">
                <img
                  src={d.image}
                  alt={d.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Card content */}
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{d.name}</h2>
                    <p className="text-sm text-gray-600">{d.degree} • {d.experience}</p>
                  </div>

                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {d.speciality}
                  </span>
                </div>

                <p className="text-gray-500 text-sm line-clamp-3">{d.about}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-lg font-semibold text-blue-600">${d.fees}</div>
                  <button onClick={()=> navigate(`/oppointment/${d.id}`)}  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Book Now
                  </button>
                </div>

                <div className="text-gray-500 text-sm mt-3">
                  <p>{d.address1}</p>
                  <p>{d.address2}</p>
                </div>
              </div>
            </article>
          ))}

        {/* No results */}
        {doctors.filter((d) => !speciality || d.speciality === speciality).length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No doctors found for "{speciality ?? 'All'}".
          </div>
        )}
      </div>
    </div>
  );
};

export default Speciality;
