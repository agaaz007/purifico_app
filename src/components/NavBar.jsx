import { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="w-full bg-black">
        <nav className="relative flex items-center justify-between py-4 h-20">
          <div className="text-2xl font-medium text-white px-8 font-AvenirHeavy">
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
            className={`fixed inset-0 bg-black bg-opacity-90 lg:bg-transparent lg:relative lg:flex lg:items-center lg:w-auto ${
              isOpen && isMobile ? "block" : "hidden"
            } lg:block z-20`}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-2 lg:items-center w-full lg:w-auto">
              <a
                href="#"
                className="text-white hover:text-gray-300 px-5 py-2 text-lg"
              >
                Home
              </a>
              <a
                href="#problem"
                className="text-white hover:text-gray-300 px-5 py-2 text-lg"
              >
                Problem
              </a>
              <a
                href="#solution"
                className="text-white hover:text-gray-300 px-5 py-2 text-lg"
              >
                Solution
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 px-5 py-2 text-lg"
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
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
