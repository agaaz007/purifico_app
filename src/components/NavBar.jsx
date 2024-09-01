import { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200); // Updated breakpoint
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200); // Updated breakpoint
      if (window.innerWidth >= 1200) {
        // Updated breakpoint
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 bg-black transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
        {" "}
        {/* Changed lg to xl */}
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <a href="/" className="text-white text-3xl font-bold">
              PURIFICO
            </a>
          </div>
          <div className="hidden xl:block flex-grow">
            {" "}
            {/* Changed lg to xl */}
            <div className="ml-20 flex items-center space-x-8 justify-end">
              {" "}
              {/* Updated space-x and added items-center */}
              <a
                href="/"
                className="text-white hover:text-gray-300 px-6 py-2 rounded-md text-lg font-medium"
              >
                Home
              </a>
              <a
                href="/#problem"
                className="text-white hover:text-gray-300 px-6 py-2 rounded-md text-lg font-medium"
              >
                Problem
              </a>
              <a
                href="/#solution"
                className="text-white hover:text-gray-300 px-6 py-2 rounded-md text-lg font-medium"
              >
                Solution
              </a>
              <a
                href="/team"
                className="text-white hover:text-gray-300 px-6 py-2 rounded-md text-lg font-medium"
              >
                Team
              </a>
              <div className="pl-4">
                <a
                  href="/signup"
                  className="relative inline-flex items-center px-6 py-3 text-white bg-gradient-to-tr from-black via-black to-gray-800 border border-blue-600 rounded-full transition-shadow duration-300 ease-in-out group hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                >
                  <span className="relative flex items-center space-x-2">
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
                </a>
              </div>
            </div>
          </div>
          <div className="xl:hidden">
            {" "}
            {/* Changed lg to xl */}
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <i className="fas fa-times text-2xl"></i>
              ) : (
                <i className="fas fa-bars text-2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobile && isOpen && (
        <div className="xl:hidden">
          {" "}
          {/* Changed lg to xl */}
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <a
              href="/"
              className="text-white hover:text-gray-300 block px-6 py-2 rounded-md text-xl font-medium"
            >
              Home
            </a>
            <a
              href="/#problem"
              className="text-white hover:text-gray-300 block px-6 py-2 rounded-md text-xl font-medium"
            >
              Problem
            </a>
            <a
              href="/#solution"
              className="text-white hover:text-gray-300 block px-6 py-2 rounded-md text-xl font-medium"
            >
              Solution
            </a>
            <a
              href="/team"
              className="text-white hover:text-gray-300 block px-6 py-2 rounded-md text-xl font-medium"
            >
              Team
            </a>
            <a
              href="/signup"
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
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
