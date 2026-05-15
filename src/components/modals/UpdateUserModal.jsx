"use client";

import { useState, useEffect } from "react";

import { authClient } from "@/lib/auth-client";

import {
  Button,
  Input,
  Modal,
} from "@heroui/react";

import {
  BiSolidEdit,
  BiUser,
} from "react-icons/bi";

import toast from "react-hot-toast";

export default function UpdateUserModal({
  user,
}) {

  // ======================================================
  // STATES
  // ======================================================
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    name,
    setName,
  ] = useState("");

  const [
    image,
    setImage,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  // ======================================================
  // SET USER DATA
  // ======================================================
  useEffect(() => {

    if (
      isOpen &&
      user
    ) {

      setName(
        user?.name || ""
      );

      setImage(
        user?.image || ""
      );
    }

  }, [
    isOpen,
    user,
  ]);

  // ======================================================
  // HANDLE UPDATE
  // ======================================================
  const handleSubmit =
    async () => {

      setIsLoading(true);

      try {

        await authClient.updateUser({
          name,
          image,
        });

        toast.success(
          "Profile updated 🎉"
        );

        setIsOpen(false);

        setTimeout(() => {
          window.location.reload();
        }, 500);

      } catch (err) {

        toast.error(
          err.message ||
          "Update failed ❌"
        );

      } finally {

        setIsLoading(false);
      }
    };

  // ======================================================
  // UI
  // ======================================================
  return (
    <>

      {/* ====================================================== */}
      {/* OPEN BUTTON */}
      {/* ====================================================== */}
      <Button
        onPress={() =>
          setIsOpen(true)
        }
        className="
          w-full
          bg-[#16A9C7]
          hover:bg-[#1298b3]
          text-white
          font-medium
          py-6
          rounded-none
          text-[15px]
          shadow-none
          flex
          items-center
          justify-center
          gap-2
          transition-all
        "
      >

        <BiSolidEdit className="text-lg" />

        Edit Profile

      </Button>

      {/* ====================================================== */}
      {/* MODAL */}
      {/* ====================================================== */}
      {isOpen && (

        <Modal
          isOpen={true}
          onOpenChange={(open) =>
            setIsOpen(open)
          }
          placement="center"
          backdrop="blur"
          className="z-[9999]"
        >

          <div className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            p-4
            bg-black/40
            backdrop-blur-sm
          ">

            <section className="
              bg-white
              rounded-2xl
              p-6
              md:p-8
              w-full
              max-w-md
              shadow-2xl
              relative
              animate-in
              fade-in
              zoom-in
              duration-200
            ">

              {/* ====================================================== */}
              {/* HEADER */}
              {/* ====================================================== */}
              <div className="flex flex-col gap-2 mb-6">

                <div className="
                  bg-blue-50
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                ">

                  <BiUser className="
                    text-blue-500
                    text-2xl
                  " />

                </div>

                <h2 className="
                  text-xl
                  font-bold
                  text-gray-900
                ">

                  Update User

                </h2>

              </div>

              {/* ====================================================== */}
              {/* INPUTS */}
              {/* ====================================================== */}
              <div className="
                space-y-5
                text-left
              ">

                {/* Name */}
                <div>

                  <label className="
                    block
                    text-sm
                    font-medium
                    mb-1
                    text-gray-700
                  ">

                    Name

                  </label>

                  <Input
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    placeholder="Enter your name"
                    variant="bordered"
                    className="font-medium w-full"
                  />

                </div>

                {/* Image */}
                <div>

                  <label className="
                    block
                    text-sm
                    font-medium
                    mb-1
                    text-gray-700
                  ">

                    Image URL

                  </label>

                  <Input
                    value={image}
                    onChange={(e) =>
                      setImage(
                        e.target.value
                      )
                    }
                    placeholder="https://example.com/avatar.jpg"
                    variant="bordered"
                    className="font-medium w-full"
                  />

                </div>

              </div>

              {/* ====================================================== */}
              {/* FOOTER */}
              {/* ====================================================== */}
              <div className="
                flex
                flex-col-reverse
                sm:flex-row
                gap-3
                justify-end
                mt-8
              ">

                {/* Cancel */}
                <Button
                  variant="light"
                  onPress={() =>
                    setIsOpen(false)
                  }
                  className="
                    font-semibold
                    text-blue-500
                    w-full
                    sm:w-auto
                  "
                >

                  Cancel

                </Button>

                {/* Save */}
                <Button
                  onPress={
                    handleSubmit
                  }
                  className="
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    font-semibold
                    px-8
                    rounded-xl
                    shadow-md
                    w-full
                    sm:w-auto
                  "
                  isLoading={
                    isLoading
                  }
                >

                  Save

                </Button>

              </div>

            </section>

          </div>

        </Modal>
      )}
    </>
  );
}