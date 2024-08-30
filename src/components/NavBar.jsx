import { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-30">
      <div className="container mx-auto px-4 md:px-8">
        <nav
          className="relative flex items-center justify-between rounded-xl py-4 shadow-lg h-20"
          style={{
            animation: "gradientAnimation 5s linear infinite",
            borderImage:
              "linear-gradient(90deg, #0000ff, #800080, #ff00ff, #00ffff) 1",
            borderRadius: "1rem",
          }}
        >
          {/* Blurred background div */}
          <div className="absolute inset-0 rounded-xl bg-[#0c145a2f]"></div>

          {/* Navbar content div */}
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="text-2xl font-medium text-zinc-300 px-8 font-AvenirHeavy">
              PURIFICO
            </div>
            <div className="block lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none text-xl z-30 relative"
              >
                {isOpen ? (
                  <span className="text-2xl mr-4">
                    <i className="fa-solid fa-x"></i>
                  </span>
                ) : (
                  <span className="text-2xl mr-4">
                    <i className="fa-solid fa-bars"></i>
                  </span>
                )}
              </button>
            </div>
            <div
              className={`fixed inset-0 bg-zinc-900 bg-opacity-90 lg:bg-transparent lg:relative lg:flex lg:items-center lg:w-auto ${
                isOpen && isMobile ? "block" : "hidden"
              } lg:block z-20`}
            >
              <div className="flex flex-col lg:flex-row lg:space-x-2 lg:items-center w-full lg:w-auto">
                <a
                  href="#"
                  className="text-zinc-200 hover:text-gray-300 px-5 py-2 text-lg"
                >
                  Home
                </a>
                <a
                  href="#problem"
                  className="text-zinc-200 hover:text-gray-300 px-5 py-2 text-lg"
                >
                  Problem
                </a>
                <a
                  href="#solution"
                  className="text-zinc-200 hover:text-gray-300 px-5 py-2 text-lg"
                >
                  Solution
                </a>
                <a
                  href="#"
                  className="text-zinc-200 hover:text-gray-300 px-5 py-2 text-lg"
                >
                  Contact Us
                </a>
                <div className="mt-4 lg:mt-0 lg:ml-auto">
                  <button className="bg-blue-800 hover:bg-blue-600 text-white px-5 py-3 ml-3 rounded-lg text-lg transition-all duration-300 ease-out hover:scale-110 mr-6 mb-1 lg:px-6 lg:py-3 lg:text-lg">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
