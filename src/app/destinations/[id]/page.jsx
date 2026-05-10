import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();

  const {
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
    departureDate,
  } = destination;

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">

      {/* Top Actions */}
      <div className="mb-4 flex items-center justify-end gap-3">
        <EditModal destination={destination} />
        <DeleteAlert destination={destination} />
      </div>

      {/* Hero Image */}
      <div className="overflow-hidden rounded-xl shadow-lg">
        <Image
          className="h-[450px] w-full object-cover"
          alt={destinationName}
          src={imageUrl}
          height={700}
          width={1400}
        />
      </div>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Left Side */}
        <div className="lg:col-span-2">

          {/* Location */}
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <LuMapPin />
            <span>{country}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">
            {destinationName}
          </h1>

          {/* Rating + Duration */}
          <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-gray-600">

            <div className="flex items-center gap-1 text-green-600">
              <FaStar />
              <span className="font-semibold">4.9</span>
              <span>(234 reviews)</span>
            </div>

            <div className="flex items-center gap-2">
              <FaRegCalendar />
              <span>{duration}</span>
            </div>
          </div>

          {/* Overview */}
          <div className="mt-10">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Overview
            </h2>

            <p className="leading-8 text-gray-600">
              {description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-10">
            <h2 className="mb-5 text-2xl font-bold text-gray-900">
              Highlights
            </h2>

            <div className="grid grid-cols-1 gap-4 text-gray-600 md:grid-cols-2">

              <div className="flex items-start gap-2">
                <span className="mt-1 text-green-500">✔</span>
                <p>Luxury hotel accommodation</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 text-green-500">✔</span>
                <p>Visit famous tourist attractions</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 text-green-500">✔</span>
                <p>Professional local guide service</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 text-green-500">✔</span>
                <p>Free airport pickup & drop</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 text-green-500">✔</span>
                <p>Traditional local food experience</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 text-green-500">✔</span>
                <p>24/7 customer support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Booking Card */}
        <div>

          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">

            <p className="text-sm text-gray-400">
              Starting from
            </p>

            <h2 className="mt-1 text-4xl font-bold text-cyan-600">
              ${price}
            </h2>

            <p className="text-sm text-gray-400">
              per person
            </p>

            {/* Departure Date */}
            <div className="mt-6 rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-500">
                Departure Date
              </p>

              <h3 className="mt-1 font-semibold text-gray-800">
                {departureDate}
              </h3>
            </div>

            {/* Button */}
            <button className="mt-6 w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600">
              Book Now
            </button>

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
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;