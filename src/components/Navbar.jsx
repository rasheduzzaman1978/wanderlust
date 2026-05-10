import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Left Menu */}
        <ul className="hidden items-center gap-6 md:flex">
          <li>
            <Link
              href={"/"}
              className="text-sm font-medium text-gray-700 transition hover:text-cyan-600"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href={"/destinations"}
              className="text-sm font-medium text-gray-700 transition hover:text-cyan-600"
            >
              Destinations
            </Link>
          </li>

          <li>
            <Link
              href={"/my-bookings"}
              className="text-sm font-medium text-gray-700 transition hover:text-cyan-600"
            >
              My Bookings
            </Link>
          </li>

          <li>
            <Link
              href={"/add-destination"}
              className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600"
            >
              Add Destination
            </Link>
          </li>
        </ul>

        {/* Logo */}
        <Link href={"/"} className="flex items-center">
          <Image
            src={"/assets/Wanderlast.png"}
            height={120}
            width={120}
            alt="logo"
            className="object-contain"
          />
        </Link>

        {/* Right Menu */}
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href={"/profile"}
              className="text-sm font-medium text-gray-700 transition hover:text-cyan-600"
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              href={"/login"}
              className="text-sm font-medium text-gray-700 transition hover:text-cyan-600"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              href={"/signup"}
              className="rounded-full border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-600 transition hover:bg-cyan-500 hover:text-white"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;