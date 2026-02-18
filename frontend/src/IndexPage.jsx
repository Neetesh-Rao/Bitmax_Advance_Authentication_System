import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function IndexPage() {
  const navigate = useNavigate()
  const handleClick=(val)=>{
    if(val === "signup")
      navigate('/register')
    else
      navigate("/login")

  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[400px] text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome
        </h1>
        <div className="flex flex-col gap-4">
          <button
          onClick={()=>handleClick("signup")}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
          <button
           onClick={()=>handleClick("login")}
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
