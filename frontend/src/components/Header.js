import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate header on mount
    gsap.fromTo('.header-nav', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.fromTo('.mobile-menu',
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'AI Tools', href: '#tools' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' }
  ];

  return (
    <header className={`header-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
              <div className="absolute -inset-1 bg-indigo-400/20 rounded-full blur-sm group-hover:bg-indigo-300/30 transition-all duration-300"></div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
              Lotaya AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group py-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-300">
              Sign In
            </button>
            <button className="btn-primary px-6 py-2 text-sm">
              Get Started Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-white transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <button className="w-full text-left text-gray-300 hover:text-white transition-colors duration-300 py-2">
                Sign In
              </button>
              <button className="w-full btn-primary py-3 text-sm">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;