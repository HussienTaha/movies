import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../Usercontext/Usercontext";
export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
const{setToken}=useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(
          6,
          "Password must be at least 6 characters and start with an uppercase letter"
        )
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      phone: Yup.string()
        .matches(
          /^(\+20|0)1[0-9]{9}$/,
          "Phone number must be a valid Egyptian number"
        )
        .required("Phone number is required"),
    }),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (data.message === "success") {
        navigate("/");
        setToken(data.token)
      }
    } catch (error) {
      setErrorMsg("Email already exists");
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="max-w-md w-full p-8 bg-black bg-opacity-80 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1E799D]">
          Register
        </h2>
        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
        )}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            {...formik.getFieldProps("name")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-400 text-sm">{formik.errors.name}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-sm">{formik.errors.email}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-sm">{formik.errors.password}</p>
          )}
          <input
            type="password"
            name="rePassword"
            placeholder="Confirm Password"
            {...formik.getFieldProps("rePassword")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-400 text-sm">{formik.errors.rePassword}</p>
          )}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            {...formik.getFieldProps("phone")}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-400 text-sm">{formik.errors.phone}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#1E799D] transition duration-300 hover:bg-[#65767d] text-white font-semibold py-3 rounded-md flex justify-center items-center"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Register"}
          </button>
          <button className="hover:text-[#65767d] transition duration-300"><Link  to={"/login"}> go to login page</Link></button>
        </form>
      </div>
    </div>
  );
}
