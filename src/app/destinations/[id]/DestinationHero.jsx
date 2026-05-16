import Image from "next/image";

const DestinationHero = ({
  destination,
}) => {

  return (
    <div className="overflow-hidden rounded-xl shadow-lg">

      <Image
        className="h-[450px] w-full object-cover"
        alt={
          destination.destinationName
        }
        src={destination.imageUrl}
        height={700}
        width={1400}
        priority
      />

    </div>
  );
};

export default DestinationHero;