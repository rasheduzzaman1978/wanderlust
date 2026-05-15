"use client";

import Link from "next/link";
import React from "react";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-4">
      
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">
        
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <FaExclamationTriangle className="text-4xl text-red-500" />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl font-extrabold text-gray-800">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-500">
          Oops! An unexpected error has occurred. Please try again or return to the homepage.
        </p>

        {/* Error Message */}
        {error?.message && (
          <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error.message}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          
          {/* Retry Button */}
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-white transition hover:bg-red-600"
          >
            <FaRedo />
            Try Again
          </button>

          {/* Home Button */}
          <Link href="/">
            <button className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100">
              <FaHome />
              Back Home
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ErrorPage;