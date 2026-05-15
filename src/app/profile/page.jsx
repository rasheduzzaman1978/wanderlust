"use client";

import UpdateUserModal from "@/components/modals/UpdateUserModal";
import TravelStatistics from "@/components/profile/TravelStatistics";

import { authClient } from "@/lib/auth-client";

import { Card } from "@heroui/react";

import {
  MapPin,
} from "lucide-react";

import Image from "next/image";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import {
  IoMdCamera,
} from "react-icons/io";

const ProfilePage = () => {

  // ======================================================
  // AUTH
  // ======================================================
  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user =
    session?.user;

  const router =
    useRouter();

  // ======================================================
  // BOOKINGS STATE
  // ======================================================
  const [
    bookings,
    setBookings,
  ] = useState([]);

  // ======================================================
  // REDIRECT
  // ======================================================
  useEffect(() => {

    if (
      !isPending &&
      !user
    ) {

      router.push(
        "/login"
      );
    }

  }, [
    isPending,
    user,
    router,
  ]);

  // ======================================================
  // FETCH BOOKINGS
  // ======================================================
  useEffect(() => {

    const fetchBookings =
      async () => {

        try {

          const res =
            await fetch(
              "http://localhost:5000/bookings"
            );

          const data =
            await res.json();

          setBookings(
            data
          );

        } catch (error) {

          console.log(
            error
          );
        }
      };

    fetchBookings();

  }, []);

  // ======================================================
  // LOADING
  // ======================================================
  if (isPending) {

    return (
      <div className="flex justify-center items-center h-screen bg-[#f5f5f5]">

        <p className="animate-pulse text-gray-500">

          Loading...

        </p>

      </div>
    );
  }

  // ======================================================
  // NO USER
  // ======================================================
  if (!user)
    return null;

  // ======================================================
  // UI
  // ======================================================
  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 md:px-5 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-8">

          <h1 className="text-3xl md:text-[42px] font-light text-[#222]">

            My Profile

          </h1>

          <p className="text-gray-500 text-sm mt-1">

            Manage your account settings and travel preferences

          </p>

        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

          {/* ====================================================== */}
          {/* LEFT PROFILE CARD */}
          {/* ====================================================== */}
          <Card className="bg-white border border-gray-200 rounded-sm shadow-none p-0 overflow-hidden">

            {/* Profile Top */}
            <div className="flex flex-col items-center py-8 px-5">

              {/* Profile Image */}
              <div className="relative">

                {/* Image Wrapper */}
                <div className="relative w-28 h-28">

                  <Image
                    src={
                      user?.image?.trim()
                        ? user.image
                        : "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={
                      user?.name ||
                      "profile"
                    }
                    fill
                    referrerPolicy="no-referrer"
                    className="
                      rounded-full
                      object-cover
                      border-4
                      border-white
                      shadow-md
                      bg-gray-100
                    "
                  />

                </div>

                {/* Camera Icon */}
                <div className="
                  absolute
                  bottom-0
                  right-0
                  w-8
                  h-8
                  rounded-full
                  bg-cyan-500
                  flex
                  items-center
                  justify-center
                  border-2
                  border-white
                  shadow
                ">

                  <IoMdCamera
                    size={14}
                    className="text-white"
                  />

                </div>

              </div>

              {/* User Info */}
              <div className="mt-4 text-center">

                <h2 className="text-[18px] font-semibold text-gray-900">

                  {
                    user?.name ||
                    "Sarah Mitchell"
                  }

                </h2>

                <div className="flex items-center justify-center gap-1 mt-1 text-gray-500 text-xs">

                  <MapPin size={12} />

                  <span>

                    San Francisco, CA

                  </span>

                </div>

              </div>

            </div>

            {/* Bottom Info */}
            <div className="px-5 py-4 border-t border-gray-100 text-sm">

              <div className="flex justify-between mb-3">

                <span className="text-gray-400">

                  Member since

                </span>

                <span className="font-semibold text-gray-800">

                  Mar 2024

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">

                  Nationality

                </span>

                <span className="font-semibold text-gray-800">

                  United States

                </span>

              </div>

            </div>

            {/* Update Button */}
            <div className="p-5 pt-0">

              <div className="bg-cyan-500 hover:bg-cyan-600 transition-all rounded-sm">

                <UpdateUserModal
                  user={user}
                />

              </div>

            </div>

          </Card>

          {/* ====================================================== */}
          {/* RIGHT SIDE */}
          {/* ====================================================== */}
          <div className="lg:col-span-2">

            <TravelStatistics
              bookings={bookings}
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;