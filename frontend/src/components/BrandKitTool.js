import React, { useState } from 'react';
import { Package, Download, Sparkles, Loader, Palette } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BrandKitTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    brandName: '',
    industry: '',
    brandPersonality: [],
    targetAudience: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const personalityOptions = [
    'innovative', 'trustworthy', 'modern', 'friendly', 'professional',
    'creative', 'reliable', 'energetic', 'sophisticated', 'approachable',
    'bold', 'elegant', 'playful', 'authentic', 'cutting-edge'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Food & Beverage', 'Real Estate', 'Consulting', 'Entertainment',
    'Fashion', 'Travel', 'Automotive', 'Non-profit', 'Sports'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePersonality = (personality) => {
    setFormData(prev => ({
      ...prev,
      brandPersonality: prev.brandPersonality.includes(personality)
        ? prev.brandPersonality.filter(p => p !== personality)
        : [...prev.brandPersonality, personality]
    }));
  };

  const handleGenerate = async () => {
    if (!formData.brandName.trim() || !formData.industry) {
      setError('Please enter brand name and select industry');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post(`${API}/generate-brand-kit`, {
        brandName: formData.brandName,
        industry: formData.industry,
        brandPersonality: formData.brandPersonality.length > 0 ? formData.brandPersonality : undefined,
        targetAudience: formData.targetAudience || undefined
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate brand kit. Please try again.');
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
            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Brand Name *
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                placeholder="Enter your brand name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Industry *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, industry }))}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      formData.industry === industry
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Personality */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Brand Personality (Select multiple)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {personalityOptions.map((personality) => (
                  <button
                    key={personality}
                    type="button"
                    onClick={() => togglePersonality(personality)}
                    className={`p-2 rounded-lg border text-xs transition-all ${
                      formData.brandPersonality.includes(personality)
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    {personality}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Young professionals, families, tech enthusiasts..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.brandName.trim() || !formData.industry}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating Your Brand Kit...</span>
              </>
            ) : (
              <>
                <Package className="w-5 h-5" />
                <span>Generate Brand Kit</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <Package className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Brand Kit Generated!</h3>
            <p className="text-gray-300 mb-6">{result.message}</p>
            
            {/* Mock Brand Kit Preview */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg aspect-square flex items-center justify-center">
                <div className="text-white font-bold">{formData.brandName}</div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                <div className="h-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
                <div className="h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Download className="w-5 h-5" />
                <span>Download Kit</span>
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
              <h4 className="text-lg font-semibold text-white mb-3">Brand Kit Includes</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {result.metadata.includes?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 capitalize">{item.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandKitTool;