import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Cartmovies from "../Cartmovies/Cartmovies"; // Ensure this component is imported correctly

export default function Upcomingmovies() {
  const [moviess, setMoviess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getMoviess() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer VITE_API_TOKEN",
          },
        }
      );
      setMoviess(data.results.slice(0, 10)); // Limit to 10 movies
    } catch (err) {
      console.error("Error fetching TV shows:", err.response?.data || err.message);
      setError("Failed to load trending TV shows. Please try again later.");
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  }

  useEffect(() => {
    getMoviess();
  }, []);

  return (
    <>
      {/* Section Title */}
      <div className="col-span-4">
        <div className="text-white px-6 max-w-screen-lg mx-auto mt-8">
          <div className="w-16 border-t border-gray-500 mb-2"></div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Trending <br />
            <span className="block">TV Shows</span>
            <span className="block">to watch now</span>
          </h2>
          <p className="text-gray-400 mt-2 text-lg">Most watched TV shows by day</p>
          <div className="w-full border-t border-gray-500 mt-4"></div>
        </div>
      </div>

      {/* Error Handling */}
      {error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto mt-6">
          {loading
            ? // Loading Skeleton Animation
              [...Array(10)].map((_, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 h-64 rounded-lg animate-pulse"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                ></motion.div>
              ))
            : // Render TV shows when data is ready
              moviess.map((p) => <Cartmovies key={p.id} movie={p} />)}
        </div>
      )}
    </>
  );
}
