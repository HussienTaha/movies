// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// export default function Moviesdetailes(movie) {
//   const { id } = useParams();
//   const [gamedetailess, setgamedetailess] = useState([]);
//   const [loading, setLoading] = useState(true);
//   async function moviesdetailes() {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(
//         `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
//         {
//           headers: {
//             accept: "application/json",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzkxYjFjYmY3MjZmZWMyNTAyNmJmYjE2ZjU2MDVkNiIsIm5iZiI6MTc0MDg0MjYxOC45MDcsInN1YiI6IjY3YzMyNjdhNWZkZGFiZTNlYjNmNzZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TmuZoycoIj-mYv5-lkcxa6WWtdvGhGX-j_GuNDt-T6A",
//           },
//         }
//       );

//       setgamedetailess(data.result);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       console.log("done");
//       setLoading(false);
//     }
//   }
//   useEffect(() => {
//     moviesdetailes();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//         <motion.div
//           className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1 }}
//         ></motion.div>

//         <motion.h2
//           className="mt-4 text-2xl font-bold"
//           animate={{ opacity: [0, 1, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//         >
//           Loading, Please Wait...
//         </motion.h2>

//         <motion.p
//           className="mt-2 text-gray-400"
//           animate={{ opacity: [0, 1, 0] }}
//           transition={{ repeat: Infinity, duration: 3 }}
//         >
//           Fetching the best gaming experience for you! 🎮
//         </motion.p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="max-w-screen-xl mx-auto grid grid-cols-12 mt-20  relative ">
//         <div className="col-span-12  md:col-span-4 p-4 flex ">
//         <img
//                         className="w-full h-full object-cover object-center"
//                         src={`https://image.tmdb.org/t/p/original${
//                           movie?.backdrop_path || movie?.poster_path
//                         }`}
//                         alt={movie?.title}
//       />{" "}
//           {/* <h2 className='text-center'>hussien</h2> */}
//         </div>
//         <div className="col-span-12  md:col-span-8 p-4  self-center  text-white">
//           {/* <p className="py-4"> original_name: {gamedetailess?.original_title}</p>
//           <p className="py-4"> runtime:{gamedetailess?.runtime}</p>
//           <p className="py-4">vote_average :{gamedetailess?.vote_average}</p>
//           <p className="py-4">status :{gamedetailess?.status}</p> */}
//           <p className="py-4">
//             {" "}
//             <span className="text-yellow-400">overview</span>:
//             {gamedetailess?.overview}
//           </p>
//           <div className="">
//             {/* <a href={gamedetailess?.homepage} target="_blank"> */}
//               {" "}
//               <button className=" border-2 bg-blue-600 rounded-xl hover:bg-blue-700 p-2 mt-2 border-blue-800 duration-200">
//                 showmovies{" "}
//               </button>
//             {/* </a> */}
//           </div>
          
//         </div>
//         <div className=" absolute top-4 right-0 border-2 bg-blue-950 rounded-xl hover:bg-blue-700 p-2 mt-2 border-blue-800 duration-200">
//           <Link to={"/"}><button>Back</button></Link>
//         </div>
//       </div>
//     </>
//   );
// }
