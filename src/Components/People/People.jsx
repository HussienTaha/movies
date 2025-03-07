import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPerson, setHoveredPerson] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer VITE_API_TOKEN'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          setLoading(false);
          return;
        }
        const data = await response.json();
        setPeople(data.results);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading)
    return <div className="text-center h-screen py-12 text-xl text-white">Loading...</div>;

  return (
    <div className="bg-dark-blue text-white px-4 py-10">
      <h1 className="text-3xl mb-8 pb-4 border-b border-border-dark">
        Popular People
      </h1>
      <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-screen-xl mx-auto">
        {people.map((person) => (
          <div
            key={person.id}
            className="relative"
            onMouseEnter={() => setHoveredPerson(person.id)}
            onMouseLeave={() => setHoveredPerson(null)}
          >
            <Link
              to={`/person/${person.id}`}
              className="relative group duration-500 hover:scale-105 block"
            >
              <div className="relative rounded-lg border-2 border-transparent hover:border-white">
                <img
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.name}
                  className="w-full h-auto block rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
                  }}
                />
                <div
                  className={`absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center transition-opacity duration-500 ${
                    hoveredPerson === person.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-white text-center p-4">
                    <p className="mb-2">View Profile</p>
                  </div>
                </div>
              </div>
              <h3 className="mt-2 text-center text-base">{person.name}</h3>
              <p className="text-center text-sm text-gray-400">
                {person.known_for_department}
              </p>
              <p className="text-center text-xs text-gray-500">
                Known for: {person.known_for?.[0]?.title || person.known_for?.[0]?.name || ""}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;