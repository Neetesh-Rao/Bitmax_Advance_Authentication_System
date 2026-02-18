import { useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import toast from "react-hot-toast";


export default function LoginNextPage() {
          const navigate = useNavigate();
         const location = useLocation();
const {email,phone} = location.state;


  const [method, setMethod] = useState("otp"); // otp or password
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  

  const handleSendOTP = async() => {
    const data = await res.json();
      if(email){
         const res = await fetch(`http://localhost:5000/api/auth/login-email-otp`, {
             method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
              })
    setOtpSent(true);
    toast.success("OTP sent successfully ✅");
    navigate("/login-next",{ state: { user: data.user } })
      }
      if(phone){
         const res = await fetch(`http://localhost:5000/api/auth/login-phone-otp`, {
             method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
              })
    setOtpSent(true);
    toast.success("OTP sent successfully ✅");
    navigate("/login-next",{ state: { user: data.user } })
      }
    }

  // Handle verifying OTP
  const handleVerifyOTP = async() => {
    const data = await res.json();
  try{
  if(email){
  const res = await fetch('http://localhost:5000/api/auth/verify-email-otp', {
             method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,otp}),
              })
    setOtpSent(true);
    if(res.ok){
             toast.success("OTP verified successfully ✅");
      navigate("/dashboard",{ state: { user: data.user } })
    }else{
             toast.error("Wrong OTP");
    }
    }
    if(phone){
        const res = await fetch('http://localhost:5000/api/auth/verify-phone-otp', {
             method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone ,otp}),
              })
    setOtpSent(true);
   if(res.ok){
           toast.success("OTP verified successfully ✅");
     navigate("/dashboard",{ state: { user: data.user } })
   }else{
           toast.error("Wrong OTP");
   }
      }
  }catch(err){
    console.log(err)
  }
    }
  

  // Handle verifying password
  const handleVerifyPassword = async() => {
     if (!password) {
      setMessage("Please enter your password");
      return;
    }
if(email){
  const res = await fetch('http://localhost:5000/api/auth/login-email-password', {
             method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,password}),
              })
               const data = await res.json();
    if(res.ok){
             toast.success("Login Successfully ✅");
      navigate("/dashboard",{state:{user:data.user}})
    }else{
             toast.error("Wrong Password");
    }
    }
       

      if(phone){
        const res = await fetch('http://localhost:5000/api/auth/login-phone-password', {
             method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone ,password}),
              })
               const data = await res.json();
   if(res.ok){
           toast.success("Login successfully ✅");
     navigate("/dashboard",{state:{user:data.user}})
   }else{
           toast.error("Wrong Password");

      }
      }};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {/* Switcher */}
        <div className="flex justify-center mb-6 gap-2">
          <button
            onClick={() => { setMethod("otp"); setOtpSent(false); setMessage(""); }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              method === "otp"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Via OTP
          </button>
          <button
            onClick={() => { setMethod("password"); setMessage(""); }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              method === "password"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Via Password
          </button>
        </div>

        {/* Dynamic Form */}
        <div className="space-y-4">
          {method === "otp" ? (
            <>
              {!otpSent ? (
                <button
                  onClick={handleSendOTP}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-xl tracking-widest"
                  />
                  <button
                    onClick={handleVerifyOTP}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleVerifyPassword}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
              >
                Verify Password
              </button>
            </>
          )}

          {message && (
            <p
              className={`text-center mt-4 ${
                message.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
  }
