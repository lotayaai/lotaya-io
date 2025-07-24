import React, { useState } from 'react';
import { CreditCard, Download, Sparkles, Loader, User, Mail, Phone, Globe } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BusinessCardsTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    style: 'modern'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const styles = [
    { 
      value: 'modern', 
      label: 'Modern', 
      description: 'Clean, minimalist design with bold typography',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      value: 'classic', 
      label: 'Classic', 
      description: 'Traditional professional look with elegant fonts',
      preview: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
    },
    { 
      value: 'creative', 
      label: 'Creative', 
      description: 'Artistic design with vibrant colors and unique layout',
      preview: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
    },
    { 
      value: 'minimal', 
      label: 'Minimal', 
      description: 'Ultra-clean design focusing on essential information',
      preview: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }
  ];

  const templatePreviews = [
    {
      style: 'modern',
      colors: ['#667eea', '#764ba2'],
      layout: 'vertical'
    },
    {
      style: 'classic',
      colors: ['#2c3e50', '#34495e'],
      layout: 'horizontal'
    },
    {
      style: 'creative',
      colors: ['#ff6b6b', '#ee5a24'],
      layout: 'asymmetric'
    },
    {
      style: 'minimal',
      colors: ['#ffffff', '#000000'],
      layout: 'centered'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = async () => {
    if (!formData.name.trim() || !formData.title.trim() || !formData.company.trim()) {
      setError('Please fill in name, title, and company fields');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post(`${API}/generate-business-card`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate business card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (result?.assetUrl) {
      window.open(result.assetUrl, '_blank');
    }
  };

  const handleTryAnother = () => {
    setResult(null);
    setError('');
  };

  const selectedStyle = styles.find(s => s.value === formData.style);

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <div className="space-y-6">
            {/* Info Section */}
            <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-400/20 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Professional Business Card Designer</h3>
              <p className="text-gray-300 text-sm">
                Create stunning, print-ready business cards that make a lasting impression. 
                All designs are optimized for standard printing specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Contact Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-3">Contact Information</h4>
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="CEO & Founder"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Lotaya AI"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://company.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Style Selection */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-3">Design Style</h4>
                
                {/* Style Options */}
                <div className="space-y-3">
                  {styles.map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, style: style.value }))}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        formData.style === style.value
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-8 rounded border border-white/20"
                          style={{ background: style.preview }}
                        ></div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{style.label}</div>
                          <div className="text-xs text-gray-400 mt-1">{style.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Live Preview */}
                {selectedStyle && (
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-300 mb-3">Preview</h5>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div 
                        className="w-full h-32 rounded-lg flex items-center justify-center text-white relative overflow-hidden"
                        style={{ background: selectedStyle.preview }}
                      >
                        <div className="text-center">
                          <div className="font-bold text-lg">{formData.name || 'Your Name'}</div>
                          <div className="text-sm opacity-90">{formData.title || 'Your Title'}</div>
                          <div className="text-xs opacity-75 mt-1">{formData.company || 'Company'}</div>
                        </div>
                        
                        {/* Mock contact info */}
                        <div className="absolute bottom-2 left-2 text-xs opacity-60">
                          {formData.email || formData.phone ? 'Contact Info' : ''}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2 text-center">
                        Business Card Preview • {selectedStyle.label} Style
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.name.trim() || !formData.title.trim() || !formData.company.trim()}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Designing Your Business Card...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Generate Business Card</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <CreditCard className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Business Card Created!</h3>
            <p className="text-gray-300 mb-6">{result.message}</p>
            
            {/* Mock Business Card Display */}
            <div className="max-w-sm mx-auto mb-6">
              <div 
                className="w-full h-48 rounded-xl shadow-2xl flex flex-col justify-between p-6 text-white relative overflow-hidden"
                style={{ 
                  background: selectedStyle?.preview || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                {/* Front Side */}
                <div>
                  <div className="text-xl font-bold mb-1">{formData.name}</div>
                  <div className="text-sm opacity-90 mb-3">{formData.title}</div>
                  <div className="text-lg font-semibold">{formData.company}</div>
                </div>
                
                {/* Contact Info */}
                <div className="text-xs space-y-1 opacity-80">
                  {formData.email && <div>{formData.email}</div>}
                  {formData.phone && <div>{formData.phone}</div>}
                  {formData.website && <div>{formData.website}</div>}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/5 rounded-full"></div>
              </div>
              
              <div className="text-xs text-gray-400 mt-2">
                Professional Business Card • Print Ready • {selectedStyle?.label} Style
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={handleTryAnother}
                className="btn-secondary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Sparkles className="w-5 h-5" />
                <span>Try Different Style</span>
              </button>
            </div>
          </div>

          {result.metadata && (
            <div className="text-left bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Design Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Style:</span>
                  <div className="text-white capitalize">{result.metadata.style}</div>
                </div>
                <div>
                  <span className="text-gray-400">Includes:</span>
                  <div className="text-white">
                    {result.metadata.includes?.map((item, index) => (
                      <div key={index} className="text-xs capitalize">
                        • {item.replace('_', ' ')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Printing Tips */}
          <div className="bg-teal-500/10 border border-teal-400/20 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">🖨️ Printing Tips</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Standard size: 3.5" x 2" (89mm x 51mm)</li>
              <li>• Use heavy cardstock (14-16pt) for premium feel</li>
              <li>• Consider matte or UV coating for durability</li>
              <li>• Print with 300 DPI for crisp, professional quality</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessCardsTool;