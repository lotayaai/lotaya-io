import React, { useState } from 'react';
import { Scissors, Download, Sparkles, Loader, Upload } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BackgroundRemoverTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    imageUrl: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const sampleImages = [
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Portrait photo'
    },
    {
      url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
      description: 'Fashion model'
    },
    {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      description: 'Product shot'
    },
    {
      url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      description: 'Cat portrait'
    }
  ];

  const useCases = [
    {
      title: 'E-commerce Products',
      description: 'Create clean product photos for online stores',
      icon: '🛍️'
    },
    {
      title: 'Profile Pictures',
      description: 'Professional headshots with transparent backgrounds',
      icon: '👤'
    },
    {
      title: 'Marketing Materials',
      description: 'Isolated subjects for promotional content',
      icon: '📢'
    },
    {
      title: 'Creative Projects',
      description: 'Design elements for graphic compositions',
      icon: '🎨'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSampleImageClick = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      imageUrl
    }));
  };

  const handleGenerate = async () => {
    if (!formData.imageUrl.trim()) {
      setError('Please enter an image URL or select a sample image');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post(`${API}/remove-background`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to remove background. Please try again.');
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
            {/* Info Section */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">One-Click Background Removal</h3>
              <p className="text-gray-300 text-sm">
                Upload any image and our AI will automatically detect and remove the background, 
                giving you a clean PNG with transparency.
              </p>
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL *
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                />
                <button className="btn-secondary px-4 py-3 flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </button>
              </div>
            </div>

            {/* Sample Images */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Try with Sample Images
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sampleImages.map((sample, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSampleImageClick(sample.url)}
                    className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      formData.imageUrl === sample.url
                        ? 'border-indigo-400 ring-2 ring-indigo-400/50'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={sample.url}
                      alt={sample.description}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-white text-xs">{sample.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Perfect For
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="text-2xl">{useCase.icon}</div>
                    <div>
                      <div className="text-white font-medium text-sm">{useCase.title}</div>
                      <div className="text-gray-400 text-xs mt-1">{useCase.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            {formData.imageUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Image Preview
                </label>
                <div className="relative max-w-md mx-auto">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full rounded-lg border border-white/10"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      setError('Invalid image URL. Please check the URL and try again.');
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    Ready for processing
                  </div>
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
            disabled={isGenerating || !formData.imageUrl.trim()}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Removing Background...</span>
              </>
            ) : (
              <>
                <Scissors className="w-5 h-5" />
                <span>Remove Background</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <Scissors className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Background Removed!</h3>
            <p className="text-gray-300 mb-6">{result.message}</p>
            
            {/* Before/After Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-400 mb-2">Before</div>
                <img
                  src={formData.imageUrl}
                  alt="Before"
                  className="w-full rounded-lg border border-white/10"
                />
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">After (Transparent Background)</div>
                <div className="w-full aspect-square relative rounded-lg border border-white/10 overflow-hidden">
                  {/* Checkered background to show transparency */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, #ccc 25%, transparent 25%),
                        linear-gradient(-45deg, #ccc 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #ccc 75%),
                        linear-gradient(-45deg, transparent 75%, #ccc 75%)
                      `,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-24 h-32 flex items-center justify-center text-white font-bold">
                      Subject
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Download className="w-5 h-5" />
                <span>Download PNG</span>
              </button>
              
              <button
                onClick={handleTryAnother}
                className="btn-secondary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Sparkles className="w-5 h-5" />
                <span>Process Another</span>
              </button>
            </div>
          </div>

          {result.metadata && (
            <div className="text-left bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Processing Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Format:</span>
                  <span className="text-white">{result.metadata.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Original:</span>
                  <span className="text-white text-xs truncate max-w-40">{result.metadata.original_url}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Quality:</span>
                  <span className="text-green-400 flex items-center space-x-1">
                    <span>High</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BackgroundRemoverTool;