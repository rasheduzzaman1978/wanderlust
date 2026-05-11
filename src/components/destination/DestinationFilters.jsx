const DestinationFilters = ({
  destinations,

  selectedCategory,
  setSelectedCategory,

  selectedPrice,
  setSelectedPrice,

  sortBy,
  setSortBy,
}) => {
  return (
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

        <option value="1000to2000">
          $1000 - $2000
        </option>

        <option value="2000plus">$2000+</option>
      </select>

      {/* Sorting */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-cyan-500"
      >
        <option value="">Sort By</option>

        <option value="lowToHigh">
          Price: Low to High
        </option>

        <option value="highToLow">
          Price: High to Low
        </option>

        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default DestinationFilters;