import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerify = async (method) => {
   
    try {
      const res = await fetch(`http://localhost:5000/api/auth/register-${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
          
 const data = await res.json();
      if (res.ok) {
        toast.success(`OTP sent via ${method}! Redirecting...`);
        setTimeout(() => {
          navigate(`/otp-verification/${form.email}`);
        }, 1000);
      } else {
        toast.error(data.message || "Error sending OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Try again.");

  };}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">Mobile Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your mobile number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => handleVerify("email")}
              className="w-1/2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Verify via Email
            </button>

            <button
              onClick={() => handleVerify("phone")}
              className="w-1/2 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300"
            >
              Verify via Mobile
            </button>
          </div>

          {message && (
            <p className={`text-center mt-4 ${message.includes("OTP") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
