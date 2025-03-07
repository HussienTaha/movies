import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Handle Favorite Button Click
  const handleFavoriteClick = (event) => {
    event.preventDefault(); // Prevents Link navigation
    event.stopPropagation(); // Stops event bubbling
    setIsFavorite(!isFavorite);
  };
  const handleFavoriteClickk = (event) => {
    event.preventDefault(); // Prevents Link navigation
    event.stopPropagation(); // Stops event bubbling
    // setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/Moviesdetailes/${movie.id}`}>
      <div className=" relative rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-500 group bg-gray-">
        {/* Favorite Button (Hidden by Default, Shown on Hover) */}
        <button
          className="absolute top-2 left-2 right-2 bg-black bg-opacity-20 text-white px-2 py-1 rounded flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          onClick={handleFavoriteClick} // Prevent navigation
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          <FaHeart className={`ml-1 ${isFavorite ? "text-red-500" : "text-white"}`} />
        </button>

        {/* Movie Poster - Prevent Distortion */}
        <div className="w-full h-80 ">
         <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto block rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x750?text=No+Image";
                  }}
/>
        </div>

        {/* Movie Title & Rating */}
        <div className="p-4">
          <h3 className="text-center text-white">
          {movie?.title?.split(" ")?.slice(0,2)?.join(" ") || movie?.name?.split(" ")?.slice(0,2)?.join(" ") }          </h3>

          {/* Rating Badge */}
          <div  onClick={handleFavoriteClickk}  className="absolute bottom-12 left-4 bg-gray-950 border border-green-700 text-white p-2 rounded-full text-sm font-semibold group-hover:-translate-y-6 duration-700">
            {movie?.vote_average?.toFixed(2)}
           
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
