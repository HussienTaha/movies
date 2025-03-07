import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import { motion } from "framer-motion"; // Animation library

export default function Notfound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 404 Message */}
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-400 mt-2">The page you are looking for doesn't exist.</p>

      {/* Home Button */}
      <Link to="/" className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition">
        Go Home
      </Link>
    </motion.div>
  );
}
