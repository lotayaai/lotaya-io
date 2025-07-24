import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

const Modal = ({ children, onClose, title, size = 'lg' }) => {
  useEffect(() => {
    // Animate modal entrance
    gsap.fromTo('.modal-backdrop', 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    
    gsap.fromTo('.modal-content', 
      { scale: 0.9, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );

    // Disable body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    // Animate modal exit
    gsap.to('.modal-backdrop', {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    });
    
    gsap.to('.modal-content', {
      scale: 0.9,
      opacity: 0,
      y: 30,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div 
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className={`modal-content glass-effect rounded-2xl border border-white/20 w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden shadow-2xl`}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;