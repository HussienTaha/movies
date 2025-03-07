import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
// import bg from "../../Images/1.jpeg";
// import bg from "../../../public/registerimge.jpg";
import { GiControlTower } from "react-icons/gi";

export default function ResetCode({ setResetCodeVerified }) {
  const navigate = useNavigate();
  const [errorMess, seterrorMess] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: async function (values) {
      try {
        setisLoading(true);
        await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        setResetCodeVerified(true);
        navigate("/resetpassword");
      } catch (error) {
        seterrorMess("Invalid reset code. Please try again.");
      } finally {
        setisLoading(false);
      }
    },
  });

  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-top -mt-16"
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <GiControlTower className="md:text-8xl sm:text-6xl text-5xl text-[#CB5884]" />
          <span className="md:text-6xl sm:text-5xl text-2xl font-bold ms-3 text-white">
            Enter Reset Code
          </span>
        </div>

        <div className="block mt-5 rounded-lg p-6 bg-[#063333ac] transition-all duration-200 hover:bg-[#042727c1]">
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto rounded-lg w-xs sm:w-lg"
          >
            <div className="mb-5">
              <input
                type="text"
                id="resetCode"
                name="resetCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resetCode}
                className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:outline-none peer"
                placeholder="Enter reset code"
                required
              />
              <label
                htmlFor="resetCode"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              ></label>
              {formik.errors.resetCode && formik.touched.resetCode && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.resetCode}
                </div>
              )}
            </div>
            {errorMess && (
              <div className="text-red-500 text-sm mb-5">{errorMess}</div>
            )}
            
            <div className="flex justify-between  items-center">
              <div className="">
              <button
              type="submit"
              className="text-white bg-[#D65B88] hover:bg-[#4680AD] duration-300 cursor-pointer focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Verify Code"}
            </button>
              </div>
              <div className="">
                <NavLink to={"/"}>
                  <button className="text-white">Back to Login</button>
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}