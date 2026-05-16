import { headers } from "next/headers";
import DestinationDetailsClient from "./DestinationDetailsClient";
import { auth } from "@/lib/auth";

const DestinationDetailsPage = async ({
  params,
}) => {

  const { id } = await params;

  console.log("ID:", id);

  const token = await auth.api.getToken({
    headers: await headers(),
  });

  console.log("Token:", token);

  const res = await fetch(
    `http://localhost:5000/destination/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );

  if (!res.ok) {

    const errorData = await res.json();

    console.log(errorData);

    throw new Error(
      errorData.message ||
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