import React, { useState } from 'react';
import { 
  Palette, 
  Video, 
  Package, 
  Share2, 
  MessageSquare, 
  Globe, 
  Mic, 
  Image, 
  Scissors, 
  Search, 
  Type, 
  CreditCard,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// Import individual tool components
import LogoGeneratorTool from './LogoGeneratorTool';
import VideoGeneratorTool from './VideoGeneratorTool';
import BrandKitTool from './BrandKitTool';
import SocialMediaTool from './SocialMediaTool';
import AiChatWidget from './AiChatWidget';
import WebsiteGeneratorTool from './WebsiteGeneratorTool';
import VoiceGeneratorTool from './VoiceGeneratorTool';
import PhotoEditorTool from './PhotoEditorTool';
import BackgroundRemoverTool from './BackgroundRemoverTool';
import DomainGeneratorTool from './DomainGeneratorTool';
import SloganMakerTool from './SloganMakerTool';
import BusinessCardsTool from './BusinessCardsTool';
import Modal from './Modal';

const AiTools = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    {
      id: 'logo',
      name: 'Logo Generator',
      description: 'Create professional logos tailored to your brand',
      icon: Palette,
      color: 'from-blue-500 to-cyan-500',
      component: LogoGeneratorTool
    },
    {
      id: 'video',
      name: 'AI Video Generator',
      description: 'Generate stunning videos from text descriptions',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      component: VideoGeneratorTool
    },
    {
      id: 'brand-kit',
      name: 'Brand Kit',
      description: 'Complete brand identity in one click',
      icon: Package,
      color: 'from-emerald-500 to-teal-500',
      component: BrandKitTool
    },
    {
      id: 'social',
      name: 'Social Media Content',
      description: 'Platform-optimized posts and visuals',
      icon: Share2,
      color: 'from-orange-500 to-red-500',
      component: SocialMediaTool
    },
    {
      id: 'chat',
      name: 'AI Assistant',
      description: 'Creative guidance and design help',
      icon: MessageSquare,
      color: 'from-indigo-500 to-purple-500',
      component: AiChatWidget
    },
    {
      id: 'website',
      name: 'Website Generator',
      description: 'Full website concepts with modern layouts',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      component: WebsiteGeneratorTool
    },
    {
      id: 'voice',
      name: 'AI Voice Generator',
      description: 'Transform text into lifelike speech',
      icon: Mic,
      color: 'from-pink-500 to-rose-500',
      component: VoiceGeneratorTool
    },
    {
      id: 'photo',
      name: 'Photo Editor',
      description: 'AI-powered image enhancement',
      icon: Image,
      color: 'from-yellow-500 to-orange-500',
      component: PhotoEditorTool
    },
    {
      id: 'background',
      name: 'Background Remover',
      description: 'Remove backgrounds with one click',
      icon: Scissors,
      color: 'from-cyan-500 to-blue-500',
      component: BackgroundRemoverTool
    },
    {
      id: 'domain',
      name: 'Domain Generator',
      description: 'Find perfect domain names',
      icon: Search,
      color: 'from-violet-500 to-purple-500',
      component: DomainGeneratorTool
    },
    {
      id: 'slogan',
      name: 'Slogan Maker',
      description: 'Craft catchy taglines and slogans',
      icon: Type,
      color: 'from-rose-500 to-pink-500',
      component: SloganMakerTool
    },
    {
      id: 'business-card',
      name: 'Business Cards',
      description: 'Professional business card designs',
      icon: CreditCard,
      color: 'from-teal-500 to-cyan-500',
      component: BusinessCardsTool
    }
  ];

  const openTool = (tool) => {
    setSelectedTool(tool);
  };

  const closeTool = () => {
    setSelectedTool(null);
  };

  return (
    <section id="tools" className="ai-tools-section py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-4 py-2 text-sm text-indigo-300 mb-4">
            <Sparkles className="w-4 h-4" />
            <span>12 Powerful AI Tools</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Everything You Need to{' '}
            <span className="gradient-text">Create Amazing Content</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From professional logos to engaging videos, our AI-powered tools help you create 
            stunning content in minutes, not hours.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.id}
                className="ai-tool-card group cursor-pointer"
                onClick={() => openTool(tool)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card hover-scale h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400 text-sm font-medium">
                      Try Now
                    </span>
                    <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-2xl px-8 py-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Start Creating?
              </h3>
              <p className="text-gray-300 text-sm">
                Choose any tool above and start generating amazing content instantly
              </p>
            </div>
            <button className="btn-primary px-6 py-3 whitespace-nowrap">
              Get Started Free
            </button>
          </div>
        </div>
      </div>

      {/* Tool Modal */}
      {selectedTool && (
        <Modal onClose={closeTool} title={selectedTool.name}>
          <selectedTool.component onClose={closeTool} />
        </Modal>
      )}
    </section>
  );
};

export default AiTools;