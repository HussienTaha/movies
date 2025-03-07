import { useEffect, useState } from "react";
import "./App.css";
import { initFlowbite } from "flowbite";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Notfound from "./Components/Notfound/Notfound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import People from "./Components/People/people";
import Upcomingmovies from "./Components/Upcomingmovies/Upcomingmovies";
import Toprate from "./Components/Toprate/Toprate";
import Topratetv from "./Components/Topratetv/Topratetv";
import Moviesdetailes from "./Components/MovieDetailes/MovieDetailes";
import Tvdetailes from "./Components/Tvdetailes/Tvdetailes";

import Home from "./Components/Home/Home";
// import Sliderdetailes from "./Components/Sliderdetailes/Sliderdetailes";
// import Movietvsdetailesformtv from "./Components/TvDetailes/TvDetailes";

import PersonDetails from "./Components/PersonDetailes/PersonDetailes";
import TvDetails from "./Components/TvDetailes/TvDetailes";
import MovieDetails from "./Components/MovieDetailes/MovieDetailes";
import ProtectedRoute from "./Components/PrortectedRout/ProtecredRout";
import ForgetPassword from "./Components/ForgetPassword/Forgetpassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import AuthProtected from "./Components/AuthProtected/AuthProtected";

function App() {
  const [forgotPasswordVisited, setForgotPasswordVisited] = useState(false);
  const [resetCodeVerified, setResetCodeVerified] = useState(false);
  useEffect(() => {
    initFlowbite();
  }, []);

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute>},
        { path: "*", element: <Notfound /> },
        { path: "login", element: <Login />},
        { path: "register", element: <Register /> },
        { path: "people", element:(
          <ProtectedRoute>
            <People />
          </ProtectedRoute>
        ), },
        { path: "upcomingmovies", element: <ProtectedRoute><Upcomingmovies /></ProtectedRoute> },
        { path: "toprate", element: <ProtectedRoute><Toprate /></ProtectedRoute> },
        { path: "topratetv", element: <ProtectedRoute><Topratetv /></ProtectedRoute> },
        { path: "/moviesdetailes/:id", element: <ProtectedRoute><MovieDetails /></ProtectedRoute> },
       
        { path: "/person/:id", element:<ProtectedRoute> <PersonDetails /></ProtectedRoute> },
    
        {
          path: "/tv/:id",
          element: <ProtectedRoute><TvDetails /></ProtectedRoute>,
        },
      
        {
          path: "/movie/:id",
          element:<ProtectedRoute> <MovieDetails /></ProtectedRoute>,
        },
        {
          path: "forgetpassword",
          element:<AuthProtected>
          <AuthProtected>
              <ForgetPassword
                setForgotPasswordVisited={setForgotPasswordVisited}
              />
            </AuthProtected>
        </AuthProtected>,
        },
        {
          path: "resetcode",
          element: <AuthProtected>
          {forgotPasswordVisited ? (
            <ResetCode setResetCodeVerified={setResetCodeVerified} />
          ) : (
            <Notfound />
          )}
        </AuthProtected>,
        },
        {
          path: "resetpassword",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
