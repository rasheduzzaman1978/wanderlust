"use client";

import {
  Plane,
  Globe,
  ArrowUpRight,
  DollarSign,
} from "lucide-react";

import { Card } from "@heroui/react";
import { FaArrowTrendUp } from "react-icons/fa6";

const TravelStatistics = ({
  bookings,
}) => {

  const stats = [
    {
      title: "Total Bookings",

      value:
        bookings?.length || 0,

      icon: <Plane size={16} />,

      bg: "bg-cyan-100",

      color: "text-cyan-500",
    },

    {
      title: "Countries Visited",

      value: [
        ...new Set(
          bookings?.map(
            (item) =>
              item.country
          )
        ),
      ].length,

      icon: <Globe size={16} />,

      bg: "bg-green-100",

      color: "text-green-500",
    },

    {
      title: "Upcoming Trips",

      value:
        bookings?.filter(
          (item) =>
            new Date(
              item.departureDate
            ) > new Date()
        ).length,

      icon: (
        <FaArrowTrendUp size={16} />
        
      ),

      bg: "bg-orange-100",

      color: "text-orange-500",
    },

    {
      title: "Total Spent",

      value: `$${bookings
        ?.reduce(
          (total, item) =>
            total +
            Number(item.price),
          0
        )
        .toLocaleString()}`,

      icon: (
        <DollarSign size={16} />
      ),

      bg: "bg-pink-100",

      color: "text-pink-500",
    },
  ];

  return (
    <div>

      {/* Title */}
      <h2 className="text-[18px] font-medium text-gray-800 mb-4">

        Travel Statistics

      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {stats.map(
          (item, index) => (
            <Card
              key={index}
              className="
                bg-white
                border
                border-gray-200
                rounded-sm
                shadow-none
                px-5
                py-4
              "
            >

              <div className="flex items-center justify-between">

                {/* Left */}
                <div>

                  <p className="text-[11px] text-gray-400 mb-1">

                    {item.title}

                  </p>

                  <h3 className="text-[22px] font-semibold text-gray-900">

                    {item.value}

                  </h3>

                </div>

                {/* Icon */}
                <div
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    ${item.bg}
                  `}
                >

                  <div
                    className={
                      item.color
                    }
                  >
                    {item.icon}
                  </div>

                </div>

              </div>

            </Card>
          )
        )}

      </div>
    </div>
  );
};

export default TravelStatistics;