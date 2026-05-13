"use client";

import React, { useState } from "react";

import {
  Card,
  Input,
  Button,
} from "@heroui/react";

import {
  Mail,
  Lock,
  User,
  ImageIcon,
} from "lucide-react";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {

  const router = useRouter();

  // Error State
  const [errors, setErrors] = useState({});

  // Loading State
  const [loading, setLoading] =
    useState(false);

  // Image State
  const [image, setImage] =
    useState("");

  // Password Toggle
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  // Submit Handler
  const onSubmit = async (e) => {

    e.preventDefault();

    // Get Form Data
    const formData =
      new FormData(e.currentTarget);

    const user =
      Object.fromEntries(
        formData.entries()
      );

    const newErrors = {};

    // Name Validation
    if (!user.name?.trim()) {

      newErrors.name =
        "Full name is required";

    }

    // Email Validation
    if (!user.email?.trim()) {

      newErrors.email =
        "Email is required";

    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        user.email
      )
    ) {

      newErrors.email =
        "Invalid email address";

    }

    // Password Validation
    if (!user.password) {

      newErrors.password =
        "Password is required";

    } else if (
      user.password.length < 6
    ) {

      newErrors.password =
        "Password must be at least 6 characters";

    }

    // Confirm Password Validation
    if (!user.confirmPassword) {

      newErrors.confirmPassword =
        "Please confirm your password";

    } else if (
      user.password !==
      user.confirmPassword
    ) {

      newErrors.confirmPassword =
        "Passwords do not match";

    }

    // Show Errors
    setErrors(newErrors);

    // Stop Submit
    if (
      Object.keys(newErrors).length > 0
    ) {
      return;
    }

    try {

      setLoading(true);

      // Signup Request
      const { data, error } =
        await authClient.signUp.email({
          email: user.email,
          password: user.password,
          name: user.name,
          image,
        });

      // Error
      if (error) {

        toast.error(error.message);
        return;

      }

      // Success
      if (data) {

        toast.success(
          "Account Created Successfully!"
        );

        // Reset Form
        e.target.reset();

        // Clear Errors
        setErrors({});

        // Reset Image
        setImage("");

        // Redirect
        router.push("/");
      }

    } catch (err) {

      console.log(err);

      toast.error(
        "Something went wrong!"
      );

    } finally {

      setLoading(false);

    }
  };

  // 🔐 Google Login
  const handleGoogleLogin =
    async () => {

      try {

        await authClient.signIn.social({
          provider: "google",
        });

      } catch (err) {

        toast.error(
          "Google login failed"
        );

      }
    };

  return (

    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4 py-10">

      <Card className="w-full max-w-[430px] bg-white border border-gray-200 shadow-sm rounded-sm p-8">

        {/* Heading */}
        <div className="text-center mb-7">

          <h1 className="text-4xl font-light text-gray-800">

            Create Account

          </h1>

          <p className="text-sm text-gray-400 mt-1">

            Start your adventure with Wanderlust

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="space-y-5"
        >

          {/* Full Name */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Full Name
              <span className="text-red-500 ml-1">*</span>

            </label>

            <div className="relative">

              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              />

              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="pl-8"
                variant="bordered"
              />

            </div>

            {errors.name && (

              <p className="text-red-500 text-sm mt-1">

                {errors.name}

              </p>

            )}

          </div>

          {/* Photo URL */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Photo URL

            </label>

            <div className="relative">

              <ImageIcon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              />

              <Input
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="pl-8"
                variant="bordered"
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
              />

            </div>

          </div>

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Email Address
              <span className="text-red-500 ml-1">*</span>

            </label>

            <div className="relative">

              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              />

              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="pl-8"
                variant="bordered"
              />

            </div>

            {errors.email && (

              <p className="text-red-500 text-sm mt-1">

                {errors.email}

              </p>

            )}

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Password
              <span className="text-red-500 ml-1">*</span>

            </label>

            <div className="relative">

              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
                className={`w-full border rounded-lg pl-10 pr-10 py-2 outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-cyan-500"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >

                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </button>

            </div>

            {errors.password && (

              <p className="text-red-500 text-sm mt-1">

                {errors.password}

              </p>

            )}

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Confirm Password
              <span className="text-red-500 ml-1">*</span>

            </label>

            <div className="relative">

              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`w-full border rounded-lg pl-10 pr-10 py-2 outline-none ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 focus:border-cyan-500"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >

                {showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </button>

            </div>

            {errors.confirmPassword && (

              <p className="text-red-500 text-sm mt-1">

                {errors.confirmPassword}

              </p>

            )}

          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            isDisabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 text-white h-10 rounded-sm"
          >

            {loading
              ? "Creating..."
              : "Create Account"}

          </Button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">

          <div className="flex-1 h-[1px] bg-gray-200"></div>

          <span className="text-xs text-gray-400 whitespace-nowrap">

            Or sign up with

          </span>

          <div className="flex-1 h-[1px] bg-gray-200"></div>

        </div>

        {/* Google Button */}
        <Button
          onClick={handleGoogleLogin}
          fullWidth
          variant="bordered"
          className="bg-white border border-gray-200 h-10 rounded-sm"
        >

          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={16}
            height={16}
            unoptimized
          />

          Sign Up With Google

        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-cyan-500 hover:underline"
          >

            Sign In

          </Link>

        </p>

      </Card>

    </div>
  );
};

export default SignUpPage;