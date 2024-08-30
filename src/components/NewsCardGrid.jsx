import React from "react";
import { ArrowUpRight } from "lucide-react";

const DualImageCard = ({
  screenshotUrl,
  backgroundUrl,
  link,
  intriguingText,
}) => {
  return (
    <div className="relative w-full md:w-[480px] h-[450px] rounded-3xl overflow-hidden shadow-lg group">
      {/* bg img */}
      <img
        src={backgroundUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* article clippings */}
      <div className="absolute inset-4 overflow-hidden -mx-3 rounded-3xl aspect-[80/25]">
        <img
          src={screenshotUrl}
          alt="article clipping"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Intriguing text */}
      <div className="absolute bottom-20 left-4 right-4 p-4">
        <p className="text-white text-3xl font-bold leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {intriguingText}
        </p>
      </div>

      {/* hyperlink button */}
      <a
        href={link}
        className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-md transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ArrowUpRight size={32} className="text-gray-800" />
      </a>
    </div>
  );
};

const NewsCardGrid = () => {
  const cards = [
    {
      screenshotUrl: "https://i.postimg.cc/pVKTGhrz/screenshot2.png",
      backgroundUrl: "https://i.postimg.cc/rFWS9wXP/Problem-Card2.png",
      link: "https://www.health.harvard.edu/blog/the-bacterial-horror-of-the-hot-air-hand-dryer-2018051113823",
      intriguingText: "Harvard study reveals shocking truth about hand dryers",
    },
    {
      screenshotUrl: "https://i.postimg.cc/d1y1KDBM/screenshot1.png",
      backgroundUrl: "https://i.postimg.cc/VkWn3ZN9/Problem-Card1.png",
      link: "https://www.usatoday.com/story/news/nation-now/2018/04/12/hand-dryers-suck-bathroom-bacteria-and-blow-them-all-over-your-hands-study-finds/511723002/#:~:text=Researchers%20examined%20plates%20exposed%20to,than%20one%20colony%20on%20average.",
      intriguingText: "Nation Now on hand dryers' shocking truth",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-32 p-6 justify-center items-center">
      {cards.map((card, index) => (
        <DualImageCard key={index} {...card} />
      ))}
    </div>
  );
};

export default NewsCardGrid;
