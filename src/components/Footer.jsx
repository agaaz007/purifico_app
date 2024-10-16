import React from "react";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-black text-zinc-300 py-8">
      {/* <ContactForm /> */}
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-8 sm:mb-0">
          <h2 className="text-xl font-bold">PURIFICO</h2>
          <p className="mt-1">agaazsinghal@gmail.com</p>
        </div>
        <div className="mb-8 sm:mb-0">
          <div className="mt-2 flex">
            <a
              href="mailto:agaazsinghal@gmail.com"
              className="relative inline-flex items-center px-6 py-3 text-white bg-gradient-to-tr from-black via-black to-gray-800 border border-blue-600 rounded-full transition-shadow duration-300 ease-in-out group hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            >
              <span className="relative flex items-center space-x-2">
                <span className="font-helvetica">Write to Us</span>
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
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="hover:underline">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="mt-4 sm:mt-0">© 2024 Purifico. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
