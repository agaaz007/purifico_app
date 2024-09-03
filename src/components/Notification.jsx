import React from "react";

const Notification = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center z-50 p-4 mt-16">
      <div className="bg-black text-blue-500 p-4 rounded shadow-lg w-full max-w-md">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="relative inline-flex items-center px-6 py-3 text-white bg-gradient-to-tr from-black via-black to-gray-800 border border-blue-600 rounded-full transition-shadow duration-300 ease-in-out group hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] mt-2"
        >
          <span className="relative flex items-center space-x-2">
            <span className="font-helvetica">Close</span>
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
      </div>
    </div>
  );
};

export default Notification;
