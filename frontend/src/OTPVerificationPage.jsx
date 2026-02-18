import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import toast from "react-hot-toast";


export default function OTPVerificationPage() {
  const {email} = useParams()
  // console.log(email);
  
  const navigate = useNavigate();
  const [otp, setOtp] = useState(""); 
 
  const [message, setMessage] = useState(""); 

  // Handle OTP verify
  const handleVerifyOTP = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-register-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,otp }),
      })
      if (res.ok) {
        toast.success("OTP verified successfully");
        navigate(`/set-password/${email}`, { state: { email } })
      }
      else{
        toast.success("wrong otp")
      }


    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Enter OTP to Verify
        </h2>

        <p className="text-gray-600 text-sm mb-4 text-center">
          Please enter the 6-digit OTP sent to your email or mobile.
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-xl tracking-widest"
        />

        <button
          onClick={handleVerifyOTP}
          className="w-full bg-indigo-600 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Verify OTP
        </button>

        {message && (
          <p
            className={`text-center mt-4 ${message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
          >
            {message}
          </p>
        )}


      </div>
    </div>
  );
}
