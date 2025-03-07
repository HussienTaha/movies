import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Slider from "../Slider/Slider";
import Trendingtv from "../TrendingTv/TrendingTv";
import Title from "../Title/Title";
import Trendingmovies from "../Trendingmovies/Trendingmovies";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (API fetching)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulated delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Title />

      {/* Slider Component */}
      <div>
        <Slider />
      </div>

      {/* Movie Cards */}
      {loading ? (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Skeleton Loaders */}
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 h-64 rounded-lg animate-pulse"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            ></motion.div>
          ))}
        </motion.div>
      ) : (
        <Trendingmovies />
      )}

      {/* Trending TV Shows */}
      <Trendingtv />
    </>
  );
}
