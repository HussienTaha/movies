import axios from "axios";
import React, { useEffect, useState } from "react";
import Cartmovies from "../Cartmovies/Cartmovies"; // Ensure this component is imported correctly
import Cartmoviesfrontrandintv from "../Cartmoviesfromtrandintv/Cartmoviesfrontrandintv";



export default function Toprate() {
  const [moviess, setMoviess] = useState([]);
  const [error, setError] = useState(null);

  async function getMoviess() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`,{
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer VITE_API_TOKEN",
          },
        }
      );
      setMoviess(data.results.slice(0, 20)); // Limit to 10 movies
    } catch (err) {
      console.error("Error fetching TV shows:", err.response?.data || err.message);
      setError("Failed to load trending TV shows. Please try again later.");
    }
  }

  useEffect(() => {
    getMoviess();
  }, []);

  return (
    <>
      <div className="col-span-4">
        <div className="text-white px-6 max-w-screen-lg mx-auto mt-8">
          <div className="w-16 border-t border-gray-500 mb-2"></div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            {/* Trending <br /> */}
            {/* <span className="block">TV</span> */}
            <span className="block">Toprate movies watch now</span>
          </h2>
          {/* <p className="text-gray-400 mt-2 text-lg">Most watched TV shows by day</p> */}
          <div className="w-full border-t border-gray-500 mt-4"></div>
        </div>
      </div>

      {error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        <div className="col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto mt-6">
          {moviess.map((p) => (
            <Cartmoviesfrontrandintv key={p.id} movietv={p} />
          ))}
        </div>
      )}
    </>
  );
}
