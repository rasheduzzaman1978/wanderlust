"use client";

import { useEffect, useState } from "react";

import DestinationCard from "./DestinationCard";

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/destination"
        );

        const data = await res.json();

        setDestinations(data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14">

      {/* Heading */}
      <div className="mb-10 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Destinations
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Handpicked travel experiences for adventure seekers
          </p>
        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        {destinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            destination={destination}
          />
        ))}

      </div>
    </section>
  );
};

export default FeaturedDestinations;