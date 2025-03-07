import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function PersonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const personUrl = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
        const creditsUrl = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`;

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzkxYjFjYmY3MjZmZWMyNTAyNmJmYjE2ZjU2MDVkNiIsIm5iZiI6MTc0MDg0MjYxOC45MDcsInN1YiI6IjY3YzMyNjdhNWZkZGFiZTNlYjNmNzZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TmuZoycoIj-mYv5-lkcxa6WWtdvGhGX-j_GuNDt-T6A",
          },
        };

        const [personResponse, creditsResponse] = await Promise.all([
          fetch(personUrl, options),
          fetch(creditsUrl, options),
        ]);

        if (!personResponse.ok || !creditsResponse.ok) {
          setLoading(false);
          return;
        }

        const personData = await personResponse.json();
        const creditsData = await creditsResponse.json();

        setPerson(personData);

        const sortedCredits = creditsData.cast
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 12);

        setCredits(sortedCredits);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-full w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!person) {
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
            Person information not available
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
            onClick={() => navigate(-1)}
            className="mb-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="mb-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center"
          >
            ← Back to Home
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/500x750?text=No+Image";
              }}
            />
          </div>

          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{person.name}</h1>

            <div className="mb-4">
              <span>{person.known_for_department}</span>
              {person.birthday && (
                <>
                  <span className="mx-2">|</span>
                  <span>
                    Born: {new Date(person.birthday).toLocaleDateString()}
                  </span>
                </>
              )}
              {person.place_of_birth && (
                <>
                  <span className="mx-2">|</span>
                  <span>{person.place_of_birth}</span>
                </>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Biography</h2>
              <p className="text-gray-300">
                {person.biography || "No biography available."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-400">Gender</h3>
                <p>
                  {person.gender === 1
                    ? "Female"
                    : person.gender === 2
                    ? "Male"
                    : "Other"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Popularity</h3>
                <p>{person.popularity.toFixed(1)}</p>
              </div>
              {person.also_known_as && person.also_known_as.length > 0 && (
                <div className="col-span-2">
                  <h3 className="font-semibold text-gray-400">Also Known As</h3>
                  <p>{person.also_known_as.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {credits.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 border-b border-border-dark pb-2">
              Known For
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {credits.map((credit) => (
                <Link
                  key={credit.id}
                  to={
                    credit.media_type === "movie"
                      ? `/movie/${credit.id}`
                      : `/tv/${credit.id}`
                  }
                  className="block hover:scale-105 transition-transform duration-300"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                      alt={credit.title || credit.name}
                      className="w-full h-auto"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/500x750?text=No+Image";
                      }}
                    />
                  </div>
                  <h3 className="mt-2 text-sm text-center">
                    {credit.title || credit.name}
                  </h3>
                  <p className="text-xs text-center text-gray-400">
                    {credit.character ? `as ${credit.character}` : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
