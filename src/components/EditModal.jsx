"use client";

import { useState } from "react";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";

import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export function EditModal({ destination }) {
  const [open, setOpen] = useState(false);

  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
    category,
    departureDate,
  } = destination;

  // Update Destination
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedDestination = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`http://localhost:5000/destination/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedDestination),
      });

      const data = await res.json();

      console.log(data);

      // Close Modal After Save
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-left">
                  <Link href="/destinations">
                  <p className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition">
                    <span><FaArrowLeft /></span>
                    <span>Back to Destination</span>
                  </p>
                </Link>
                </div>
      {/* Edit Button */}
      <Button
        variant="outline"
        className="rounded-none"
        onPress={() => setOpen(true)}
      >
        <BiEdit className="mr-2" />
        Edit
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          {/* Modal Box */}
          <div className="relative w-full max-w-3xl bg-white shadow-2xl overflow-hidden rounded-sm">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
            >
              ×
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-2">
              <h2 className="text-3xl font-semibold">
                Update Travel Package
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Make changes to the travel package details below
              </p>
            </div>

            {/* Body */}
            <div className="px-8 pb-8 max-h-[90vh] overflow-y-auto">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={destinationName}
                        name="destinationName"
                        required
                      >
                        <Label>Destination Name</Label>

                        <Input
                          placeholder="Bali Paradise"
                          className="rounded-none"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField
                      defaultValue={country}
                      name="country"
                      required
                    >
                      <Label>Country</Label>

                      <Input
                        placeholder="Indonesia"
                        className="rounded-none"
                      />

                      <FieldError />
                    </TextField>

                    {/* Category */}
                    <div>
                      <Select
                        defaultValue={category}
                        name="category"
                        required
                        className="w-full"
                        placeholder="Select category"
                      >
                        <Label>Category</Label>

                        <Select.Trigger className="rounded-none">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="Beach" textValue="Beach">
                              Beach
                            </ListBox.Item>

                            <ListBox.Item id="Mountain" textValue="Mountain">
                              Mountain
                            </ListBox.Item>

                            <ListBox.Item id="City" textValue="City">
                              City
                            </ListBox.Item>

                            <ListBox.Item
                              id="Adventure"
                              textValue="Adventure"
                            >
                              Adventure
                            </ListBox.Item>

                            <ListBox.Item
                              id="Cultural"
                              textValue="Cultural"
                            >
                              Cultural
                            </ListBox.Item>

                            <ListBox.Item id="Luxury" textValue="Luxury">
                              Luxury
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Price */}
                    <TextField
                      defaultValue={price}
                      name="price"
                      type="number"
                      required
                    >
                      <Label>Price (USD)</Label>

                      <Input
                        type="number"
                        placeholder="e.g., 1299"
                        className="rounded-none"
                      />

                      <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField
                      defaultValue={duration}
                      name="duration"
                      required
                    >
                      <Label>Duration</Label>

                      <Input
                        placeholder="e.g., 7 Days / 6 Nights"
                        className="rounded-none"
                      />

                      <FieldError />
                    </TextField>

                    {/* Departure Date */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={departureDate}
                        name="departureDate"
                        type="date"
                        required
                      >
                        <Label>Departure Date</Label>

                        <Input type="date" className="rounded-none" />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={imageUrl}
                        name="imageUrl"
                        required
                      >
                        <Label>Image URL</Label>

                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          className="rounded-none"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={description}
                        name="description"
                        required
                      >
                        <Label>Description</Label>

                        <TextArea
                          placeholder="Describe the travel experience..."
                          className="rounded-none min-h-[140px]"
                        />

                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    {/* Cancel */}
                    <Button
                      type="button"
                      variant="bordered"
                      onPress={() => setOpen(false)}
                      className="rounded-none border border-red-400 text-red-500 px-6 h-11 bg-white hover:bg-red-50"
                    >
                      Cancel
                    </Button>

                    {/* Save Changes */}
                    <Button
                      type="submit"
                      className="rounded-none px-6 h-11 bg-cyan-600 text-white hover:bg-cyan-700"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Surface>
            </div>
          </div>
        </div>
      )}
    </>
  );
}