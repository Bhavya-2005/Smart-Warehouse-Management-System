import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleRegister = async () => {

    if (!formData.password) {

      alert("Password is required");

      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:8081/api/auth/register",
        formData
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDE */}
      <div className="w-[35%] bg-gradient-to-b from-indigo-700 via-blue-600 to-cyan-500 text-white p-12 flex flex-col justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-indigo-700 text-3xl font-black">
              N
            </div>

            <div>

              <h1 className="text-4xl font-black">
                NovaMart
              </h1>

              <p className="text-lg text-blue-100">
                Inventory Management
              </p>

            </div>

          </div>

          <div className="mt-20">

            <h1 className="text-5xl font-black leading-tight">
              New associate setup
            </h1>

            <p className="text-2xl text-blue-100 mt-6 leading-relaxed">

              Complete all steps to activate your enterprise
              inventory account.

            </p>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-[65%] bg-white p-16 overflow-y-auto">

        <div className="flex justify-between items-center">

          <h1 className="text-5xl font-black text-gray-800">
            Register Enterprise Account
          </h1>

          <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-2xl text-xl font-bold">
            Step {step} of 3
          </div>

        </div>

        {/* STEP 1 */}
        {step === 1 && (

          <div className="mt-16">

            <h2 className="text-3xl font-black text-blue-700">
              Personal Information
            </h2>

            <div className="grid grid-cols-2 gap-8 mt-10">

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="First Name"
                className="h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Work Email"
                className="h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl"
              />

              <input
                type="text"
                placeholder="Employee ID"
                className="h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl"
              />

            </div>

            <button
              onClick={() => {

                if (
                  !formData.full_name ||
                  !formData.email
                ) {

                  alert("Please fill all required fields");

                  return;
                }

                setStep(2);

              }}
              className="mt-16 w-full h-20 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-2xl font-bold"
            >

              Continue to Step 2 →

            </button>

          </div>

        )}

        {/* STEP 2 */}
        {step === 2 && (

          <div className="mt-16">

            <h2 className="text-3xl font-black text-blue-700">
              Role & Assignment
            </h2>

            <div className="grid grid-cols-3 gap-8 mt-10">

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="h-20 rounded-2xl bg-gray-900 text-white px-6 text-xl"
              >

                <option value="">Select Role</option>

                <option value="Warehouse Manager">
                  Warehouse Manager
                </option>

                <option value="Inventory Analyst">
                  Inventory Analyst
                </option>

                <option value="Operations Lead">
                  Operations Lead
                </option>

              </select>

              <input
                type="text"
                placeholder="Warehouse ID"
                className="h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl"
              />

              <select className="h-20 rounded-2xl bg-gray-900 text-white px-6 text-xl">

                <option>Inventory</option>
                <option>Supply Chain</option>
                <option>Operations</option>

              </select>

            </div>

            <div className="flex gap-6 mt-16">

              <button
                onClick={() => setStep(1)}
                className="w-60 h-20 rounded-2xl bg-gray-300 text-2xl font-bold"
              >

                ← Back

              </button>

              <button
                onClick={() => {

                  if (!formData.role) {

                    alert("Please select role");

                    return;
                  }

                  setStep(3);

                }}
                className="flex-1 h-20 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-2xl font-bold"
              >

                Continue to Step 3 →

              </button>

            </div>

          </div>

        )}

        {/* STEP 3 */}
        {step === 3 && (

          <div className="mt-16">

            <h2 className="text-3xl font-black text-blue-700">
              Security Setup
            </h2>

            <div className="grid grid-cols-2 gap-8 mt-10">

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create Password"
                className="h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="h-20 rounded-2xl bg-gray-900 text-white px-8 text-2xl"
              />

            </div>

            <div className="flex gap-6 mt-16">

              <button
                onClick={() => setStep(2)}
                className="w-60 h-20 rounded-2xl bg-gray-300 text-2xl font-bold"
              >

                ← Back

              </button>

              <button
                onClick={handleRegister}
                className="flex-1 h-20 rounded-2xl bg-green-600 text-white text-2xl font-bold"
              >

                Create Account

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Register;