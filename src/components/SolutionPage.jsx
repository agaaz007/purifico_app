import React from "react";
import backgroundImage from "../assets/Texturebg.png";
import Navbar from "./NavBar";

const SolutionCard = ({ title, description, number }) => {
  return (
    <div className="relative w-full sm:w-72 h-auto sm:h-96 bg-gradient-to-b from-[#49B726] via-[#4AB826] to-[#164D05] rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-x-2 hover:-translate-y-2 hover:shadow-2xl shadow-lg">
      <div className="p-4 sm:p-6 h-full flex flex-col justify-between border-[1px] rounded-lg border-white">
        <div className="text-xl sm:text-2xl font-medium text-black absolute top-2 left-2 font-sourcecodepro">
          {number.padStart(2, "0")}
        </div>
        <div className="mt-8 sm:mt-12">
          <h3 className="text-2xl sm:text-4xl font-medium text-black mb-2 sm:mb-4 font-SuisseIntlRegular text-left leading-tight">
            {title}
          </h3>
          <p className="text-[#fcfcfc] font-SuisseIntlRegular font-light text-left sm:text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const SolutionPage = () => {
  const solutions = [
    {
      title: "Total Pathogen Elimination",
      description:
        "Our product eliminates pathogens completely, no filter replacements needed.",
      number: "1",
    },
    {
      title: "Long Term Efficiency",
      description: "Designed for durability. Just install and chill back)",
      number: "2",
    },
    {
      title: "Cost Effective",
      description:
        "Our affordable solution enables hassle-free implementation. (Scalable Robust Technology Solution)",
      number: "3",
    },
    {
      title: "Infection Prevention",
      description:
        "We turn pathogen hubs like hand dryers into safe zones, no costly replacements needed.",
      number: "4",
    },
  ];

  return (
    <div
      id="solution"
      className="relative text-white min-h-screen overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
      />
      {/* Green elliptical gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-green-500 to-transparent rounded-full transform scale-150 -translate-y-1/2 opacity-50"></div>
      </div>
      <Navbar />
      <main className="relative container mx-auto px-4 py-16 text-center -mt-6">
        <h2 className="text-5xl sm:text-7xl mt-24 mb-8 font-medium tracking-tight bg-gradient-to-r from-zinc-400 to-green-300 bg-clip-text text-transparent font-SuisseIntlRegular">
          Solution
        </h2>
        <p className="mb-16 max-w-2xl mx-auto text-zinc-300 leading-8 text-lg sm:text-xl">
          We aim to use a novel technology that combines the power of the 2 most
          extensively studied modes of disinfection. It enables us to disinfect
          surfaces and air 100 times better and faster.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} {...solution} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SolutionPage;
