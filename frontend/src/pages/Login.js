import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  FaBoxes,
  FaChartLine,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {

      alert("Please enter email and password");

      return;
    }

    try {

      const res = await axios.post(
        "https://https://smart-inventory-backend-m3wf.onrender.coms/api/auth/login",
        {
          email,
          password
        }
      );

      if (res.data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        navigate("/dashboard");

      } else {

        alert("Invalid Credentials");

      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white p-16 flex flex-col justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-indigo-700 text-3xl font-black shadow-xl">
              N
            </div>

            <div>

              <h1 className="text-5xl font-black">
                NovaMart
              </h1>

              <p className="text-xl text-blue-100 mt-1">
                Smart Inventory Platform
              </p>

            </div>

          </div>

          <div className="mt-24">

            <p className="uppercase tracking-[6px] text-yellow-300 font-bold">
              Enterprise Inventory Portal
            </p>

            <h1 className="text-7xl font-black leading-tight mt-6">

              Inventory
              <br />
              Management
              <br />
              System

            </h1>

            <p className="text-2xl text-blue-100 mt-10 leading-relaxed max-w-2xl">

              Real-time inventory visibility across stores,
              warehouses, and suppliers with enterprise-grade
              analytics and intelligent stock management.

            </p>

          </div>

          <div className="flex flex-wrap gap-5 mt-12">

            <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3 text-lg">
              <FaBoxes />
              12,000+ Products
            </div>

            <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3 text-lg">
              <FaTruck />
              Smart Logistics
            </div>

            <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3 text-lg">
              <FaChartLine />
              Live Analytics
            </div>

            <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3 text-lg">
              <FaShieldAlt />
              Enterprise Security
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-white flex items-center justify-center">

        <div className="w-[70%]">

          <h1 className="text-6xl font-black text-gray-800">
            Sign In
          </h1>

          <p className="text-2xl text-gray-500 mt-4">
            Access your enterprise inventory portal
          </p>

          <div className="mt-14 space-y-8">

            <div>

              <label className="block text-2xl font-semibold mb-4 text-gray-700">
                Employee Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl outline-none"
              />

            </div>

            <div>

              <label className="block text-2xl font-semibold mb-4 text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl outline-none"
              />

            </div>

            <button
              onClick={handleLogin}
              className="w-full h-20 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-2xl font-bold hover:scale-[1.02] transition"
            >

              Sign In

            </button>

            <p className="text-center text-xl text-gray-600 mt-10">

              Don’t have an account?

              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 font-bold ml-2 cursor-pointer"
              >
                Register here
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;