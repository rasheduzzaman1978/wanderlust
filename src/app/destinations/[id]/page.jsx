"use client";

import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { DateField, Button, Label } from "@heroui/react";
import {
  today,
  getLocalTimeZone,
} from "@internationalized/date";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useParams } from "next/navigation";

const DestinationDetailsPage = () => {

  const params = useParams();

  // ======================================================
  // STATES
  // ======================================================
  const [destination, setDestination] = useState(null);

  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(
    today(getLocalTimeZone())
  );

  // ======================================================
  // FETCH DESTINATION
  // ======================================================
  useEffect(() => {

    const fetchDestination = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/destination/${params.id}`
        );

        const data = await res.json();

        // Invalid Destination
        if (!data || !data._id) {
          throw new Error("Destination not found");
        }

        setDestination(data);

      } catch (err) {

        setError(err.message);
      }
    };

    fetchDestination();

  }, [params.id]);

  // ======================================================
  // ERROR PAGE
  // ======================================================
  if (error) {
    throw new Error(error);
  }

  // ======================================================
  // LOADING
  // ======================================================
  if (!destination) {

    return (
      <div className="flex min-h-screen items-center justify-center">

        <span className="loading loading-spinner loading-lg"></span>

      </div>
    );
  }

  // ======================================================
  // DESTINATION DATA
  // ======================================================
  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
  } = destination;

  // ======================================================
  // HANDLE BOOKING
  // ======================================================
  const handleBooking = async () => {

    try {

      // ==========================================
      // CHECK EXISTING BOOKINGS
      // ==========================================
      const bookingRes = await fetch(
        "http://localhost:5000/bookings"
      );

      const existingBookings = await bookingRes.json();

      // ==========================================
      // FIND SAME DESTINATION
      // ==========================================
      const alreadyBooked =
        existingBookings.find(
          booking =>
            booking.destinationId === _id
        );

      // ==========================================
      // IF ALREADY BOOKED
      // ==========================================
      if (alreadyBooked) {

        toast.error(
          "You already booked this destination"
        );

        return;
      }

      // ==========================================
      // BOOKING DATA
      // ==========================================
      const bookingData = {

        destinationId: _id,

        destinationName,

        country,

        imageUrl,

        price,

        departureDate:
          selectedDate.toString(),

        bookedAt: new Date(),
      };

      // ==========================================
      // SAVE BOOKING
      // ==========================================
      const res = await fetch(
        "http://localhost:5000/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            bookingData
          ),
        }
      );

      const data = await res.json();

      // ==========================================
      // SUCCESS
      // ==========================================
      if (data.insertedId) {

        toast.success(
          <span>
            Your trip to{" "}
            <strong>{destinationName}</strong>{" "}
            is confirmed
          </span>
        );
      }

    } catch (error) {

      console.log(error);

      toast.error("Booking Failed");
    }
  };

  // ======================================================
  // MAIN UI
  // ======================================================
  return (
    <>
      {/* TOASTER */}
      <Toaster position="top-center" />

      <div className="mx-auto max-w-7xl px-5 py-8">

        {/* Top Actions */}
        <div className="mb-4 flex items-center justify-end gap-3">

          <EditModal destination={destination} />

          <DeleteAlert destination={destination} />

        </div>

        {/* Hero Image */}
        <div className="overflow-hidden rounded-xl shadow-lg">

          <Image
            className="h-[450px] w-full object-cover"
            alt={destinationName || "Destination Image"}
            src={imageUrl || "/placeholder.jpg"}
            height={700}
            width={1400}
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 400px"
          />

        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Side */}
          <div className="lg:col-span-2">

            {/* Location */}
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">

              <LuMapPin />

              <span>{country}</span>

            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">

              {destinationName}

            </h1>

            {/* Rating + Duration */}
            <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-gray-600">

              <div className="flex items-center gap-1 text-green-600">

                <FaStar />

                <span className="font-semibold">
                  4.9
                </span>

                <span>(234 reviews)</span>

              </div>

              <div className="flex items-center gap-2">

                <FaRegCalendar />

                <span>{duration}</span>

              </div>
            </div>

            {/* Overview */}
            <div className="mt-10">

              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Overview
              </h2>

              <p className="leading-8 text-gray-600">
                {description}
              </p>

            </div>

            {/* Highlights */}
            <div className="mt-10">

              <h2 className="mb-5 text-2xl font-bold text-gray-900">
                Highlights
              </h2>

              <div className="grid grid-cols-1 gap-4 text-gray-600 md:grid-cols-2">

                <div className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <p>Luxury hotel accommodation</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <p>Visit famous tourist attractions</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <p>Professional local guide service</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <p>Free airport pickup & drop</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <p>Traditional local food experience</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✔</span>
                  <p>24/7 customer support</p>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side Booking Card */}
          <div>

            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">

              <p className="text-sm text-gray-400">
                Starting from
              </p>

              <h2 className="mt-1 text-4xl font-bold text-cyan-600">

                ${price}

              </h2>

              <p className="text-sm text-gray-400">
                per person
              </p>

              {/* Date Picker */}
              <div className="mt-6">

                <DateField className="w-[256px]" name="date">

                  <Label>Date</Label>

                  <DateField.Group>

                    <DateField.Input>
                      {(segment) => (
                        <DateField.Segment segment={segment} />
                      )}
                    </DateField.Input>

                  </DateField.Group>

                </DateField>

              </div>

              {/* Button */}
              <Button
                aria-label="Book Now"
                onPress={handleBooking}
                className="mt-6 w-full bg-cyan-500 font-semibold text-white"
              >

                <span>Book Now</span>

                <span>
                  <FaArrowRight />
                </span>

              </Button>

              {/* Extra Info */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">

                <div className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  <span>Free cancellation up to 7 days</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  <span>Travel insurance included</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  <span>24/7 customer support</span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationDetailsPage;