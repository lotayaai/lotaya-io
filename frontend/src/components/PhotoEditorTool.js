import React, { useState } from 'react';
import { Image, Download, Sparkles, Loader, Upload } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PhotoEditorTool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    editType: 'enhance',
    intensity: 0.8
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const editTypes = [
    { 
      value: 'enhance', 
      label: 'Enhance', 
      description: 'Improve overall image quality and sharpness',
      icon: '✨'
    },
    { 
      value: 'upscale', 
      label: 'Upscale', 
      description: 'Increase image resolution while maintaining quality',
      icon: '📈'
    },
    { 
      value: 'colorize', 
      label: 'Colorize', 
      description: 'Add natural colors to black and white photos',
      icon: '🎨'
    },
    { 
      value: 'restore', 
      label: 'Restore', 
      description: 'Fix old or damaged photos automatically',
      icon: '🔧'
    }
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'intensity' ? parseFloat(value) : value
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
      const response = await axios.post(`${API}/edit-photo`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to edit photo. Please try again.');
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
                Or Choose a Sample Image
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sampleImages.map((imageUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSampleImageClick(imageUrl)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      formData.imageUrl === imageUrl
                        ? 'border-indigo-400 ring-2 ring-indigo-400/50'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Edit Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Edit Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {editTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, editType: type.value }))}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      formData.editType === type.value
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Control */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Effect Intensity: {Math.round(formData.intensity * 100)}%
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  name="intensity"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={formData.intensity}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>10% (Subtle)</span>
                  <span>50% (Moderate)</span>
                  <span>100% (Strong)</span>
                </div>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end p-4">
                    <div className="text-white text-sm">
                      Ready for {editTypes.find(t => t.value === formData.editType)?.label}
                    </div>
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
                <span>Processing Image...</span>
              </>
            ) : (
              <>
                <Image className="w-5 h-5" />
                <span>Edit Photo</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <Image className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Photo Edited Successfully!</h3>
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
                <div className="text-sm text-gray-400 mb-2">After ({editTypes.find(t => t.value === formData.editType)?.label})</div>
                <div className="w-full aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg border border-white/10 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm">Enhanced Image</div>
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
                <span>Download Enhanced</span>
              </button>
              
              <button
                onClick={handleTryAnother}
                className="btn-secondary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <Sparkles className="w-5 h-5" />
                <span>Edit Another</span>
              </button>
            </div>
          </div>

          {result.metadata && (
            <div className="text-left bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Edit Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Edit Type:</span>
                  <span className="text-white capitalize">{result.metadata.edit_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Intensity:</span>
                  <span className="text-white">{Math.round(result.metadata.intensity * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Original:</span>
                  <span className="text-white text-xs truncate max-w-40">{result.metadata.original_url}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoEditorTool;