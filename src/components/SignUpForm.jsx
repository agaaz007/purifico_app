import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./NavBar";
import Notification from "./Notification";

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [notification, setNotification] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://o47wxqrf5i.execute-api.eu-north-1.amazonaws.com/prod/HandleSubscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email, name: data.name }),
        }
      );

      if (response.ok) {
        setNotification("Subscription successful");
      } else {
        setNotification("Subscription failed");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="max-w-md w-full bg-black/70 shadow-lg rounded-lg overflow-hidden shadow-blue-800/50">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-blue-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-blue-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="relative inline-flex items-center px-6 py-3 text-white bg-gradient-to-tr from-black via-black to-gray-800 border border-blue-600 rounded-full transition-shadow duration-300 ease-in-out group hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] w-full mt-2"
              >
                <span className="relative flex items-center justify-center space-x-2">
                  <span className="font-helvetica">Sign Up</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default SignUpForm;
