import spheresImage from "../assets/img.png";
import backgroundImage from "../assets/Texturebg.png";
import Navbar from "./NavBar";

const Hero = () => {
  return (
    <div className="relative text-white min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.5 }}
      />
      <Navbar />
      <main className="relative container mx-auto px-4 py-16 text-center">
        {/* Generating bg lines */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[75%] h-full flex justify-between pointer-events-none">
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

        <p className="text-sm font-thin mt-24 mb-2 text-zinc-300 font-sans sm:text-base">
          LAUNCHING
        </p>
        <h1 className="text-5xl lg:text-7xl font-semibold mt-6 mb-4 tracking-tight font-AvenirHeavy">
          <span className="text-blue-500">PURIFICO</span>
        </h1>
        <h2 className="text-4xl sm:text-5xl mb-8 text-zinc-400 font-extralight font-SuisseIntlRegular tracking-tight">
          The Future of Air Disinfection
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-zinc-300 leading-8 text-lg sm:text-xl">
          Revolutionizing the way hand dryers work. Our sustainable, affordable,
          and clean hand dryers eliminate the need for expensive and inefficient
          <br />
          HEPA filters
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center mb-8">
          <input
            type="email"
            placeholder="Enter email"
            className="px-4 py-2 rounded-xl text-zinc-200 bg-zinc-800 border border-zinc-800 mb-4 sm:mb-0 sm:mr-2 w-full sm:w-1/4"
          />
          <button className="w-3/4 bg-blue-800 rounded-xl text-white px-4 py-2 hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600 sm:w-auto">
            Sign Up Now
          </button>
        </div>
        <div className="relative h-48 mt-20 sm:h-96 w-5/5 rounded-4xl sm:w-4/5 mx-auto rounded-full flex justify-center items-center overflow-hidden shadow-lg">
          <img
            src={spheresImage}
            alt="Purple spheres"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-[-10%] h-[100px] sm:h-[150px] w-[70%] bg-purple-600 rounded-full filter blur-lg opacity-60"></div>
        </div>
      </main>
      <div className="absolute bottom-0 -mb-20 left-0 right-0 h-32 sm:h-48">
        <div className="w-[150%] h-full bg-blue-600 rounded-full filter blur-3xl opacity-30 absolute left-1/2 transform -translate-x-1/2"></div>
      </div>
      <hr className="opacity-5"/>
    </div>
  );
};

export default Hero;
