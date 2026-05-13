"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";

// ======================================================
// CANCEL ALERT COMPONENT
// ======================================================
function BookingCancelAlert({ bookingId, onDelete }) {

  const handleCancelBooking = async () => {

    try {

      const res = await fetch(
        `http://localhost:5000/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      // ======================================================
      // SUCCESS
      // ======================================================
      if (data.deletedCount > 0) {

        toast.success("Booking Cancelled");

        onDelete(bookingId);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed To Cancel Booking");
    }
  };

  return (
    <AlertDialog>

      {/* Open Button */}
      <Button
        className="rounded-md border border-red-300 px-5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
        variant="outline"
      >
        <TrashBin />
        Cancel
      </Button>

      {/* Modal */}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>

          <AlertDialog.Dialog className="sm:max-w-[400px]">

            <AlertDialog.CloseTrigger />

            {/* Header */}
            <AlertDialog.Header>

              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Cancel Booking?
              </AlertDialog.Heading>

            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body>
              Are you sure you want to cancel this booking permanently?
            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer>

              <Button
                slot="close"
                variant="tertiary"
              >
                Close
              </Button>

              <Button
                onClick={handleCancelBooking}
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

