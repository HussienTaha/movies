import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedTvShows from "../RelatedTvShows/RelatedTvShows";

export default function TvDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tvShow, setTvShow] = useState(null);
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

    const fetchTvDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer VITE_API_TOKEN",
          },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.id) {
          setTvShow(data);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchTvDetails();
  }, [id]);

  const toggleFavorite = async () => {
    if (!tvShow) return;

    setIsFavorite(!isFavorite);

    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      if (isFavorite) {
        const updatedFavorites = storedFavorites.filter(
          (fav) => fav.id !== tvShow.id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } else {
        const updatedFavorites = [...storedFavorites, tvShow];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
    } catch (err) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(isFavorite ? [] : [tvShow])
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
        media_type: "tv",
        media_id: tvShow.id,
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!tvShow) {
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
            TV show information not available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-blue text-white">
      <div className="p-10">
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/topratedtv")}
            className="mb-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center"
          >
            ← Go to TV Shows
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
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
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
            <h1 className="text-3xl font-bold mb-2">{tvShow.name}</h1>

            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-xl mr-2">★</span>
              <span className="text-xl">{tvShow.vote_average.toFixed(1)}</span>
              <span className="mx-2">|</span>
              <span>{new Date(tvShow.first_air_date).getFullYear()}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {tvShow.genres.map((genre) => (
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
              <p className="text-gray-300">{tvShow.overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-400">Status</h3>
                <p>{tvShow.status}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">
                  Original Language
                </h3>
                <p>{tvShow.original_language.toUpperCase()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">
                  Number of Seasons
                </h3>
                <p>{tvShow.number_of_seasons}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">
                  Number of Episodes
                </h3>
                <p>{tvShow.number_of_episodes}</p>
              </div>
            </div>
          </div>
        </div>

        <RelatedTvShows tvShowId={id} />
      </div>
    </div>
  );
}
