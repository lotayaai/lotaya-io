import React, { useState } from 'react';
import { Video, Download, Sparkles, Loader, Play } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VideoGeneratorTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    prompt: '',
    durationSeconds: 15,
    style: 'cinematic',
    resolution: '1080p'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const styles = [
    { value: 'cinematic', label: 'Cinematic', description: 'Movie-like quality with dramatic lighting' },
    { value: 'documentary', label: 'Documentary', description: 'Realistic, natural style' },
    { value: 'commercial', label: 'Commercial', description: 'Polished, marketing-focused' },
    { value: 'artistic', label: 'Artistic', description: 'Creative, abstract visuals' }
  ];

  const durations = [5, 10, 15, 30, 60];
  const resolutions = ['480p', '720p', '1080p', '4k'];

  const promptSuggestions = [
    "A futuristic cityscape with flying cars at sunset, cinematic style",
    "Professional office environment with diverse team collaborating",
    "Nature landscape with mountains and flowing river, peaceful atmosphere",
    "Technology startup office with modern design and innovation",
    "Abstract geometric shapes morphing and changing colors smoothly"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'durationSeconds' ? parseInt(value) : value
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      prompt: suggestion
    }));
  };

  const handleGenerate = async () => {
    if (!formData.prompt.trim()) {
      setError('Please enter a video description');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post(`${API}/generate-video`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate video. Please try again.');
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
            {/* Video Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Video Description *
              </label>
              <textarea
                name="prompt"
                value={formData.prompt}
                onChange={handleInputChange}
                placeholder="Describe the video you want to create..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
              />
            </div>

            {/* Prompt Suggestions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Quick Suggestions
              </label>
              <div className="space-y-2">
                {promptSuggestions.map((suggestion, index) => (
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
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Duration
                </label>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, durationSeconds: duration }))}
                      className={`w-full p-3 rounded-lg border text-center transition-all ${
                        formData.durationSeconds === duration
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {duration}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Style
                </label>
                <div className="space-y-2">
                  {styles.map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, style: style.value }))}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        formData.style === style.value
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      <div className="font-medium text-sm">{style.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Resolution
                </label>
                <div className="space-y-2">
                  {resolutions.map((resolution) => (
                    <button
                      key={resolution}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, resolution }))}
                      className={`w-full p-3 rounded-lg border text-center transition-all ${
                        formData.resolution === resolution
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {resolution}
                    </button>
                  ))}
                </div>
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
            disabled={isGenerating || !formData.prompt.trim()}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating Video... ({formData.durationSeconds}s)</span>
              </>
            ) : (
              <>
                <Video className="w-5 h-5" />
                <span>Generate Video</span>
              </>
            )}
          </button>
        </>
      ) : (
        /* Result Display */
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <Video className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Video Generated Successfully!</h3>
            <p className="text-gray-300 mb-4">{result.message}</p>
            
            {/* Mock Video Preview */}
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl aspect-video flex items-center justify-center mb-6 relative overflow-hidden">
              <Play className="w-16 h-16 text-white/80" />
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
                {formData.durationSeconds}s • {formData.resolution}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Download className="w-5 h-5" />
                <span>Download Video</span>
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
              <h4 className="text-lg font-semibold text-white mb-3">Video Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{result.metadata.duration}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Style:</span>
                  <span className="text-white capitalize">{result.metadata.style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolution:</span>
                  <span className="text-white">{result.metadata.resolution}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoGeneratorTool;