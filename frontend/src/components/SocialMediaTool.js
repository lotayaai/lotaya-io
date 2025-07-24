import React, { useState } from 'react';
import { Share2, Download, Sparkles, Loader, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SocialMediaTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    platform: 'instagram',
    contentType: 'post',
    topic: '',
    tone: 'professional'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
    { value: 'facebook', label: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' },
    { value: 'twitter', label: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-500' },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800' }
  ];

  const contentTypes = [
    { value: 'post', label: 'Post', description: 'Regular social media post' },
    { value: 'story', label: 'Story', description: 'Story format content' },
    { value: 'banner', label: 'Banner', description: 'Header/cover image' },
    { value: 'cover', label: 'Cover', description: 'Profile cover image' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Business-focused tone' },
    { value: 'casual', label: 'Casual', description: 'Friendly, relaxed tone' },
    { value: 'energetic', label: 'Energetic', description: 'Exciting, motivational' },
    { value: 'informative', label: 'Informative', description: 'Educational, helpful' }
  ];

  const topicSuggestions = [
    "AI innovation in 2025",
    "Remote work productivity tips",
    "Sustainable business practices",
    "Digital marketing trends",
    "Team collaboration strategies",
    "Customer success stories",
    "Product launch announcement",
    "Industry insights and analysis"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      topic: suggestion
    }));
  };

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      setError('Please enter a topic for your social media content');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post(`${API}/generate-social-content`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate social content. Please try again.');
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

  const selectedPlatform = platforms.find(p => p.value === formData.platform);

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <div className="space-y-6">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Platform
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {platforms.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <button
                      key={platform.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, platform: platform.value }))}
                      className={`p-4 rounded-lg border transition-all ${
                        formData.platform === platform.value
                          ? 'border-indigo-400 bg-indigo-400/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto mb-2 p-1.5 rounded bg-gradient-to-r ${platform.color}`}>
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                      <div className="text-sm text-white font-medium">{platform.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Content Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, contentType: type.value }))}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      formData.contentType === type.value
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Topic *
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="What do you want to post about?"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>

            {/* Topic Suggestions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Popular Topics
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topicSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 text-left bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:border-white/20 hover:bg-white/10 transition-all text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Tone
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tones.map((tone) => (
                  <button
                    key={tone.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, tone: tone.value }))}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      formData.tone === tone.value
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium text-sm">{tone.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{tone.description}</div>
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
            disabled={isGenerating || !formData.topic.trim()}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating {selectedPlatform?.label} Content...</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                <span>Generate Content</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <Share2 className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Content Generated!</h3>
            <p className="text-gray-300 mb-6">{result.message}</p>
            
            {/* Mock Content Preview */}
            <div className={`w-full max-w-sm mx-auto bg-gradient-to-br ${selectedPlatform?.color} rounded-2xl p-6 mb-6`}>
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <div className="text-white font-semibold text-left">{formData.topic}</div>
              </div>
              <div className="flex items-center justify-between text-white/80 text-sm">
                <span>{selectedPlatform?.label}</span>
                <span>{formData.contentType}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Download className="w-5 h-5" />
                <span>Download Content</span>
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
              <h4 className="text-lg font-semibold text-white mb-3">Content Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform:</span>
                  <span className="text-white capitalize">{result.metadata.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white capitalize">{result.metadata.content_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tone:</span>
                  <span className="text-white capitalize">{result.metadata.tone}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialMediaTool;