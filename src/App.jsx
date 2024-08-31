import BlankTemplate from "./components/Blank";
import Hero from "./components/Hero";
import ProblemPage from "./components/ProblemPage";
import ResearchPage from "./components/ResearchPage";
import SolutionPage from "./components/SolutionPage";
import Footer from "./components/Footer";
import ThreeDModelPage from "./components/ThreeDModelPage";

const App = () => {
  return (
    <div className="bg-zinc-900">
      <Hero />
      <ProblemPage />
      <ResearchPage />
      <SolutionPage />
      <ThreeDModelPage /> 
      <Footer />
    </div>
  );
};

export default App;
