import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";


export default function DashboardPage() {
  const navigate = useNavigate(); 
  const location=useLocation();
  // const email=location.state.email;
  //   const phone=location.state.phone;

const user = location.state?.user;
console.log(user);


  const [message, setMessage] = useState("");

  const handleLogout = () => {
 
    toast.success("Logged out successfully ✅");

   navigate("/", 
    setTimeout(() => {
    }, 1000))
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mb-6">Welcome to your dashboard!</p>
  <div className="mb-6 text-left space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>

        {message && (
          <p className="mt-4 text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
}
