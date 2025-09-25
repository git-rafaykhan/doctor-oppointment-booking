import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaSave } from "react-icons/fa";

const Settings = () => {
  const [name, setName] = useState("Abdul Rafay"); 
  const [email, setEmail] = useState("abdulrafay@example.com");
  const [password, setPassword] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call backend route here when ready
    console.log({ name, email, password });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Account Settings
      </h1>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-5">
          <h2 className="text-xl font-semibold">Manage Your Profile</h2>
          <p className="text-sm text-gray-200">
            Update your personal details and secure your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none text-gray-800"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-gray-800"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-gray-800"
                placeholder="Enter new password"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Leave blank if you don’t want to change it.
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
            >
              <FaSave />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
