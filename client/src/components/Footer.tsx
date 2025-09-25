import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white mt-12">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold">MyApp</h2>
          <p className="mt-4 text-blue-200 text-sm leading-relaxed">
            Building trust and connecting patients with the right doctors.  
            Your health, our priority.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <NavLink to="/" className="hover:text-blue-300">Home</NavLink>
            <NavLink to="/doctors" className="hover:text-blue-300">Doctors</NavLink>
            <NavLink to="/about" className="hover:text-blue-300">About</NavLink>
            <NavLink to="/contact" className="hover:text-blue-300">Contact</NavLink>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-300">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-300">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-300">Support</a></li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-blue-200 text-sm">123 Health Street, Karachi, Pakistan</p>
          <p className="text-blue-200 text-sm mt-2">Email: support@myapp.com</p>
          <p className="text-blue-200 text-sm">Phone: +92 300 1234567</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-blue-800 py-4 text-center text-blue-300 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
