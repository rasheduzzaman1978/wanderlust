// app/destinations/[id]/page.jsx

import DestinationDetailsClient from "./DestinationDetailsClient";

const DestinationDetailsPage = async ({
  params,
}) => {

  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/destination/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Destination not found"
    );
  }

  const destination =
    await res.json();

  return (
    <DestinationDetailsClient
      destination={destination}
    />
  );
};

export default DestinationDetailsPage;