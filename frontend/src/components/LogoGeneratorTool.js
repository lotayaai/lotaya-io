import React, { useState } from 'react';
import { Palette, Download, Sparkles, Loader } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LogoGeneratorTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    brandName: '',
    keywords: '',
    industry: '',
    style: 'modern',
    colorPalette: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const styles = [
    { value: 'modern', label: 'Modern', description: 'Clean, contemporary design' },
    { value: 'classic', label: 'Classic', description: 'Timeless, traditional style' },
    { value: 'minimalist', label: 'Minimalist', description: 'Simple, clean aesthetics' },
    { value: 'abstract', label: 'Abstract', description: 'Creative, artistic approach' },
    { value: 'playful', label: 'Playful', description: 'Fun, energetic design' }
  ];

  const colorPresets = [
    { name: 'Tech Blue', colors: ['#1A73E8', '#4285F4', '#34A853'] },
    { name: 'Creative Purple', colors: ['#6366F1', '#8B5CF6', '#EC4899'] },
    { name: 'Professional Gray', colors: ['#374151', '#6B7280', '#9CA3AF'] },
    { name: 'Energy Orange', colors: ['#F59E0B', '#EF4444', '#F97316'] },
    { name: 'Nature Green', colors: ['#10B981', '#059669', '#047857'] }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorPresetSelect = (colors) => {
    setFormData(prev => ({
      ...prev,
      colorPalette: colors
    }));
  };

  const handleGenerate = async () => {
    if (!formData.brandName.trim()) {
      setError('Please enter a brand name');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const keywords = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const response = await axios.post(`${API}/generate-logo`, {
        brandName: formData.brandName,
        keywords: keywords.length > 0 ? keywords : [formData.brandName],
        industry: formData.industry || undefined,
        colorPalette: formData.colorPalette.length > 0 ? formData.colorPalette : undefined,
        style: formData.style
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate logo. Please try again.');
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
          {/* Form */}
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

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Keywords
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="AI, technology, innovation (comma separated)"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                placeholder="Technology, Healthcare, Finance, etc."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Design Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, style: style.value }))}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      formData.style === style.value
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium">{style.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Color Palette
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleColorPresetSelect(preset.colors)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      JSON.stringify(formData.colorPalette) === JSON.stringify(preset.colors)
                        ? 'border-indigo-400 bg-indigo-400/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{preset.name}</span>
                    </div>
                    <div className="flex space-x-1">
                      {preset.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.brandName.trim()}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating Your Logo...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Logo</span>
              </>
            )}
          </button>
        </>
      ) : (
        /* Result Display */
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <Palette className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Logo Generated Successfully!</h3>
            <p className="text-gray-300 mb-4">{result.message}</p>
            
            {/* Mock Logo Preview */}
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-white font-bold text-2xl">{formData.brandName}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Download className="w-5 h-5" />
                <span>Download Logo</span>
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

          {/* Metadata */}
          {result.metadata && (
            <div className="text-left bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Logo Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Style:</span>
                  <span className="text-white capitalize">{result.metadata.style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Industry:</span>
                  <span className="text-white">{result.metadata.industry || 'General'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Colors:</span>
                  <div className="flex space-x-1">
                    {result.metadata.colors?.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogoGeneratorTool;