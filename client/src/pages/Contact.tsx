const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Have questions, feedback, or need help? We’d love to hear from you.  
          Get in touch with our team using the details below or fill out the form.
        </p>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">📍 Address</h3>
            <p className="text-gray-600">123 MediConnect Plaza, Islamabad, Pakistan</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">📞 Phone</h3>
            <p className="text-gray-600">+92 300 1234567</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">📧 Email</h3>
            <p className="text-gray-600">support@mediconnect.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            Send Us a Message
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Subject"
              className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              
              className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.292298258475!2d73.0551!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf76e57cfa0f%3A0x6a0c6a0b7c2bb2b0!2sIslamabad!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="400"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
