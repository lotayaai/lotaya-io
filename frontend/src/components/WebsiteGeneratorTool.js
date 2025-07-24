import React, { useState } from 'react';
import { Globe, Download, Sparkles, Loader, ExternalLink } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WebsiteGeneratorTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    pages: ['home', 'about', 'services', 'contact'],
    colorScheme: 'modern'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const businessTypes = [
    'Technology Company', 'Restaurant', 'Consulting Firm', 'E-commerce Store',
    'Healthcare Practice', 'Creative Agency', 'Real Estate', 'Education',
    'Non-profit', 'Financial Services', 'Manufacturing', 'Fitness Studio'
  ];

  const colorSchemes = [
    { value: 'modern', label: 'Modern', colors: ['#1A73E8', '#4285F4', '#FFFFFF'] },
    { value: 'classic', label: 'Classic', colors: ['#2C3E50', '#34495E', '#ECF0F1'] },
    { value: 'vibrant', label: 'Vibrant', colors: ['#E74C3C', '#F39C12', '#9B59B6'] },
    { value: 'minimal', label: 'Minimal', colors: ['#000000', '#FFFFFF', '#F8F9FA'] }
  ];

  const availablePages = [
    'home', 'about', 'services', 'contact', 'portfolio', 'blog', 'team', 'pricing'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePage = (page) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.includes(page)
        ? prev.pages.filter(p => p !== page)
        : [...prev.pages, page]
    }));
  };

  const handleGenerate = async () => {
    if (!formData.businessName.trim() || !formData.businessType) {
      setError('Please enter business name and select business type');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post(`${API}/generate-website`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate website. Please try again.');
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

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <div className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter your business name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Business Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, businessType: type }))}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      formData.businessType === type
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Pages to Include
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availablePages.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => togglePage(page)}
                    className={`p-3 rounded-lg border text-sm capitalize transition-all ${
                      formData.pages.includes(page)
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Scheme */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Color Scheme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, colorScheme: scheme.value }))}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.colorScheme === scheme.value
                        ? 'border-indigo-400 bg-indigo-400/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-sm font-medium text-white mb-2">{scheme.label}</div>
                    <div className="flex space-x-1 justify-center">
                      {scheme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
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
            disabled={isGenerating || !formData.businessName.trim() || !formData.businessType}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating Your Website...</span>
              </>
            ) : (
              <>
                <Globe className="w-5 h-5" />
                <span>Generate Website</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <Globe className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Website Generated!</h3>
            <p className="text-gray-300 mb-6">{result.message}</p>
            
            {/* Mock Website Preview */}
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-2xl mb-6 overflow-hidden">
              {/* Browser Bar */}
              <div className="bg-gray-200 px-3 py-2 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded px-2 py-1 text-xs text-gray-600">
                  {formData.businessName.toLowerCase().replace(/\s+/g, '')}.com
                </div>
              </div>
              
              {/* Website Content */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
                <div className="text-xl font-bold mb-2">{formData.businessName}</div>
                <div className="text-sm opacity-90 mb-4">{formData.businessType}</div>
                <div className="flex flex-wrap gap-1 text-xs">
                  {formData.pages.slice(0, 4).map((page, index) => (
                    <span key={index} className="bg-white/20 px-2 py-1 rounded capitalize">
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Download className="w-5 h-5" />
                <span>Download Files</span>
              </button>
              
              <button
                onClick={handleTryAnother}
                className="btn-secondary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate Another</span>
              </button>
            </div>
          </div>

          {result.metadata && (
            <div className="text-left bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Website Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Business Type:</span>
                  <span className="text-white">{result.metadata.business_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pages:</span>
                  <span className="text-white">{result.metadata.pages?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Color Scheme:</span>
                  <span className="text-white capitalize">{result.metadata.color_scheme}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebsiteGeneratorTool;