import { useEffect, useRef, useState } from "react";
import backgroundImage from "../assets/Texturebg.png";
import Navbar from "./NavBar";
import NewsCardGrid from "./NewsCardGrid";
import SurveyData from "./SurveyData";

const ProblemPage = () => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && textRef.current) {
      textRef.current.classList.add("typing-effect");
      const timer = setTimeout(() => {
        textRef.current.classList.add("finished");
      }, 3500); // Match this to the duration of your typing animation

      return () => {
        clearTimeout(timer);
        if (textRef.current) {
          textRef.current.classList.remove("typing-effect", "finished");
        }
      };
    }
  }, [isVisible]);

  return (
    <div
      id="problem"
      className="relative text-white min-h-screen overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <Navbar />
      <main className="relative container mx-auto px-4 py-16 text-center">
        <div className="absolute -mt-28 left-0 right-0 h-32 sm:h-48">
          <div className="w-[150%] h-full bg-blue-600 rounded-full filter blur-3xl opacity-30 absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
        {/* Glowing Metallic Lines */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[75%] h-full flex justify-between pointer-events-none ">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-full bg-gradient-to-t from-gray-100 via-gray-500 to-gray-300 opacity-5
                          filter drop-shadow-[0_0_8px_rgba(173,216,230,0.7)]"
            />
          ))}
          {[...Array(2)].map((_, i) => (
            <div
              key={i + 4}
              className="hidden md:block w-0.5 h-full bg-gradient-to-t from-gray-100 via-gray-500 to-gray-300 opacity-5
                          filter drop-shadow-[0_0_8px_rgba(173,216,230,0.7)]"
            />
          ))}
        </div>
        <h2
          className="text-5xl sm:text-7xl mt-24 mb-8 font-medium tracking-tight bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent font-SuisseIntlRegular"
          style={{
            backgroundImage: "linear-gradient(80deg, white 44%, red 70%)",
          }}
        >
          The Problem
        </h2>

        <p className="mb-8 max-w-2xl mx-auto text-zinc-300 leading-8 text-lg sm:text-xl">
          The traditional hand dryers available in the market spread
          <span className="text-red-600"> pathogenic bacteria-laden air </span>
          and at times even faecal matter onto the user's hand, which is disease
          causing.
        </p>
        <NewsCardGrid />
        <div className="max-w-3xl mx-auto">
          {" "}
          {/* Container for the text */}
          <h1
            ref={textRef}
            className="text-xs sm:text-sm md:text-base lg:text-lg font-helvetica inline-block"
          >
            Are you unknowingly spreading bacteria every time you dry your
            hands?
          </h1>
        </div>
        <h2 className="text-xl font-helvetica mt-4">Know More</h2>
        {/* Custom Bouncing Arrow */}
        <div className="mt-2 mb-16">
          <span
            className="text-3xl"
            style={{
              display: "inline-block",
              animation: "bounce 1.5s infinite",
              transformOrigin: "center bottom",
            }}
          >
            &#x2193;
          </span>
        </div>
      </main>
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48">
        <div className="w-[150%] h-full bg-green-600 rounded-full mt-16 filter blur-3xl opacity-40 absolute left-1/2 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default ProblemPage;
