"use client";

import {
  DateField,
  Button,
  Label,
} from "@heroui/react";

import {
  today,
  getLocalTimeZone,
} from "@internationalized/date";

import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";

const BookingCard = ({
  destination,
  handleBooking,
}) => {

  const [selectedDate, setSelectedDate] =
    useState(
      today(getLocalTimeZone())
    );

  return (
    <div>

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

        {/* DATE */}
        <div className="mt-6">

          <DateField
            className="w-[256px]"
            value={selectedDate}
            onChange={setSelectedDate}
          >

            <Label>Date</Label>

            <DateField.Group>

              <DateField.Input>
                {(segment) => (
                  <DateField.Segment
                    segment={segment}
                  />
                )}
              </DateField.Input>

            </DateField.Group>

          </DateField>

        </div>

        {/* BUTTON */}
        <Button
          aria-label="Book Now"
          onPress={() =>
            handleBooking(selectedDate)
          }
          className="mt-6 w-full bg-cyan-500 font-semibold text-white"
        >

          <span>Book Now</span>

          <span>
            <FaArrowRight />
          </span>

        </Button>

      </div>
    </div>
  );
};

export default BookingCard;