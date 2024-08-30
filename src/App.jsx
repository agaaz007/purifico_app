import BlankTemplate from "./components/Blank";
import Hero from "./components/Hero";
import ProblemPage from "./components/ProblemPage";
import ResearchPage from "./components/ResearchPage";
import SolutionPage from "./components/SolutionPage";

const App = () => {
  return (
    <div className="bg-zinc-900">
      <Hero />
      <ProblemPage />
      <ResearchPage />
      <SolutionPage />
      {/* <BlankTemplate /> */}
    </div>
  );
};

export default App;
