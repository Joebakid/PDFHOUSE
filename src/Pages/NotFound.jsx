// Pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="mb-4 text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
