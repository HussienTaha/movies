import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Cartmovies from "../Cartmovies/Cartmovies";
import Relatedmovies from "../RelatedMovies/RelatedMovies";
import { p } from "framer-motion/m";

export default function Trendingmovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMovies() {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
      );
      setMovies(data.results.slice(0, 15)); // Limit to 10 movies
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {/* Section Title */}
      <div className="col-span-4">
        <div className="text-white px-6 max-w-screen-lg mx-auto mt-8">
          <div className="w-16 border-t border-gray-500 mb-2"></div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Trending <br />
            <span className="block">Movies</span>
            <span className="block">to watch now</span>
          </h2>
          <p className="text-gray-400 mt-2 text-lg">
            Most watched movies by day
          </p>
          <div className="w-full border-t border-gray-500 mt-4"></div>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto mt-6">
        {loading
          ? // Show skeleton loaders while loading
            [...Array(10)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 h-64 rounded-lg animate-pulse"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 }}
              ></motion.div>
            ))
          : // Show actual movies when loaded
            movies.map((p) => <Cartmovies key={p.id} movie={p}  /> , <Relatedmovies key={p.id} relate={p} />)}
      </div>
    </div>
  );
}
