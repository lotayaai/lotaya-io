# Lotaya AI: All-in-One Generative AI Platform

## Unleash Your Creativity with AI-Powered Design – Powered by Google Cloud, Docker, YAML & Swagger

Lotaya AI is a cutting-edge, all-in-one generative AI platform designed to transform your ideas into stunning visual and multimedia content in seconds. From unique logos and professional marketing materials to captivating social media videos, Lotaya AI leverages the power of Google Cloud's advanced AI services (e.g., Vertex AI, Gemini, Imagen, Veo, Lyria) and integrates with Docker for containerization, YAML for configuration, and Swagger/OpenAPI for API documentation. Built with a modern frontend stack and robust backend infrastructure, it offers a seamless, futuristic, and highly responsive user interface.

## Showcase of Tools

Lotaya AI offers a comprehensive suite of AI-powered design tools:

*   **Logo Generator:** Instantly create professional logos tailored to your business, keywords, and industry.
*   **AI Video Generator:** Generate short, professional videos from text or bring your images to life with advanced AI models.
*   **Brand Kit:** Generate a logo, color palette, and fonts in one click for consistent branding.
*   **Social Media Content:** Generate platform-specific posts, banners, and covers with AI copy.
*   **AI Assistant:** Chat for creative ideas, branding tips, and design help.
*   **Website Generator:** Build a full website concept with AI-generated content and layouts.
*   **AI Voice Generator:** Transform text into lifelike, high-quality audio.
*   **Photo Editor:** Enhance, upscale, or magically edit your photos.
*   **Background Remover:** Instantly remove image backgrounds with one click.
*   **Domain Generator:** Find the perfect, available domain name for your idea.
*   **Slogan Maker:** Craft the perfect, catchy tagline for your brand.
*   **Business Cards:** Design professional business cards and other marketing materials.

## Technology Stack & Architecture

Lotaya AI is built with a modern, scalable, and robust architecture, heavily leveraging Google Cloud services.

### Frontend

*   **Framework:** React (Create React App) with advanced routing and state management
*   **Styling:** Tailwind CSS, PostCSS, Autoprefixer for modern responsive design
*   **UI Components:** Custom React components with advanced patterns
*   **Animations:** GSAP for smooth and engaging user experiences
*   **3D Visuals:** Three.js integration for immersive 3D hero sections and backgrounds
*   **State Management:** React Context API and hooks for efficient state management

### Backend & AI Services

*   **Backend Framework:** FastAPI for high-performance API development
*   **Database:** MongoDB with Motor async driver for scalable data storage
*   **Containerization:** Docker for consistent deployment environments
*   **API Documentation:** Swagger/OpenAPI for comprehensive API documentation
*   **AI & Machine Learning:**
    *   Vertex AI integration for generative AI capabilities
    *   Gemini for text generation and chat functionality
    *   Imagen for image generation and logo creation
    *   Veo for video generation capabilities
    *   Cloud Vision API for image analysis and background removal
    *   Cloud Text-to-Speech API for AI voice generation

### Example Architecture Flow (Logo Generator)

1.  **User Request (Frontend):** User inputs brand name and keywords into the Logo Generator UI.
2.  **API Call:** The frontend sends a request to FastAPI backend (`/api/generate-logo`).
3.  **AI Processing:** The backend processes the request using AI services (Vertex AI/Gemini).
4.  **Asset Generation:** AI generates the logo based on the provided parameters.
5.  **Storage:** Generated assets are stored and metadata saved to MongoDB.
6.  **Response:** The backend returns the generated asset URL and job status.
7.  **Display:** The frontend displays the generated logo with smooth GSAP animations.

### Docker Integration

*   **Frontend:** Dockerfile for building production-ready React application
*   **Backend:** Separate Dockerfile for FastAPI backend with all dependencies
*   **Docker Compose:** Multi-container setup for local development environment
*   **Production Ready:** Optimized containers for deployment on any platform

### Swagger/OpenAPI Documentation

*   **Comprehensive API Docs:** Complete OpenAPI specification for all endpoints
*   **Interactive Testing:** Built-in Swagger UI for API testing and exploration
*   **Schema Definitions:** Detailed request/response schemas for all AI tools
*   **Authentication:** JWT-based security schemes and endpoint protection

## Project Structure

```
lotaya-ai/
├── backend/                    # FastAPI backend
│   ├── server.py              # Main FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   └── models/                # Pydantic models
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── AiChatWidget.js
│   │   │   ├── AiTools.js
│   │   │   ├── AIVideoGeneratorTool.js
│   │   │   ├── AuthModal.js
│   │   │   ├── BackgroundRemoverTool.js
│   │   │   ├── Benefits.js
│   │   │   ├── BrandKitTool.js
│   │   │   ├── BusinessCardsTool.js
│   │   │   ├── ComingSoonTool.js
│   │   │   ├── CreditsView.js
│   │   │   ├── DomainGeneratorTool.js
│   │   │   ├── Features.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── Hero3D.js
│   │   │   ├── LanguageSwitcher.js
│   │   │   ├── LogoGeneratorTool.js
│   │   │   ├── Modal.js
│   │   │   ├── NameGenerator.js
│   │   │   ├── PageTransition.js
│   │   │   ├── Showcase.js
│   │   │   ├── SloganMakerTool.js
│   │   │   ├── SocialMedia3D.js
│   │   │   ├── SocialMediaTool.js
│   │   │   └── VideoGenerator.js
│   │   ├── App.js             # Main App component
│   │   ├── App.css            # Global styles
│   │   ├── index.js           # Entry point
│   │   └── index.css          # Tailwind CSS imports
│   ├── public/                # Static assets
│   ├── package.json           # Dependencies and scripts
│   └── .env                   # Environment variables
├── Dockerfile                 # Frontend Docker configuration
├── docker-compose.yml         # Multi-container setup
├── swagger.yaml              # OpenAPI specification
└── README.md                 # This documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud instance)
- Docker and Docker Compose (optional)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/lotaya-ai.git
   cd lotaya-ai
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   # Configure .env file with your MongoDB URL
   python server.py
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   yarn install
   yarn start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001
   - API Documentation: http://localhost:8001/docs

### Docker Deployment

```bash
docker-compose up --build
```

## API Endpoints

### AI Generation Tools

- `POST /api/generate-logo` - Generate professional logos
- `POST /api/generate-video` - Create AI-powered videos
- `POST /api/generate-brand-kit` - Complete brand identity package
- `POST /api/generate-social-content` - Social media posts and banners
- `POST /api/chat-assistant` - AI chat for creative guidance
- `POST /api/generate-website` - Full website concepts
- `POST /api/generate-voice` - Text-to-speech conversion
- `POST /api/edit-photo` - AI photo enhancement
- `POST /api/remove-background` - Background removal service
- `POST /api/generate-domain` - Domain name suggestions
- `POST /api/generate-slogan` - Brand tagline creation
- `POST /api/generate-business-card` - Business card designs

### Utility Endpoints

- `GET /api/` - Health check
- `GET /api/status` - System status
- `POST /api/status` - Create status check

## Features

### Core AI Tools (12 Tools)

1. **Logo Generator** - Professional logo creation with industry-specific designs
2. **Video Generator** - Short-form video content with cinematic quality
3. **Brand Kit** - Complete branding package with logos, colors, and fonts
4. **Social Media Content** - Platform-optimized posts and visuals
5. **AI Assistant** - Creative guidance and design recommendations
6. **Website Generator** - Full website concepts with modern layouts
7. **Voice Generator** - High-quality text-to-speech conversion
8. **Photo Editor** - AI-powered image enhancement and editing
9. **Background Remover** - One-click background removal
10. **Domain Generator** - Smart domain name suggestions
11. **Slogan Maker** - Catchy tagline and slogan creation
12. **Business Cards** - Professional business card designs

### Technical Features

- **Responsive Design** - Works perfectly on all devices
- **Real-time Processing** - Fast AI generation with progress tracking
- **Modern Animations** - Smooth GSAP-powered user interactions
- **3D Visuals** - Immersive Three.js hero sections
- **API Documentation** - Complete Swagger/OpenAPI documentation
- **Containerized** - Docker support for easy deployment
- **Scalable Architecture** - Built for high-performance production use

## Configuration

### Environment Variables

**Frontend (.env):**
```
REACT_APP_BACKEND_URL=your-backend-url
WDS_SOCKET_PORT=443
```

**Backend (.env):**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=lotaya_ai
GOOGLE_CLOUD_PROJECT_ID=your-project-id
VERTEX_AI_LOCATION=us-central1
```

### AI Service Integration

To enable full AI functionality, configure the following services:

1. **Google Cloud Vertex AI** - For advanced AI generation
2. **Cloud Vision API** - For image analysis
3. **Cloud Text-to-Speech** - For voice generation
4. **Cloud Storage** - For asset storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Contact: support@lotaya.io
- Documentation: https://docs.lotaya.io

---

**Lotaya AI** - Transforming creativity through artificial intelligence.