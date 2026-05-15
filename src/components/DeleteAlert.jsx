"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export function DeleteAlert({ destination }) {
  const { _id, destinationName } = destination;

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/destination/${_id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Destination deleted successfully");

        setTimeout(() => {
          router.push("/destinations");
        }, 1500);
      } else {
        toast.error("Failed to delete destination");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button
        className={"rounded-none text-red-500"}
        variant="outline"
      >
        <TrashBin /> Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">

            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Delete destination permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{destinationName}</strong> and all of
                its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
              >
                Delete
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}