import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const DestinationCard = ({ destination }) => {
  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
  } = destination;

  return (
    <div className="group overflow-hidden rounded-md bg-white transition duration-300 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Rating */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-semibold shadow">
          4.5 <FaStar className="text-black" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 p-3">
        
        {/* Country */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <LuMapPin size={14} />
          <span>{country}</span>
        </div>

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {destinationName}
            </h2>

            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <FaRegCalendar size={13} />
              <span>{duration}</span>
            </div>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-bold text-gray-900">
              ${price}
            </h3>
            <p className="text-xs text-gray-400">/Person</p>
          </div>
        </div>

        {/* Button */}
        <Link href={`/destinations/${_id}`}>
          <Button
            variant="light"
            className="mt-2 px-0 text-xs font-semibold text-cyan-600"
          >
            BOOK NOW <FiExternalLink />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;