"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookingsPage = () => {

  // ==========================================
  // STATES
  // ==========================================
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================
  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/bookings"
        );

        const data = await res.json();

        setBookings(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchBookings();

  }, []);

  // ==========================================
  // CANCEL BOOKING
  // ==========================================
  const handleCancelBooking = async (id) => {

    const confirmDelete = confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:5000/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      // ==========================================
      // REMOVE FROM UI
      // ==========================================
      if (data.deletedCount > 0) {

        const remainingBookings =
          bookings.filter(
            booking => booking._id !== id
          );

        setBookings(remainingBookings);

        toast.success("Booking Cancelled");
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed To Cancel Booking");
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">

        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">

      {/* Heading */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (

        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300">

          <h2 className="text-3xl font-bold text-gray-700">
            No Bookings Found
          </h2>

          <p className="mt-2 text-gray-500">
            Book your next adventure ✈️
          </p>
        </div>
      )}

      {/* Booking Cards */}
      <div className="space-y-5">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >

            {/* Left Side */}
            <div className="flex items-center gap-5">

              {/* Image */}
              <div className="relative h-32 w-48 overflow-hidden rounded-lg">

                <Image
                  src={booking.imageUrl}
                  alt={booking.destinationName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Content */}
              <div>

                {/* Status */}
                <div className="mb-3 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                  ● Confirmed
                </div>

                {/* Title */}
                <h2 className="text-4xl font-bold text-gray-900">

                  {booking.destinationName}
                </h2>

                {/* Info */}
                <div className="mt-4 space-y-2 text-sm text-gray-500">

                  <p>
                    📅 Departure: {booking.departureDate}
                  </p>

                  <p>
                    🆔 Booking ID: {booking._id.slice(-5)}
                  </p>
                </div>

                {/* Price */}
                <h3 className="mt-5 text-4xl font-bold text-cyan-500">

                  ${booking.price}
                </h3>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3 self-end">

              {/* Cancel Button */}
              <button
                onClick={() =>
                  handleCancelBooking(
                    booking._id
                  )
                }
                className="rounded-md border border-red-300 px-5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                Cancel
              </button>

              {/* View Button */}
              <Link
                href={`/destinations/${booking.destinationId}`}
              >
                <button className="rounded-md bg-cyan-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-cyan-600">

                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;