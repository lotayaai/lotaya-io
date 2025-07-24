import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    createParticles();
    
    // Animate particles
    animateParticles();
  }, []);

  const createParticles = () => {
    const particleContainer = particlesRef.current;
    if (!particleContainer) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
      `;
      particleContainer.appendChild(particle);
    }
  };

  const animateParticles = () => {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: `random(-50, 50)`,
        x: `random(-30, 30)`,
        duration: `random(3, 6)`,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        delay: index * 0.1
      });
    });
  };

  const handleCtaClick = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchDemo = () => {
    // Mock demo functionality
    alert('Demo video would play here');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      
      {/* Geometric Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-indigo-400/30 rounded-full blur-sm"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-purple-400/20 rotate-45"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-lg rotate-12"></div>

      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="hero-subtitle inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-4 py-2 text-sm text-indigo-300">
            <Star className="w-4 h-4 fill-current" />
            <span>All-in-One AI Design Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
            Unleash Your Creativity with{' '}
            <span className="gradient-text">AI-Powered Design</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your ideas into stunning visual content in seconds. From logos to videos, 
            social media to websites - create professional designs with the power of AI.
          </p>

          {/* Features List */}
          <div className="hero-subtitle flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>12 AI-Powered Tools</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Professional Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Instant Generation</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={handleCtaClick}
              className="btn-primary flex items-center space-x-2 px-8 py-4 text-lg group"
            >
              <span>Start Creating Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button 
              onClick={handleWatchDemo}
              className="btn-secondary flex items-center space-x-2 px-8 py-4 text-lg group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="hero-cta grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">12</div>
              <div className="text-sm text-gray-400">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">10K+</div>
              <div className="text-sm text-gray-400">Designs Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">5⭐</div>
              <div className="text-sm text-gray-400">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;