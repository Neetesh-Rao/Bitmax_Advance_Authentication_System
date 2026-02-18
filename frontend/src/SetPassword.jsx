import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function SetPasswordPage() {
      const navigate = useNavigate();
           const {email} = useParams();

    
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
    

//   const handleSetPassword = async() => {

//       try {
//       const res = await fetch("http://localhost:5000/api/auth/set-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email,password }),
//       })
//       const data = await res.json()
//      setName(data.user.name)
//         setMail(data.user.email)
//       // console.log(data.user.name, data.user.email);
      
//       if (res.ok) {
       
//         if (!password || !confirmPassword) {
          
//       toast("Please fill both fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     toast.success("Password set successfully ✅");
//      navigate("/dashboard",{
//        state: {
//       name:name   ,
//       mail:mail    
//     }
//      })
//       }
       
//       }


//      catch (err) {
//       console.log(err);
//     }
// }


const handleSetPassword = async () => {

  // ✅ Validate first
  if (!password || !confirmPassword) {
    toast.error("Please fill both fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Password set successfully ✅");

      navigate("/dashboard", {
        state: {
          user: {
            name: data.user?.name || "",
            email: email,
            phone: data.user?.phone || "",
          }
        }
      });

    } else {
      toast.error(data.message || "Something went wrong");
    }

  } catch (err) {
    console.log(err);
    toast.error("Server error");
  }
};


   
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Set Your Password
        </h2>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleSetPassword}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Set Password
          </button>

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
