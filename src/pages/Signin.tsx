import React, { useState } from "react";
import { ArrowLeftIcon, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ArrowLeft from "../components/arrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import axios from "axios";

const apiUrl = "http://localhost:8000";

const Signin = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  // const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const generateUsername = () => {
    const generatedUsername =
      formData.first_name[0].toLowerCase() + formData.last_name.toLowerCase();
    setUsername(generatedUsername);
  };
  const [error, setError] = useState<string>("");

  // Handle form submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${apiUrl}/api/users/`,
        {
          email: formData.email,
          phone: formData.phoneNumber,
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(signInSuccess(formData));
    } catch (error) {
      setError("error");
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto  bg-black  p-10 ">
        <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md relative">
          <ArrowLeft />
          <div className="flex justify-center mb-8 border-b border-gray-800 pb-4">
            <h2 className="text-lg font-semibold text-white">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                placeholder="first name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                placeholder="last name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password{" "}
              </label>
              <input
                type="password"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                placeholder="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                placeholder="+251900000000"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                placeholder="user@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg"
            >
              Login
            </button>
          </form>
          <p className="mt-5">
            Don`t have an account?{" "}
            <span className="text-orange-800">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
