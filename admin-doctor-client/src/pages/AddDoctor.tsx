import { useState, type FormEvent } from "react";
import { admin_backend_url } from "../config/config";
import { FaUpload, FaUserMd } from "react-icons/fa";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", fees);
      formData.append("address1", address1);
      formData.append("address2", address2);
      if (image) formData.append("image", image);

      const res = await fetch(`${admin_backend_url}/add-doctor`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add doctor");
      const data = await res.json();
      setMessage(data.message || "Doctor added successfully ✅");

      // reset form
      setName("");
      setEmail("");
      setPassword("");
      setSpeciality("");
      setDegree("");
      setExperience("");
      setAbout("");
      setFees("");
      setAddress1("");
      setAddress2("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="lg:ml-64 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2 mb-8">
            <FaUserMd className="text-3xl text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Add New Doctor
            </h2>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-10"
          >
            {/* Upload Section */}
            <div className="flex flex-col items-center mb-10">
              <label className="cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    alt="Doctor"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-gray-400">
                    <FaUpload className="text-2xl" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0] || null)
                  }
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Upload profile picture
              </p>
            </div>

            {/* Grid Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Speciality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speciality
                </label>
                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  required
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Speciality</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Pediatrician">Pediatrician</option>
                </select>
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Experience</option>
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="5 Years">5 Years</option>
                  <option value="10+ Years">10+ Years</option>
                </select>
              </div>

              {/* Fees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fees (PKR)
                </label>
                <input
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  required
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic / Hospital Address (Line 1)
                </label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address Line 2 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* About */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Doctor
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-8 hover:bg-blue-700 disabled:opacity-50 w-full font-medium"
            >
              {loading ? "Adding Doctor..." : "Add Doctor"}
            </button>
          </form>

          {/* Feedback */}
          {message && (
            <p className="mt-6 font-semibold text-gray-700 text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
