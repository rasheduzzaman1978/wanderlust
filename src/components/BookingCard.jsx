"use client";

import { DateField, Button } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
  const [date, setDate] = useState(
    today(getLocalTimeZone())
  );

  const handleBooking = async () => {

    const bookingData = {
      destinationId: destination._id,
      destinationName: destination.destinationName,
      country: destination.country,
      imageUrl: destination.imageUrl,
      price: destination.price,
      departureDate: date.toString(),
      bookedAt: new Date(),
    };

    try {

      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Booking Successful");
      }

    } catch (error) {
      console.log(error);
      toast.error("Booking Failed");
    }
  };

  return (
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">

      <p className="text-sm text-gray-400">
        Starting from
      </p>

      <h2 className="mt-1 text-4xl font-bold text-cyan-600">
        ${destination.price}
      </h2>

      <p className="text-sm text-gray-400">
        per person
      </p>

      {/* Date Field */}
      <div className="mt-6">
        <DateField
          label="Departure Date"
          value={date}
          onChange={setDate}
          minValue={today(getLocalTimeZone())}
        />
      </div>

      {/* Button */}
      <Button
        onPress={handleBooking}
        className="mt-6 w-full bg-cyan-500 font-semibold text-white"
      >
        Book Now
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
  );
};

export default BookingCard;