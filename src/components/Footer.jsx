import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-8 sm:mb-0">
          <h2 className="text-xl font-bold">PURIFICO</h2>
          <p className="mt-2">+1 (7635) 547-12-97</p>
          <p className="mt-1">support@purifico.com</p>
        </div>
        <div className="mb-8 sm:mb-0">
          <h3 className="text-lg -ml-4 font-bold">Quick Links</h3>
          <ul className="-ml-3 mt-2">
            <li className="mt-1">
              <a href="#" className="hover:underline">
                Product
              </a>
            </li>
            <li className="mt-1">
              <a href="#" className="hover:underline">
                Company
              </a>
            </li>
            <li className="mt-1">
              <a href="#" className="hover:underline">
                Information
              </a>
            </li>
          </ul>
        </div>
        <div className="mb-8 sm:mb-0">
          <h3 className="text-lg font-bold">Subscribe</h3>
          <div className="mt-2 flex">
            <input
              type="email"
              placeholder="Get product updates"
              className="p-2 rounded-l-lg text-black"
            />
            <button className="bg-blue-500 text-white p-2 px-4 rounded-r-lg">
              →
            </button>
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
        <p className="mt-4 sm:mt-0">
          A product of <span className="font-bold">PURIFICO</span>
        </p>
        <p className="mt-4 sm:mt-0">© 2024 Purifico. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
