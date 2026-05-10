"use client";

import { useEffect, useMemo, useState } from "react";
import DestinationCard from "@/components/DestinationCard";

const DestinationPage = () => {
  const [destinations, setDestinations] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch Data
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("http://localhost:5000/destination");
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDestinations();
  }, []);

  // Filter + Sort Logic
  const filteredDestinations = useMemo(() => {
    let filtered = [...destinations];

    // Category Filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Price Filter
    if (selectedPrice === "under1000") {
      filtered = filtered.filter((item) => item.price < 1000);
    }

    if (selectedPrice === "1000to2000") {
      filtered = filtered.filter(
        (item) => item.price >= 1000 && item.price <= 2000
      );
    }

    if (selectedPrice === "2000plus") {
      filtered = filtered.filter((item) => item.price > 2000);
    }

    // Sorting
    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      filtered.sort((a, b) =>
        a.destinationName.localeCompare(b.destinationName)
      );
    }

    return filtered;
  }, [destinations, selectedCategory, selectedPrice, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">

      {/* Top Section */}
      <div className="mb-10">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Explore All Destinations
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Find your perfect travel experience from our curated collection
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-cyan-500"
          >
            <option value="">All Categories</option>

            {[...new Set(destinations.map((item) => item.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>

          {/* Price Filter */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-cyan-500"
          >
            <option value="">All Prices</option>
            <option value="under1000">Under $1000</option>
            <option value="1000to2000">$1000 - $2000</option>
            <option value="2000plus">$2000+</option>
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-cyan-500"
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Count */}
        <p className="mt-4 text-sm text-gray-500">
          Showing {filteredDestinations.length} destinations
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDestinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            destination={destination}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;