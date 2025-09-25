import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-8 py-16 px-6 text-[#262626] bg-gray-50"
    >
      {/* Title */}
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        Find by Speciality
      </h1>
      <p className="sm:w-1/2 text-center text-gray-600 text-base leading-relaxed">
        Browse through our trusted doctors by speciality and schedule your
        appointment with ease.
      </p>

      {/* Grid of Specialities */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 flex flex-col items-center p-6 text-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gray-100 rounded-full mb-4">
              <img
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                src={item.image}
                alt={item.speciality}
              />
            </div>
            <p className="text-sm sm:text-base font-semibold text-gray-800">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
