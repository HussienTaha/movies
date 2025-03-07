import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Usercontext/Usercontext";
import { MdPerson } from "react-icons/md";

export default function Navpar() {
  const { isLogin, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showTvShowsDropdown, setShowTvShowsDropdown] = useState(false);

  const handleLogout = () => {
    setToken(null); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown(!showMoviesDropdown);
    setShowTvShowsDropdown(false); // Close the other dropdown
  };

  const toggleTvShowsDropdown = () => {
    setShowTvShowsDropdown(!showTvShowsDropdown);
    setShowMoviesDropdown(false); // Close the other dropdown
  };

  return (
    <nav className="bg-amber- font-normal text-[16px]  text-white pt-1">
      <div className="flex  flex-wrap items-center justify-between mx-auto lg:justify-normal">
        {/* Menu Button for Mobile */}
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex g items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className="hidden w-full lg:block lg:w-auto" id="navbar-dropdown">
          <ul className="font-normal flex lg:items-center flex-col lg:p-0 gap-0.5 rounded-lg lg:flex-row">
            {/* Show these links only when logged in */}
            {isLogin && (
              <>
                <li className="hover:bg-[#1E799D] duration-500 w-full lg:p-0 p-2 lg:ms-4">
                  <Link to="/" className="block px-4 py-2 hover:bg-[#419FC1] duration-500">
                    noxe
                  </Link>
                </li>
                <li>
                  <Link to="/" className="block px-4 py-2 hover:bg-[#419FC1] duration-500">
                    Home
                  </Link>
                </li>

                {/* Movies Dropdown */}
                <li className="relative">
                  <button
                    onClick={toggleMoviesDropdown}
                    className="flex items-center lg:py-2 duration-500 hover:bg-[#1E799D] p-2 lg:px-2 font-normal text-white"
                  >
                    Movies
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {showMoviesDropdown && (
                    <div className="z-10 absolute font-normal bg-[#6C757D] rounded-lg shadow-sm w-44">
                      <ul className="py-2 text-sm text-white">
                        <li>
                          <Link to="upcomingmovies" className="block px-4 py-2 hover:bg-[#419FC1] duration-500">
                            Upcoming
                          </Link>
                        </li>
                        <li>
                          <Link to="toprate" className="block px-4 py-2 hover:bg-[#419FC1] duration-500">
                            TopRated
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>

                {/* Tv Shows Dropdown */}
                <li className="relative">
                  <button
                    onClick={toggleTvShowsDropdown}
                    className="flex items-center w-max lg:py-2 duration-500 hover:bg-[#1E799D] p-2 lg:px-2 font-normal text-white"
                  >
                    TV Shows
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {showTvShowsDropdown && (
                    <div className="z-10 absolute font-normal bg-[#6C757D] rounded-lg shadow-sm w-44">
                      <ul className="py-2 text-sm text-white">
                        <li>
                          <Link to="toprate" className="block px-4 py-2 hover:bg-[#419FC1] duration-500">
                            TopRated
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>

                <li>
                  <Link to="people" className="block px-4 py-2 hover:bg-[#419FC1] duration-500">
                    People
                  </Link>
                </li>
              </>
            )}

            {/* Show these links only when logged out */}
            {!isLogin && (
              <>
               <div className="lg:right-3 lg:top-0 lg:absolute">
                <div className="lg:flex ms-auto items-center">
                <li className="  lg:w-full max-w-[15rem] lg:me-2">
                  <Link to="/login">
                    <button className="text-white w-full bg-[#1E799D] hover:bg-[#19536E] px-4 py-2 rounded-lg">
                      Login
                    </button>
                  </Link>
                </li>
                <li className="lg:w-full max-w-[15rem] lg:ms-2">
                  <Link to="/register">
                    <button className="text-white w-full bg-[#1E799D] hover:bg-[#19536E] px-4 py-2 rounded-lg">
                      Register
                    </button>
                  </Link>
                </li>
                </div>
               </div>
              </>
            )}

            {/* Show logout button and icon when logged in */}
            {isLogin && (
              <div className="lg:right-0 lg:top-0 lg:absolute">
                <div className="lg:flex ms-auto items-center">
                  <li className="lg:w-full max-w-[15rem] lg:ms-2">
                    <button
                      onClick={handleLogout}
                      className="text-white w-full bg-[#1E799D] hover:bg-gray-400 duration-300 px-4 py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <span className="block text-[#1E799D]">
                      <MdPerson size={40} />
                    </span>
                  </li>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}