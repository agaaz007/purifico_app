import Navbar from "./NavBar";
import { useState, useEffect } from "react";
import SurveyData from "./SurveyData";

const ResearchPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const images = [
    "https://i.postimg.cc/T3333t9J/research1.jpg",
    "https://i.postimg.cc/rpdySz7d/research2.jpg",
  ];
  const imageTexts = [
    "Tested at Plaksha, in the dining hall for 10s exposure",
    "Tested at Plaksha, 2nd floor student residence for 10s exposure",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // 5 sec delay for image change

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = scrollTop / scrollHeight;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative text-white min-h-screen overflow-hidden">
      {/* Background Color */}
      <div className="absolute inset-0 z-0 bg-[#181A1B] opacity-20" />
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tl from-zinc-400 via-gray-800 to-black opacity-30" />
      <div className="absolute -mt-32 left-0 right-0 h-32 sm:h-48">
        <div className="w-[150%] h-full bg-green-600 rounded-full mt-16 filter blur-3xl opacity-30 absolute left-1/2 transform -translate-x-1/2"></div>
      </div>
      <Navbar />
      <main className="relative container mx-auto px-4 py-8 sm:px-10 sm:py-16 text-center mt-4">
        <h2 className="text-6xl mt-12 sm:text-7xl mb-4 sm:mb-8 font-medium tracking-tight font-SuisseIntlRegular bg-gradient-to-r from-white via-white to-blue-500 bg-[length:200%_100%] text-transparent bg-clip-text" style={{backgroundPosition: '90% 0'}}>
          Research
        </h2>
        <p className="-mt-6 text-[#00AA37] font-medium font-SuisseIntlRegular text-lg sm:text-xl">
          Tested under a conventional hand dryer
        </p>

        {/* Image Carousel */}
        <div className="relative w-full max-w-md sm:max-w-3xl mx-auto mt-8 sm:mt-12">
          <div className="relative w-full h-64 sm:h-96 mx-auto">
            {/* Image Text */}
            <div className="absolute top-4 left-4 right-4 z-10 text-center text-white p-2 rounded-lg">
              <h3 className="text-lg sm:text-2xl font-semibold">
                {imageTexts[currentImageIndex]}
              </h3>
            </div>
            <img
              src={images[currentImageIndex]}
              alt={`Research image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-3 sm:p-6 rounded-full text-base sm:text-lg shadow-lg"
            >
              &#8592;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-3 sm:p-6 rounded-full text-base sm:text-lg shadow-lg"
            >
              &#8594;
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6 sm:mt-10">
          <div className="w-3/4 text-center">
            <h2 className="text-white font-normal text-xl sm:text-2xl">
              This proved that the pathogenic load being delivered in just{" "}
              <span className="underline">10 seconds</span> of hand-dryer
              exposure was immense and disease causing.
            </h2>
          </div>
        </div>
      </main>

      <div className="w-full">
        <SurveyData />
      </div>
    </div>
  );
};

export default ResearchPage;
