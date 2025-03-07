import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../Usercontext/Usercontext";
// import moviesBg from "../../../public/moviesbg.jpg";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
const{setToken}=useContext(UserContext)
  async function handleLogin(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      
      if (data.message === "success") {
        navigate("/");
        setToken(data.token)      }
    } catch (error) {
      setErrorMsg("Incorrect email or password");
      setIsLoading(false);
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^[A-Z].{5,}/, "First character must be uppercase")
        .required("Password is required"),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center p-6"
      // style={{ backgroundImage: `url(${moviesBg})` }}
    >
      <div className="max-w-md w-full p-8 bg-black bg-opacity-80 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1E799D]">Movie Store Login</h2>
        {errorMsg && <p className="text-[#9d1e1e] text-sm text-center mb-4">{errorMsg}</p>}
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              name="email"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              name="password"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#1E799D] transition duration-300 hover:bg-[#65767d] text-white font-semibold py-3 rounded-md flex justify-center items-center"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Login"}
          </button>
          <NavLink
            to="/forgetpassword"
            className="block text-center text-[#1E799D] hover:-[#74868e] mt-3 text-sm"
          >
            Forgot Password?
          </NavLink>
        </form>
      </div>
    </div>
  );
}
