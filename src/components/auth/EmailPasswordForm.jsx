import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmailPasswordForm = ({ register, password }) => {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const validateEmail = async (email) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/auth/check-email`,
        { email },
        { withCredentials: true } // Add this for consistency
      );
      
      // If email exists, validation should FAIL
      if (response.data.exists) {
        toast.error("Email already registered");
        return "Email already registered"; // Return error message instead of false
      }
      
      // Email doesn't exist, validation PASSES
      return true;
    } catch (error) {
      console.error("Email validation error:", error);
      // Don't block the form if the check-email API fails
      // Let the user proceed and handle it on the backend during signup
      return true;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Email & Password
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format"
            },
            validate: validateEmail,
          })}
          className="mt-1 block w-full rounded-md px-3 py-2 border-2 border-green-300 focus:ring-green-600 focus:border-green-600 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
              message: "Password must contain uppercase, lowercase, number and special character"
            }
          })}
          className="mt-1 block w-full rounded-md px-3 py-2 border-2 border-green-300 focus:ring-green-600 focus:border-green-600 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match"
          })}
          className="mt-1 block w-full border-2 border-green-300 rounded-md px-3 py-2 focus:ring-green-600 focus:border-green-600 outline-none"
        />
      </div>
    </div>
  );
};

export default EmailPasswordForm;