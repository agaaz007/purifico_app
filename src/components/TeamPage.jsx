import React from "react";
import Navbar from "./NavBar";

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Agaaz Singhal",
      role: "CEO",
      image: "https://i.postimg.cc/15HxZ7Ds/1700858436255-removebg-preview.png",
      education: "B.Tech, Plaksha University",
      link: "https://www.linkedin.com/in/agaaz-singhal/", // Add LinkedIn profile or any relevant link
    },
    {
      name: "Dr. Monika Sharma",
      role: "Board of Directors",
      image:
        "https://i.postimg.cc/GhY2JR0z/165527729616552772963-removebg-preview.png   ",
      education: "PhD in Computational Natural Sciences, IIIT Hyderabad",
      link: "https://plaksha.edu.in/faculty-details/dr-monika-sharma",
    },
    {
      name: "Dr. Shashikant Pawar",
      role: "Board of Directors",

      image:
        "https://i.postimg.cc/0Qb56RdY/165527757016552775708-removebg-preview.png",
      education: "PhD in Mechanical Engineering, IISc, Bengaluru",
      link: "https://plaksha.edu.in/faculty-details/dr.-shashikant-pawar",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-zinc-800 min-h-screen text-white pt-24">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl mb-16 text-center font-SuisseIntlRegular bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-white">
          Our Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-xl p-8 flex flex-col items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:bg-zinc-700 border border-zinc-700 hover:border-blue-500 hover:-translate-x-2 hover:-translate-y-2"
            >
              <a
                href={member.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 relative group"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110 shadow-lg"
                />
                <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300 ease-in-out"></div>
              </a>
              <h2 className="text-2xl font-bold text-center mb-2">
                {member.name}
              </h2>
              <p className="text-lg text-blue-400 text-center font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-sm text-gray-400 text-center mt-2 hover:text-gray-300 transition-colors duration-300">
                {member.education}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
