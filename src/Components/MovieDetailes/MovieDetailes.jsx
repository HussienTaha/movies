import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedMovies from "../RelatedMovies/RelatedMovies";
import Slider from "../Slider/Slider";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setIsFavorite(storedFavorites.some((fav) => fav.id === parseInt(id)));
    } catch (err) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }

    const fetchMovieDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzkxYjFjYmY3MjZmZWMyNTAyNmJmYjE2ZjU2MDVkNiIsIm5iZiI6MTc0MDg0MjYxOC45MDcsInN1YiI6IjY3YzMyNjdhNWZkZGFiZTNlYjNmNzZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TmuZoycoIj-mYv5-lkcxa6WWtdvGhGX-j_GuNDt-T6A",
          },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.id) {
          setMovie(data);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const toggleFavorite = async () => {
    if (!movie) return;

    setIsFavorite(!isFavorite);

    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      if (isFavorite) {
        const updatedFavorites = storedFavorites.filter(
          (fav) => fav.id !== movie.id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } else {
        const updatedFavorites = [...storedFavorites, movie];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
    } catch (err) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(isFavorite ? [] : [movie])
      );
    }

    const url = "https://api.themoviedb.org/3/account/21851891/favorite";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer VITE_API_TOKEN",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movie.id,
        favorite: !isFavorite,
      }),
    };

    try {
      await fetch(url, options);
    } catch (err) {}
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-full w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-dark-blue text-white min-h-screen">
        <div className="p-10">
          <button
            onClick={() => navigate("/")}
            className="mb-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center"
          >
            ← Back to Home
          </button>
          <div className="text-white text-center p-4">
            Movie information not available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-blue text-white ">
      <div className="p-10">
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/toprate")}
            className="mb-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center"
          >
            ← Go to Movies
          </button>
          <button
            onClick={() => navigate("/")}
            className="mb-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center"
          >
            ← Back to Home
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 relative group">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/500x750?text=No+Image";
              }}
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full"
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>

          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-xl mr-2">★</span>
              <span className="text-xl">{movie.vote_average.toFixed(1)}</span>
              <span className="mx-2">|</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="mx-2">|</span>
              <span>{movie.runtime} min</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{movie.overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-400">Status</h3>
                <p>{movie.status}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">
                  Original Language
                </h3>
                <p>{movie.original_language.toUpperCase()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Budget</h3>
                <p>${movie.budget.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Revenue</h3>
                <p>${movie.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <RelatedMovies movieId={id} />
      
      </div>
    </div>
  );
}
