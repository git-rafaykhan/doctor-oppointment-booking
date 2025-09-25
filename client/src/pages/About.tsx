const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are dedicated to making healthcare simple, accessible, and convenient for everyone. 
          Our mission is to connect you with trusted doctors anytime, anywhere.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-blue-50 rounded-2xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          At <span className="font-semibold text-blue-600">MediConnect</span>, we believe healthcare 
          should be accessible and stress-free. Our platform bridges the gap between patients and doctors, 
          providing reliable appointments, real-time availability, and a seamless booking experience.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-blue-700 text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-lg font-bold text-blue-600 mb-2">Trusted Doctors</h3>
            <p className="text-gray-600">
              Connect with qualified and verified medical professionals across multiple specialties.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-lg font-bold text-blue-600 mb-2">Easy Appointments</h3>
            <p className="text-gray-600">
              Book an appointment in just a few clicks with flexible time slots to match your schedule.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-lg font-bold text-blue-600 mb-2">Patient-Centered Care</h3>
            <p className="text-gray-600">
              We focus on giving you a smooth and caring experience every step of the way.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
