import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import components
import Header from "./components/Header";
import Hero from "./components/Hero";
import AiTools from "./components/AiTools";
import Features from "./components/Features";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [loading, setLoading] = useState(true);

  const initializeAnimations = () => {
    // Page load animation
    const tl = gsap.timeline();
    
    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .from(".hero-subtitle", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .from(".hero-cta", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Scroll animations
    gsap.fromTo(".ai-tool-card", {
      y: 60,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".ai-tools-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.fromTo(".feature-item", {
      x: -50,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 75%"
      }
    });

    gsap.fromTo(".benefit-card", {
      scale: 0.9,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".benefits-section",
        start: "top 70%"
      }
    });
  };

  const testApiConnection = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log("API Connected:", response.data.message);
    } catch (e) {
      console.error("API Connection Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApiConnection();
    initializeAnimations();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Initializing Lotaya AI...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <PageTransition />
      <Header />
      <Hero />
      <AiTools />
      <Features />
      <Benefits />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;