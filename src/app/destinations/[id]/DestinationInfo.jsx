import { FaRegCalendar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

const DestinationInfo = ({
  destination,
}) => {

  return (
    <>
      {/* LOCATION */}
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">

        <LuMapPin />

        <span>
          {destination.country}
        </span>

      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-gray-900">

        {destination.destinationName}

      </h1>

      {/* RATING */}
      <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-gray-600">

        <div className="flex items-center gap-1 text-green-600">

          <FaStar />

          <span className="font-semibold">
            4.9
          </span>

          <span>(234 reviews)</span>

        </div>

        <div className="flex items-center gap-2">

          <FaRegCalendar />

          <span>
            {destination.duration}
          </span>

        </div>

      </div>

      {/* OVERVIEW */}
      <div className="mt-10">

        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          Overview
        </h2>

        <p className="leading-8 text-gray-600">

          {destination.description}

        </p>

      </div>
    </>
  );
};

export default DestinationInfo;