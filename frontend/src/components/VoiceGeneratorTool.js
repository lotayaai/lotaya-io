import React, { useState } from 'react';
import { Mic, Download, Sparkles, Loader, Play, Pause } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VoiceGeneratorTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    text: '',
    voice: 'female',
    language: 'en-US',
    speed: 1.0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const voices = [
    { value: 'male', label: 'Male Voice', description: 'Professional male narrator' },
    { value: 'female', label: 'Female Voice', description: 'Clear female narrator' },
    { value: 'neutral', label: 'Neutral Voice', description: 'Gender-neutral voice' }
  ];

  const languages = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'fr-FR', label: 'French' },
    { value: 'de-DE', label: 'German' },
    { value: 'it-IT', label: 'Italian' },
    { value: 'pt-BR', label: 'Portuguese' },
    { value: 'ja-JP', label: 'Japanese' }
  ];

  const textSuggestions = [
    "Welcome to our company. We're excited to work with you and help you achieve your goals.",
    "Thank you for choosing our services. Your satisfaction is our top priority.",
    "Hello and welcome! Let me guide you through our amazing features and capabilities.",
    "This is a test of our AI voice generation technology. The quality is truly remarkable.",
    "Professional voice-over for your videos, presentations, and marketing materials."
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'speed' ? parseFloat(value) : value
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      text: suggestion
    }));
  };

  const handleGenerate = async () => {
    if (!formData.text.trim()) {
      setError('Please enter text to convert to speech');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post(`${API}/generate-voice`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate voice. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Mock audio play/pause functionality
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleDownload = () => {
    if (result?.assetUrl) {
      window.open(result.assetUrl, '_blank');
    }
  };

  const handleTryAnother = () => {
    setResult(null);
    setError('');
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <div className="space-y-6">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Text to Convert *
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Enter the text you want to convert to speech..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.text.length} characters
              </div>
            </div>

            {/* Text Suggestions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Quick Suggestions
              </label>
              <div className="space-y-2">
                {textSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full p-3 text-left bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:border-white/20 hover:bg-white/10 transition-all text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Voice Type
                </label>
                <div className="space-y-2">
                  {voices.map((voice) => (
                    <button
                      key={voice.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, voice: voice.value }))}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        formData.voice === voice.value
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      <div className="font-medium text-sm">{voice.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{voice.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Language
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {languages.map((language) => (
                    <button
                      key={language.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, language: language.value }))}
                      className={`w-full p-3 rounded-lg border text-center transition-all ${
                        formData.language === language.value
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Control */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Speed: {formData.speed}x
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    name="speed"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={formData.speed}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0.5x (Slow)</span>
                    <span>1.0x (Normal)</span>
                    <span>2.0x (Fast)</span>
                  </div>
                </div>
                
                {/* Preview Settings */}
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Preview Settings:</div>
                  <div className="text-sm text-white">
                    <div>Voice: <span className="text-indigo-300 capitalize">{formData.voice}</span></div>
                    <div>Language: <span className="text-indigo-300">{languages.find(l => l.value === formData.language)?.label}</span></div>
                    <div>Speed: <span className="text-indigo-300">{formData.speed}x</span></div>
                  </div>
                </div>
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
            disabled={isGenerating || !formData.text.trim()}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating Voice...</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span>Generate Voice</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <Mic className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Voice Generated!</h3>
            <p className="text-gray-300 mb-6">{result.message}</p>
            
            {/* Mock Audio Player */}
            <div className="w-full max-w-md mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-semibold">Audio Preview</div>
                <div className="text-white/80 text-sm">
                  {result.metadata?.duration ? `${Math.round(result.metadata.duration)}s` : '0:00'}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>
                
                <div className="flex-1 h-2 bg-white/20 rounded-full">
                  <div 
                    className={`h-full bg-white rounded-full transition-all duration-1000 ${
                      isPlaying ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              </div>
              
              <div className="text-white/80 text-sm mt-4 text-left">
                <div>Voice: <span className="capitalize">{formData.voice}</span></div>
                <div>Language: {languages.find(l => l.value === formData.language)?.label}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Download className="w-5 h-5" />
                <span>Download Audio</span>
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
              <h4 className="text-lg font-semibold text-white mb-3">Audio Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Voice:</span>
                  <span className="text-white capitalize">{result.metadata.voice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white">{result.metadata.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{result.metadata.duration ? `${Math.round(result.metadata.duration)}s` : 'N/A'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceGeneratorTool;