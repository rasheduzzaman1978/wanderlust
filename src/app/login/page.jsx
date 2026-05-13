"use client";

import React, { useState } from "react";

import {
  Card,
  Input,
  Button,
  Checkbox,
} from "@heroui/react";

import {
  Mail,
  Lock,
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

const SignInPage = () => {

  const router = useRouter();

  // Error State
  const [errors, setErrors] = useState({});

  // Loading State
  const [loading, setLoading] = useState(false);

  // Show Password State
  const [showPassword, setShowPassword] =
    useState(false);

  // Submit Handler
  const onSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData(
      e.currentTarget
    );

    const user = Object.fromEntries(
      formData.entries()
    );

    const newErrors = {};

    // Email Validation
    if (!user.email?.trim()) {
      newErrors.email =
        "Email is required";
    }

    // Password Validation
    if (!user.password?.trim()) {
      newErrors.password =
        "Password is required";
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

      // Sign In Request
      const { data, error } =
        await authClient.signIn.email({
          email: user.email,
          password: user.password,
        });

      // Error
      if (error) {
        toast.error(error.message);
        return;
      }

      // Success
      if (data) {

        toast.success(
          "Login Successful!"
        );

        e.target.reset();

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
        <div className="text-center mb-8">

          <h1 className="text-5xl font-semibold text-black">

            Welcome Back

          </h1>

          <p className="text-sm text-gray-500 mt-2">

            Resume your adventure with Wanderlust

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Email Address

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
                placeholder="Enter your password"
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

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">

            <Checkbox size="sm">

              Remember me

            </Checkbox>

            <Link
              href="/forgot-password"
              className="text-sm text-cyan-500 hover:underline"
            >

              Forgot password?

            </Link>

          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            isDisabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 text-white h-11 rounded-sm"
          >

            {loading
              ? "Signing In..."
              : "Sign In"}

          </Button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-[1px] bg-gray-200"></div>

          <span className="text-sm text-gray-400 whitespace-nowrap">

            Or continue with

          </span>

          <div className="flex-1 h-[1px] bg-gray-200"></div>

        </div>

        {/* Google Button */}
        <Button
          onClick={handleGoogleLogin}
          fullWidth
          variant="bordered"
          className="bg-white border border-gray-200 h-11 rounded-sm"
        >

          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={18}
            height={18}
            unoptimized
          />

          Sign In With Google

        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">

          Don't have an account?{" "}

          <Link
            href="/signup"
            className="text-cyan-500 hover:underline font-medium"
          >

            Sign Up

          </Link>

        </p>

      </Card>

    </div>
  );
};

export default SignInPage;