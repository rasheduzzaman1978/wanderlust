"use client";

import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
  Card,
} from "@heroui/react";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

const AddDestinationPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const destination = Object.fromEntries(formData.entries());

    // Convert price to number
    if (destination.price) {
      destination.price = Number(destination.price);
    }

    try {
      const res = await fetch(
        "http://localhost:5000/destination",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(destination),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Destination added successfully");

        setTimeout(() => {
          router.push("/destinations");
        }, 1500);
      } else {
        toast.error("Failed to add destination");

        console.error(data);
      }
    } catch (error) {
      console.error("Error:", error);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-5">
      <h1 className="mb-5 text-2xl font-bold">
        Add Destination
      </h1>

      <Card>
        <form
          onSubmit={onSubmit}
          className="w-3xl space-y-8 p-10"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* Destination Name */}
            <div className="md:col-span-2">
              <TextField name="destinationName" isRequired>
                <Label>Destination Name</Label>

                <Input
                  placeholder="Bali Paradise"
                  className="rounded-2xl"
                />

                <FieldError />
              </TextField>
            </div>

            {/* Country */}
            <TextField name="country" isRequired>
              <Label>Country</Label>

              <Input
                placeholder="Indonesia"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Category */}
            <div>
              <Select
                name="category"
                isRequired
                className="w-full"
                placeholder="Select category"
              >
                <Label>Category</Label>

                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>

                    <ListBox.Item
                      id="Beach"
                      textValue="Beach"
                    >
                      Beach
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="Mountain"
                      textValue="Mountain"
                    >
                      Mountain
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="City"
                      textValue="City"
                    >
                      City
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="Adventure"
                      textValue="Adventure"
                    >
                      Adventure
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="Cultural"
                      textValue="Cultural"
                    >
                      Cultural
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="Luxury"
                      textValue="Luxury"
                    >
                      Luxury
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Price */}
            <TextField
              name="price"
              type="number"
              isRequired
            >
              <Label>Price (USD)</Label>

              <Input
                type="number"
                placeholder="1299"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Duration */}
            <TextField name="duration" isRequired>
              <Label>Duration</Label>

              <Input
                placeholder="7 Days / 6 Nights"
                className="rounded-2xl"
              />

              <FieldError />
            </TextField>

            {/* Departure Date */}
            <div className="md:col-span-2">
              <TextField
                name="departureDate"
                type="date"
                isRequired
              >
                <Label>Departure Date</Label>

                <Input
                  type="date"
                  className="rounded-2xl"
                />

                <FieldError />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label>Image URL</Label>

                <Input
                  type="url"
                  placeholder="https://example.com/bali-paradise.jpg"
                  className="rounded-2xl"
                />

                <FieldError />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label>Description</Label>

                <TextArea
                  placeholder="Describe the travel experience..."
                  className="rounded-3xl"
                />

                <FieldError />
              </TextField>
            </div>

          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="outline"
            className="w-full rounded-none bg-cyan-500 text-white"
          >
            Add Destination
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddDestinationPage;