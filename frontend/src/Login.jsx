import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function LoginPage() {
        const navigate = useNavigate();

  const [method, setMethod] = useState("email"); // default: email
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async() => {
  try{
         if (method === "email") {
          
        if (!email) {
        toast("Please enter your email");
        return;
      }
              const res = await fetch("http://localhost:5000/api/auth/check-user", {
             method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
              })
   if (res.ok) {
        navigate('/login-next', { state: { email } })
      }
      else{
        toast.error("User Not found");
      }
      }
     

  
         if (method === "mobile") {
              if (!phone) {
        toast("Please enter your mobile number");
        return;}
           const res = await fetch("http://localhost:5000/api/auth/check-user", {
  method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
              })
   if (res.ok) {
        navigate('/login-next', { state: { phone } })
      }else{
        toast.error("User Not found");
      }
      }
   

  }catch(err){
console.log(err);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {/* Switcher */}
        <div className="flex justify-center mb-6 gap-2">
          <button
            onClick={() => setMethod("email")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              method === "email"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setMethod("mobile")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              method === "mobile"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Mobile
          </button>
        </div>

        {/* Dynamic Form */}
        <div className="space-y-4">
          {method === "email" ? (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Proceed Login
          </button>

          {message && (
            <p
              className={`text-center mt-4 ${
                message.includes("sent") ? "text-green-600" : "text-red-600"
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
