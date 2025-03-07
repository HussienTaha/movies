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

export default function RelatedTvShows({ tvShowId }) {
  const [relatedTvShows, setRelatedTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedTvShows = async () => {
      if (!tvShowId) return;
      
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/tv/${tvShowId}/similar?language=en-US&page=1`;
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
          setRelatedTvShows(data.results.slice(0, 10));
        } else {
          setError("No related TV shows found");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedTvShows();
  }, [tvShowId]);

  const handleTvShowClick = (tvShowId) => {
    navigate(`/tv/${tvShowId}`);
    // Scroll to top when navigating to a new TV show
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
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="flex justify-center  items-center h-screen">
        <div className="animate-spin rounded-full h-full w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || relatedTvShows.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 px-10 pb-10">
      <h2 className="text-2xl font-bold mb-6">Similar TV Shows You Might Like</h2>
      <div className="relative">
        <SlickSlider {...sliderSettings}>
          {relatedTvShows.map((tvShow) => (
            <div key={tvShow.id} className="px-2">
              <div
                className="relative rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleTvShowClick(tvShow.id)}
              >
                <img
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path || tvShow.backdrop_path}`}
                  alt={tvShow.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white text-lg font-bold truncate">{tvShow.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-1">★</span>
                    <span>{tvShow.vote_average ? tvShow.vote_average.toFixed(1) : "N/A"}</span>
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