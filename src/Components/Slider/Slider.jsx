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

export default function Slider() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url =
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setMovies(data.results);
          console.log(data.results);
          // console.log(data.results.id);
          
          data.results.forEach(movie => console.log(movie.id));
        
          
        } else {
          setError("No trending movies found");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  const handleMovieClick = (movie) => {
    navigate(`/moviesdetailes/${movie.id}`);
  };
  
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4 bg-gray-800 rounded-lg mx-auto max-w-5xl">
          {error}
        </div>
      ) : (
        <>
          <div className="max-w-6xl lg:max-w-11/12 h-full object-cover object-center mx-auto p-5 -mt-8 overflow-hidden">
            <div className="relative">
              <SlickSlider className="mx-5" {...sliderSettings}>
                {movies.map((movie) => (
                  <div key={movie.id} className="px-2">
                    <div
                      className="relative  rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleMovieClick(movie)}                >
                      <img
                        className="w-full h-full object-cover object-center"
                        src={`https://image.tmdb.org/t/p/original${
                          movie.backdrop_path || movie.poster_path
                        }`}
                        alt={movie.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <h3 className="text-white text-4xl font-bold mb-2">
                          {movie.title}
                        </h3>
                        <div className="flex items-center text-green-400 mb-2">
                          <span className="text-2xl">
                            User Score:&nbsp;
                            {movie.vote_average
                              ? (movie.vote_average * 10).toFixed(0)
                              : "N/A"}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </SlickSlider>
            </div>
          </div>
        </>
      )}
    </>
  );
}


