import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import AppPreview from "./components/AppPreview";
import TrustSection from "./components/TrustSection";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen transition-colors
     duration-300 selection:bg-indigo-100
      selection:text-indigo-900 
      ${isDark ? "dark bg-black text-white" 
        : "bg-white text-dark" }`}
    >
      <ScrollProgress />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <AppPreview />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}
