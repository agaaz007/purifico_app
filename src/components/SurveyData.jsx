import React, { useRef, useState, useEffect } from "react";

const SurveyData = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);

  const surveyItems = [
    {
      percentage: 82,
      description: "people use hand-dryers to dry their hands",
    },
    {
      percentage: 84,
      description: "don't know about the potential threats of a hand-dryer",
    },
    {
      percentage: 85,
      description:
        "found it very discomforting after they got to know about the fact",
    },
    {
      percentage: 87,
      description:
        "people were ready to spend a few extra seconds for clean air",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTyping(true);
          setCurrentIndex(0);
        } else {
          setIsTyping(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isTyping && currentIndex < surveyItems.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (currentIndex === surveyItems.length) {
      const finishedTimer = setTimeout(() => {
        const elements = document.querySelectorAll(".typing-effect");
        elements.forEach((el) => el.classList.add("finished"));
      }, 1000);

      return () => clearTimeout(finishedTimer);
    }
  }, [isTyping, currentIndex]);

  return (
    <div className="text-white w-full mt-10" ref={containerRef}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 -mt-14">
        <hr className="mb-4 opacity-20" />
        <h2 className="text-3xl font-SuisseIntlRegular text-center mb-8">
          Our Survey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {surveyItems.map((item, index) => (
            <div key={index} className="p-6 rounded-lg h-48">
              <div className="text-8xl font-bold mb-2 font-SuisseIntlRegular h-24 break-words whitespace-normal">
                {index <= currentIndex && (
                  <span
                    className={`typing-effect ${
                      index === currentIndex ? "cursor-blink" : "finished"
                    }`}
                  >
                    {item.percentage}%
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300 font-sourcecodepro custom-text-wrap h-24 break-words whitespace-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-6 text-sm">
          Sample size: 150 people
        </p>
        <hr className="mt-4 opacity-20" />
      </div>
    </div>
  );
};

export default SurveyData;
