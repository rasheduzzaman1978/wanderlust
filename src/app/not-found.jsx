import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl">
        
        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-sky-500">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <button className="flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-white transition hover:bg-sky-600">
              <FaArrowLeft />
              Back to Home
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default NotFoundPage;