import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlankTemplate from "./components/Blank";
import Hero from "./components/Hero";
import ProblemPage from "./components/ProblemPage";
import ResearchPage from "./components/ResearchPage";
import SolutionPage from "./components/SolutionPage";
import Footer from "./components/Footer";
import ThreeDModelPage from "./components/ThreeDModelPage";
import TeamPage from "./components/TeamPage";

const HomePage = () => (
  <>
    <Hero />
    <ProblemPage />
    <ResearchPage />
    <SolutionPage />
    <ThreeDModelPage />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="bg-zinc-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
