const DestinationHeader = ({ count }) => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Explore All Destinations
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Find your perfect travel experience from our curated collection
      </p>

      <p className="mt-4 text-sm text-gray-500">
        Showing {count} destinations
      </p>
    </div>
  );
};

export default DestinationHeader;