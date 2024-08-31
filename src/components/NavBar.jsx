import { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
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
    <nav className={`fixed top-0 left-0 right-0 z-30 bg-black transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <span className="text-white text-3xl font-bold">PURIFICO</span>
          </div>
          <div className="hidden lg:block flex-grow">
            <div className="ml-20 flex items-baseline space-x-12 justify-end">
              <a href="#" className="text-white hover:text-gray-300 px-6 py-2 rounded-md text-lg font-medium">Home</a>
              <a href="#problem" className="text-white hover:text-gray-300 px-6 py-2 rounded-md text-lg font-medium">Problem</a>
              <a href="#solution" className="text-white hover:text-gray-300 px-6 py-2 rounded-md text-lg font-medium">Solution</a>
              <a href="#" className="text-white hover:text-gray-300 px-6 py-2 rounded-md text-lg font-medium">Contact Us</a>
              <button className="bg-blue-800 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-xl font-medium transition-all duration-300 ease-out hover:scale-110">Sign Up</button>
            </div>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
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
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <a href="#" className="text-white hover:text-gray-300 block px-6 py-2 rounded-md text-xl font-medium">Home</a>
            <a href="#problem" className="text-white hover:text-gray-300 block px-6 py-2 rounded-md text-xl font-medium">Problem</a>
            <a href="#solution" className="text-white hover:text-gray-300 block px-6 py-2 rounded-md text-xl font-medium">Solution</a>
            <a href="#" className="text-white hover:text-gray-300 block px-6 py-2 rounded-md text-xl font-medium">Contact Us</a>
            <button className="bg-blue-800 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-xl font-medium transition-all duration-300 ease-out hover:scale-110 w-full mt-2">Sign Up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
