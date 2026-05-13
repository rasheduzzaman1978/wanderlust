"use client";

import DestinationCard from "@/components/destination/DestinationCard";

import DestinationFilters from "@/components/destination/DestinationFilters";

import DestinationHeader from "@/components/destination/DestinationHeader";

import useDestinations from "@/hooks/useDestinations";

const DestinationPage = () => {

  const {

    destinations,

    filteredDestinations,

    selectedCategory,
    setSelectedCategory,

    selectedPrice,
    setSelectedPrice,

    sortBy,
    setSortBy,

  } = useDestinations();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">

      {/* Header */}
      <DestinationHeader
        count={
          filteredDestinations.length
        }
      />

      {/* Filters */}
      <div className="mb-10">

        <DestinationFilters

          destinations={
            destinations
          }

          selectedCategory={
            selectedCategory
          }

          setSelectedCategory={
            setSelectedCategory
          }

          selectedPrice={
            selectedPrice
          }

          setSelectedPrice={
            setSelectedPrice
          }

          sortBy={sortBy}

          setSortBy={setSortBy}

        />

      </div>

      {/* Empty State */}
      {filteredDestinations.length === 0 && (

        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">

          <h2 className="text-3xl font-bold text-gray-700">

            No Destinations Found

          </h2>

          <p className="mt-2 text-gray-500">

            Try changing your filters

          </p>

        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        {filteredDestinations.map(
          (destination) => (

            <DestinationCard
              key={
                destination._id
              }
              destination={
                destination
              }
            />
          )
        )}

      </div>
    </div>
  );
};

export default DestinationPage;