import React from 'react';
import { 
  Zap, 
  Shield, 
  Globe, 
  Palette, 
  Clock, 
  Users, 
  Star, 
  Sparkles,
  CheckCircle
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Generation',
      description: 'Create professional designs in seconds, not hours. Our AI processes your requests instantly.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Your data and designs are protected with bank-level security and encryption.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Global Language Support',
      description: 'Create content in multiple languages with culturally appropriate designs.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Unlimited Customization',
      description: 'Fine-tune every aspect of your designs with advanced AI-powered controls.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: '24/7 AI Availability',
      description: 'Our AI never sleeps. Create amazing content whenever inspiration strikes.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share, edit, and collaborate on designs with your team in real-time.',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const benefits = [
    'No design experience required',
    'Commercial usage rights included',
    'High-resolution outputs',
    'Version history tracking',
    'Brand consistency tools',
    'API access available'
  ];

  return (
    <section id="features" className="features-section py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-4 py-2 text-sm text-indigo-300 mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>Powerful Features</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Why Choose{' '}
            <span className="gradient-text">Lotaya AI</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of creative design with cutting-edge AI technology 
            that understands your vision and brings it to life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="feature-item group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card h-full group-hover:scale-105 transition-transform duration-300">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-2 text-sm text-indigo-300 mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Everything Included</span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-6">
                Professional Results, 
                <span className="gradient-text"> Zero Learning Curve</span>
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Get started immediately with our intuitive interface. No tutorials, 
                no complicated settings - just powerful AI that understands your needs.
              </p>

              <button className="btn-primary px-8 py-4 text-lg group">
                <span>Start Creating Now</span>
                <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>

            {/* Right Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 text-center">
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-white">10K+</div>
            <div className="text-gray-400">Designs Created</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-white">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-white">12</div>
            <div className="text-gray-400">AI Tools</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-white">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;