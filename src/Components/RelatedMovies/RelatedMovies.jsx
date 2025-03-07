import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider from "react-slick";

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="slick-arrow slick-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white z-10"
    onClick={onClick}
  >
    ❮
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="slick-arrow slick-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white z-10"
    onClick={onClick}
  >
    ❯
  </button>
);

export default function RelatedMovies({ movieId }) {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      if (!movieId) return;

      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setRelatedMovies(data.results.slice(0, 10));
        } else {
          setError("No related movies found");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedMovies();
  }, [movieId]);

  const handleMovieClick = (movieId) => {
    navigate(`/moviesdetailes/${movieId}`);

    window.scrollTo(0, 0);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-full w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || relatedMovies.length === 0) {
    return null;
  }

  return (
    <div className="mt-20 px-10 pb-10">
      <h2 className="text-2xl font-bold mb-6">Similar Movies You Might Like</h2>
      <div className="relative ">
        <SlickSlider {...sliderSettings}>
          {relatedMovies.map((movie) => (
            <div key={movie.id} className="px-2">
              <div
                className="relative rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  src={`https://image.tmdb.org/t/p/w500${
                    movie.poster_path || movie.backdrop_path
                  }`}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x750?text=No+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white text-lg font-bold truncate">
                    {movie.title}
                  </h3>
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-1">★</span>
                    <span>
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </SlickSlider>
      </div>
    </div>
  );
}
