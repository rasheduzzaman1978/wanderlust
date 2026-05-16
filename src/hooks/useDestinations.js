"use client";

import { useEffect, useMemo, useState } from "react";

const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/destination",
          {
            cache: "no-store",
          }
        );

        console.log(res.status);

        const data = await res.json();

        console.log(data);

        setDestinations(
          Array.isArray(data) ? data : []
        );

      } catch (error) {
        console.log(error);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = useMemo(() => {

    let filtered = Array.isArray(destinations)
      ? [...destinations]
      : [];

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (selectedPrice === "under1000") {
      filtered = filtered.filter(
        (item) => item.price < 1000
      );
    }

    if (selectedPrice === "1000to2000") {
      filtered = filtered.filter(
        (item) =>
          item.price >= 1000 &&
          item.price <= 2000
      );
    }

    if (selectedPrice === "2000plus") {
      filtered = filtered.filter(
        (item) => item.price > 2000
      );
    }

    if (sortBy === "lowToHigh") {
      filtered.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "highToLow") {
      filtered.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortBy === "name") {
      filtered.sort((a, b) =>
        a.destinationName.localeCompare(
          b.destinationName
        )
      );
    }

    return filtered;

  }, [
    destinations,
    selectedCategory,
    selectedPrice,
    sortBy,
  ]);

  return {
    destinations,
    filteredDestinations,

    selectedCategory,
    setSelectedCategory,

    selectedPrice,
    setSelectedPrice,

    sortBy,
    setSortBy,
  };
};

export default useDestinations;