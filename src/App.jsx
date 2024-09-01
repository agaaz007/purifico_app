import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import ProblemPage from "./components/ProblemPage";
import ResearchPage from "./components/ResearchPage";
import SolutionPage from "./components/SolutionPage";
import ThreeDModelPage from "./components/ThreeDModelPage";
import TeamPage from "./components/TeamPage";
import SignUpForm from "./components/SignUpForm";
import Footer from "./components/Footer";

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
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
