"use client";

import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";

import toast, { Toaster } from "react-hot-toast";

import BookingCard from "./BookingCard";
import DestinationHero from "./DestinationHero";
import DestinationInfo from "./DestinationInfo";
import Highlights from "./Highlights";

const DestinationDetailsClient = ({
  destination,
}) => {

  const handleBooking = async (
    selectedDate
  ) => {

    try {

      const bookingRes = await fetch(
        "http://localhost:5000/bookings"
      );

      const existingBookings =
        await bookingRes.json();

      const alreadyBooked =
        existingBookings.find(
          booking =>
            booking.destinationId ===
            destination._id
        );

      if (alreadyBooked) {

        toast.error(
          "You already booked this destination"
        );

        return;
      }

      const bookingData = {

        destinationId:
          destination._id,

        destinationName:
          destination.destinationName,

        country:
          destination.country,

        imageUrl:
          destination.imageUrl,

        price:
          destination.price,

        departureDate:
          selectedDate.toString(),

        bookedAt: new Date(),
      };

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

      if (data.insertedId) {

        toast.success(
          <span>
            Your trip to{" "}
            <strong>
              {
                destination.destinationName
              }
            </strong>{" "}
            is confirmed
          </span>
        );
      }

    } catch (error) {

      console.log(error);

      toast.error("Booking Failed");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="mx-auto max-w-7xl px-5 py-8">

        {/* ACTIONS */}
        <div className="mb-4 flex items-center justify-end gap-3">

          <EditModal
            destination={destination}
          />

          <DeleteAlert
            destination={destination}
          />

        </div>

        {/* HERO */}
        <DestinationHero
          destination={destination}
        />

        {/* CONTENT */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <DestinationInfo
              destination={destination}
            />

            <Highlights />

          </div>

          {/* RIGHT */}
          <BookingCard
            destination={destination}
            handleBooking={
              handleBooking
            }
          />

        </div>
      </div>
    </>
  );
};

export default DestinationDetailsClient;