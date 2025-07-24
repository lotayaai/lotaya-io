import React, { useState } from 'react';
import { Search, Download, Sparkles, Loader, ExternalLink, Check, X } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DomainGeneratorTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    keywords: '',
    extensions: ['.com', '.io', '.ai']
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const availableExtensions = [
    { value: '.com', label: '.com', popular: true },
    { value: '.io', label: '.io', popular: true },
    { value: '.ai', label: '.ai', popular: true },
    { value: '.co', label: '.co', popular: false },
    { value: '.net', label: '.net', popular: false },
    { value: '.org', label: '.org', popular: false },
    { value: '.app', label: '.app', popular: false },
    { value: '.dev', label: '.dev', popular: false },
    { value: '.tech', label: '.tech', popular: false },
    { value: '.me', label: '.me', popular: false },
    { value: '.xyz', label: '.xyz', popular: false },
    { value: '.store', label: '.store', popular: false }
  ];

  const keywordSuggestions = [
    'AI, tech, innovation',
    'creative, design, studio',
    'smart, solution, app',
    'digital, marketing, agency',
    'cloud, data, analytics',
    'startup, venture, lab'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleExtension = (extension) => {
    setFormData(prev => ({
      ...prev,
      extensions: prev.extensions.includes(extension)
        ? prev.extensions.filter(ext => ext !== extension)
        : [...prev.extensions, extension]
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      keywords: suggestion
    }));
  };

  const handleGenerate = async () => {
    if (!formData.keywords.trim()) {
      setError('Please enter keywords for domain generation');
      return;
    }

    if (formData.extensions.length === 0) {
      setError('Please select at least one domain extension');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const keywords = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
      const response = await axios.post(`${API}/generate-domain`, {
        keywords,
        extensions: formData.extensions
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate domains. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTryAnother = () => {
    setResult(null);
    setError('');
  };

  const handleCheckDomain = (domain) => {
    // Mock domain checking functionality
    window.open(`https://whois.net/whois/${domain}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <div className="space-y-6">
            {/* Info Section */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Smart Domain Name Generator</h3>
              <p className="text-gray-300 text-sm">
                Enter keywords related to your business, and we'll generate creative domain name 
                suggestions with availability checking.
              </p>
            </div>

            {/* Keywords Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Keywords *
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="ai, design, creative (comma separated)"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
              />
              <div className="text-xs text-gray-500 mt-1">
                Separate multiple keywords with commas
              </div>
            </div>

            {/* Keyword Suggestions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Popular Keyword Combinations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {keywordSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 text-left bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:border-white/20 hover:bg-white/10 transition-all text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain Extensions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Domain Extensions
              </label>
              
              {/* Popular Extensions */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">Popular</div>
                <div className="flex flex-wrap gap-2">
                  {availableExtensions.filter(ext => ext.popular).map((extension) => (
                    <button
                      key={extension.value}
                      type="button"
                      onClick={() => toggleExtension(extension.value)}
                      className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                        formData.extensions.includes(extension.value)
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {extension.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Other Extensions */}
              <div>
                <div className="text-xs text-gray-400 mb-2">Other Options</div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableExtensions.filter(ext => !ext.popular).map((extension) => (
                    <button
                      key={extension.value}
                      type="button"
                      onClick={() => toggleExtension(extension.value)}
                      className={`px-3 py-2 rounded-lg border text-xs transition-all ${
                        formData.extensions.includes(extension.value)
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {extension.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Summary */}
            {formData.extensions.length > 0 && (
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Selected Extensions:</div>
                <div className="flex flex-wrap gap-1">
                  {formData.extensions.map((ext, index) => (
                    <span key={index} className="inline-flex items-center space-x-1 bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded text-xs">
                      <span>{ext}</span>
                      <button
                        onClick={() => toggleExtension(ext)}
                        className="hover:text-indigo-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.keywords.trim() || formData.extensions.length === 0}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating Domain Names...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Generate Domains</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Search className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Domain Suggestions Generated!</h3>
            <p className="text-gray-300">Here are some great domain options for your project</p>
          </div>

          {/* Domain Results */}
          <div className="space-y-3">
            {result.suggestions?.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    suggestion.available ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium">{suggestion.domain}</div>
                    <div className="text-xs text-gray-400">
                      {suggestion.available ? 'Available' : 'Taken'} • {suggestion.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {suggestion.available && (
                    <span className="inline-flex items-center space-x-1 bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                      <Check className="w-3 h-3" />
                      <span>Available</span>
                    </span>
                  )}
                  <button
                    onClick={() => handleCheckDomain(suggestion.domain)}
                    className="btn-secondary px-3 py-2 text-xs flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Check</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Available vs Taken Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {result.suggestions?.filter(s => s.available).length || 0}
              </div>
              <div className="text-sm text-green-300">Available</div>
            </div>
            <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-400">
                {result.suggestions?.filter(s => !s.available).length || 0}
              </div>
              <div className="text-sm text-red-300">Taken</div>
            </div>
          </div>

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
              <span>Export List</span>
            </button>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">💡 Domain Tips</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Shorter domains are generally better for branding</li>
              <li>• Avoid hyphens and numbers when possible</li>
              <li>• Consider multiple extensions to protect your brand</li>
              <li>• Check social media handle availability too</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainGeneratorTool;