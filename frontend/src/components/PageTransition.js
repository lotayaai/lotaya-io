import React, { useEffect } from 'react';
import gsap from 'gsap';

const PageTransition = () => {
  useEffect(() => {
    // Create page transition animation
    const tl = gsap.timeline();
    
    // Initial page load transition
    tl.set('.page-transition', { 
      scaleX: 1,
      transformOrigin: 'left center'
    })
    .to('.page-transition', {
      scaleX: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      transformOrigin: 'right center',
      delay: 0.2
    });

    // Create floating elements animation
    gsap.to('.floating-element', {
      y: '-20px',
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.parallax-element');
      
      parallax.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        gsap.to(element, {
          y: scrolled * speed,
          duration: 0.1,
          ease: 'none'
        });
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Page Transition Overlay */}
      <div className="page-transition fixed inset-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 pointer-events-none"></div>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Circles */}
        <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-indigo-400/20 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-40 right-20 w-6 h-6 bg-purple-400/15 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-32 left-16 w-5 h-5 bg-pink-400/20 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-20 right-32 w-3 h-3 bg-cyan-400/25 rounded-full blur-sm"></div>
        
        {/* Parallax Geometric Shapes */}
        <div className="parallax-element absolute top-1/4 left-1/4 w-20 h-20 border border-indigo-300/10 rotate-45 rounded-lg"></div>
        <div className="parallax-element absolute top-1/3 right-1/3 w-16 h-16 border border-purple-300/10 rotate-12 rounded-full"></div>
        <div className="parallax-element absolute bottom-1/4 left-1/3 w-12 h-12 border border-pink-300/10 -rotate-12"></div>
        
        {/* Gradient Orbs */}
        <div className="parallax-element absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-2xl"></div>
        <div className="parallax-element absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-2xl"></div>
      </div>
    </>
  );
};

export default PageTransition;