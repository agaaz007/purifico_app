import { useEffect, useRef, useState } from "react";
import backgroundImage from "../assets/Texturebg.png";
import Navbar from "./NavBar";
import NewsCardGrid from "./NewsCardGrid";
import ResearchPage from "./ResearchPage";
const ProblemPage = () => {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const nextSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (textRef1.current) {
      observer.observe(textRef1.current);
    }

    return () => {
      if (textRef1.current) {
        observer.unobserve(textRef1.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      if (textRef1.current) {
        textRef1.current.classList.add("typing-effect-1");
        setTimeout(() => {
          textRef1.current.classList.add("finished");
          if (textRef2.current) {
            textRef2.current.style.visibility = "visible";
            textRef2.current.classList.add("typing-effect-2");
            setTimeout(() => {
              textRef2.current.classList.add("finished");
            }, 1500);
          }
        }, 1500);
      }
    } else {
      if (textRef1.current) {
        textRef1.current.classList.remove("typing-effect-1", "finished");
      }
      if (textRef2.current) {
        textRef2.current.classList.remove("typing-effect-2", "finished");
        textRef2.current.style.visibility = "hidden";
      }
    }
  }, [isVisible]);

  const handleArrowClick = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="problem"
      className="relative text-white min-h-screen overflow-hidden "
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-black"
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
          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-helvetica inline-block">
            <span ref={textRef1} className="typing-effect-1">
              Are you unknowingly spreading bacteria
            </span>
            <br />
            <span
              ref={textRef2}
              className="typing-effect-2"
              style={{ visibility: "hidden" }}
            >
              every time you dry your hands?
            </span>
          </h1>
        </div>
        <h2 className="text-xl font-helvetica mt-4">Know More</h2>
        <div className="absolute -mt-32 left-0 right-0 h-32 sm:h-48">
          <div className="w-[150%] h-full bg-green-600 rounded-full mt-16 filter blur-3xl opacity-30 absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
        {/* Custom Bouncing Arrow */}
        <div className="mt-2 ">
          <span
            className="text-3xl cursor-pointer"
            onClick={handleArrowClick}
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

      <div ref={nextSectionRef} className="min-h-screen bg-gray-900">
        <ResearchPage />
      </div>
    </div>
  );
};

export default ProblemPage;
