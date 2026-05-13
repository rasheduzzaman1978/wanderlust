"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Add Destination", path: "/add-destination" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Left Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm font-medium transition ${
                  isActive
                    ? "text-cyan-600"
                    : "text-gray-700 hover:text-cyan-600"
                }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded bg-cyan-500"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/Wanderlast.png"
            alt="Logo"
            width={140}
            height={40}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </Link>

        {/* Right Menu */}
        <div className="flex items-center gap-4">

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-2xl text-gray-700 transition hover:bg-gray-100 md:hidden"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 transition hover:text-cyan-600"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-600 transition hover:bg-cyan-500 hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">

              {/* Avatar */}
              <Link href="/profile">
                <Image
                  src={user?.image || "/default-avatar.png"}
                  alt={user?.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full border object-cover"
                />
              </Link>

              {/* User Name */}
              <span className="hidden lg:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="space-y-4 border-t border-gray-200 bg-white px-6 py-4 md:hidden">

          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-medium ${
                  isActive
                    ? "text-cyan-600"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="border-t pt-4">

            {!user ? (
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg border border-cyan-500 px-4 py-2 text-center text-sm font-medium text-cyan-600"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-3">

                <div className="flex items-center gap-3">
                  <Image
                    src={user?.image || "/default-avatar.png"}
                    alt={user?.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full border object-cover"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;