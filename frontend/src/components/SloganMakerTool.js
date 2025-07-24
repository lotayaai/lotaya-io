import React, { useState } from 'react';
import { Type, Download, Sparkles, Loader, Copy, Heart } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SloganMakerTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    brandName: '',
    industry: '',
    tone: 'inspiring'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Food & Beverage', 'Real Estate', 'Consulting', 'Entertainment',
    'Fashion', 'Travel', 'Automotive', 'Non-profit', 'Sports & Fitness'
  ];

  const tones = [
    { 
      value: 'professional', 
      label: 'Professional', 
      description: 'Serious, trustworthy, corporate',
      example: '"Excellence in Every Detail"'
    },
    { 
      value: 'playful', 
      label: 'Playful', 
      description: 'Fun, energetic, approachable',
      example: '"Making Life More Fun"'
    },
    { 
      value: 'inspiring', 
      label: 'Inspiring', 
      description: 'Motivational, uplifting, aspirational',
      example: '"Dream. Achieve. Inspire."'
    },
    { 
      value: 'bold', 
      label: 'Bold', 
      description: 'Confident, powerful, assertive',
      example: '"Redefining Possible"'
    }
  ];

  const sloganExamples = [
    { brand: 'Nike', slogan: 'Just Do It', industry: 'Sports' },
    { brand: 'Apple', slogan: 'Think Different', industry: 'Technology' },
    { brand: 'McDonald\'s', slogan: 'I\'m Lovin\' It', industry: 'Food' },
    { brand: 'BMW', slogan: 'The Ultimate Driving Machine', industry: 'Automotive' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      const response = await axios.post(`${API}/generate-slogan`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate slogans. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (slogan, index) => {
    try {
      await navigator.clipboard.writeText(slogan);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy slogan');
    }
  };

  const toggleFavorite = (slogan, index) => {
    setFavorites(prev => {
      const key = `${index}-${slogan}`;
      return prev.includes(key)
        ? prev.filter(fav => fav !== key)
        : [...prev, key];
    });
  };

  const isFavorite = (slogan, index) => {
    return favorites.includes(`${index}-${slogan}`);
  };

  const handleTryAnother = () => {
    setResult(null);
    setError('');
    setFavorites([]);
    setCopiedIndex(null);
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <div className="space-y-6">
            {/* Info Section */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/20 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Catchy Slogan Generator</h3>
              <p className="text-gray-300 text-sm">
                Create memorable taglines that capture your brand's essence and connect with your audience.
              </p>
            </div>

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

            {/* Tone Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Tone & Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tones.map((tone) => (
                  <button
                    key={tone.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, tone: tone.value }))}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      formData.tone === tone.value
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">{tone.label}</div>
                    <div className="text-xs text-gray-400 mb-2">{tone.description}</div>
                    <div className="text-xs italic text-indigo-300">{tone.example}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Famous Examples */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Inspiration from Famous Slogans
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sloganExamples.map((example, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-white font-medium text-sm">{example.brand}</div>
                      <div className="text-xs text-gray-500">{example.industry}</div>
                    </div>
                    <div className="text-indigo-300 text-sm italic">"{example.slogan}"</div>
                  </div>
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
            disabled={isGenerating || !formData.brandName.trim() || !formData.industry}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating Perfect Slogans...</span>
              </>
            ) : (
              <>
                <Type className="w-5 h-5" />
                <span>Generate Slogans</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Type className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Slogans Generated!</h3>
            <p className="text-gray-300">Here are catchy taglines for {formData.brandName}</p>
          </div>

          {/* Generated Slogans */}
          <div className="space-y-3">
            {result.slogans?.map((slogan, index) => (
              <div
                key={index}
                className="group p-4 bg-white/5 border border-white/10 rounded-lg hover:border-indigo-400/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white font-medium text-lg mb-1">"{slogan}"</div>
                    <div className="text-gray-400 text-sm">
                      {formData.tone.charAt(0).toUpperCase() + formData.tone.slice(1)} tone • {formData.industry}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleFavorite(slogan, index)}
                      className={`p-2 rounded-lg transition-all ${
                        isFavorite(slogan, index)
                          ? 'text-red-400 bg-red-400/10'
                          : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                      }`}
                      title="Add to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(slogan, index) ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => handleCopy(slogan, index)}
                      className={`p-2 rounded-lg transition-all ${
                        copiedIndex === index
                          ? 'text-green-400 bg-green-400/10'
                          : 'text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/10'
                      }`}
                      title="Copy slogan"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {copiedIndex === index && (
                  <div className="mt-2 text-green-400 text-xs">✓ Copied to clipboard!</div>
                )}
              </div>
            ))}
          </div>

          {/* Favorites Summary */}
          {favorites.length > 0 && (
            <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>Your Favorites ({favorites.length})</span>
              </h4>
              <div className="text-gray-300 text-sm">
                You've marked {favorites.length} slogan{favorites.length !== 1 ? 's' : ''} as favorites. 
                Great choices for your brand!
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleTryAnother}
              className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate More</span>
            </button>
            
            <button className="btn-secondary flex items-center justify-center space-x-2 px-6 py-3">
              <Download className="w-5 h-5" />
              <span>Export Favorites</span>
            </button>
          </div>

          {/* Tips */}
          <div className="bg-orange-500/10 border border-orange-400/20 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">💡 Slogan Tips</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Keep it short and memorable (3-5 words work best)</li>
              <li>• Make it unique to your brand and industry</li>
              <li>• Test how it sounds when spoken aloud</li>
              <li>• Ensure it translates well across different markets</li>
              <li>• Consider trademark availability for your favorites</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SloganMakerTool;