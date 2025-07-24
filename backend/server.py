from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
import asyncio
import random

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(
    title="Lotaya AI API",
    description="All-in-One Generative AI Platform API",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Pydantic Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class LogoGenerationRequest(BaseModel):
    brandName: str
    keywords: List[str]
    industry: Optional[str] = None
    colorPalette: Optional[List[str]] = None
    style: Optional[str] = "modern"

class VideoGenerationRequest(BaseModel):
    prompt: str
    durationSeconds: Optional[int] = 15
    style: Optional[str] = "cinematic"
    resolution: Optional[str] = "1080p"

class BrandKitRequest(BaseModel):
    brandName: str
    industry: str
    brandPersonality: Optional[List[str]] = None
    targetAudience: Optional[str] = None

class SocialContentRequest(BaseModel):
    platform: str
    contentType: str
    topic: str
    tone: Optional[str] = "professional"

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None

class WebsiteRequest(BaseModel):
    businessName: str
    businessType: str
    pages: Optional[List[str]] = ["home", "about", "services", "contact"]
    colorScheme: Optional[str] = "modern"

class VoiceRequest(BaseModel):
    text: str
    voice: Optional[str] = "female"
    language: Optional[str] = "en-US"
    speed: Optional[float] = 1.0

class PhotoEditRequest(BaseModel):
    imageUrl: str
    editType: str
    intensity: Optional[float] = 0.8

class BackgroundRemovalRequest(BaseModel):
    imageUrl: str

class DomainRequest(BaseModel):
    keywords: List[str]
    extensions: Optional[List[str]] = [".com", ".io", ".ai"]

class SloganRequest(BaseModel):
    brandName: str
    industry: str
    tone: Optional[str] = "inspiring"

class BusinessCardRequest(BaseModel):
    name: str
    title: str
    company: str
    email: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    style: Optional[str] = "modern"

class GenerationResponse(BaseModel):
    jobId: str
    status: str
    message: str
    assetUrl: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    suggestions: Optional[List[str]] = None

class DomainSuggestion(BaseModel):
    domain: str
    available: bool
    price: str

class DomainResponse(BaseModel):
    suggestions: List[DomainSuggestion]

class SloganResponse(BaseModel):
    slogans: List[str]

# Mock AI Generation Functions
async def mock_logo_generation(request: LogoGenerationRequest) -> GenerationResponse:
    """Mock logo generation with realistic delay"""
    await asyncio.sleep(2)  # Simulate processing time
    
    job_id = f"logo_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/logos/{job_id}.png"
    
    # Store job in database
    job_data = {
        "job_id": job_id,
        "type": "logo",
        "request_data": request.dict(),
        "status": "completed",
        "asset_url": mock_url,
        "created_at": datetime.utcnow()
    }
    await db.generation_jobs.insert_one(job_data)
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message=f"Professional logo generated for {request.brandName}",
        assetUrl=mock_url,
        metadata={
            "style": request.style,
            "colors": request.colorPalette or ["#1A73E8", "#FBBC05"],
            "industry": request.industry
        }
    )

async def mock_video_generation(request: VideoGenerationRequest) -> GenerationResponse:
    """Mock video generation"""
    await asyncio.sleep(3)
    
    job_id = f"video_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/videos/{job_id}.mp4"
    
    job_data = {
        "job_id": job_id,
        "type": "video",
        "request_data": request.dict(),
        "status": "completed",
        "asset_url": mock_url,
        "created_at": datetime.utcnow()
    }
    await db.generation_jobs.insert_one(job_data)
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message=f"AI video generated successfully ({request.durationSeconds}s)",
        assetUrl=mock_url,
        metadata={
            "duration": request.durationSeconds,
            "style": request.style,
            "resolution": request.resolution
        }
    )

async def mock_brand_kit_generation(request: BrandKitRequest) -> GenerationResponse:
    """Mock brand kit generation"""
    await asyncio.sleep(4)
    
    job_id = f"brandkit_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/brandkits/{job_id}.zip"
    
    job_data = {
        "job_id": job_id,
        "type": "brand_kit",
        "request_data": request.dict(),
        "status": "completed",
        "asset_url": mock_url,
        "created_at": datetime.utcnow()
    }
    await db.generation_jobs.insert_one(job_data)
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message=f"Complete brand kit generated for {request.brandName}",
        assetUrl=mock_url,
        metadata={
            "includes": ["logo", "color_palette", "typography", "brand_guidelines"],
            "industry": request.industry,
            "personality": request.brandPersonality
        }
    )

# Health and Status Endpoints
@api_router.get("/")
async def root():
    return {"message": "Lotaya AI API - All-in-One Generative AI Platform"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# AI Generation Endpoints
@api_router.post("/generate-logo", response_model=GenerationResponse)
async def generate_logo(request: LogoGenerationRequest):
    """Generate professional logos tailored to business and industry"""
    try:
        return await mock_logo_generation(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Logo generation failed: {str(e)}")

@api_router.post("/generate-video", response_model=GenerationResponse)
async def generate_video(request: VideoGenerationRequest):
    """Generate AI-powered videos from text descriptions"""
    try:
        return await mock_video_generation(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Video generation failed: {str(e)}")

@api_router.post("/generate-brand-kit", response_model=GenerationResponse)
async def generate_brand_kit(request: BrandKitRequest):
    """Generate complete brand identity package"""
    try:
        return await mock_brand_kit_generation(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Brand kit generation failed: {str(e)}")

@api_router.post("/generate-social-content", response_model=GenerationResponse)
async def generate_social_content(request: SocialContentRequest):
    """Generate platform-specific social media content"""
    await asyncio.sleep(2)
    
    job_id = f"social_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/social/{job_id}.png"
    
    job_data = {
        "job_id": job_id,
        "type": "social_content",
        "request_data": request.dict(),
        "status": "completed",
        "asset_url": mock_url,
        "created_at": datetime.utcnow()
    }
    await db.generation_jobs.insert_one(job_data)
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message=f"{request.platform.title()} {request.contentType} generated successfully",
        assetUrl=mock_url,
        metadata={
            "platform": request.platform,
            "content_type": request.contentType,
            "tone": request.tone
        }
    )

@api_router.post("/chat-assistant", response_model=ChatResponse)
async def chat_assistant(request: ChatRequest):
    """AI chat assistant for creative guidance"""
    await asyncio.sleep(1)
    
    # Mock responses based on message content
    if "logo" in request.message.lower():
        response = "I'd love to help you create a stunning logo! What's your brand name and what industry are you in? Also, do you have any color preferences or style ideas?"
        suggestions = ["Tell me about your brand personality", "What's your target audience?", "Do you have competitor logos you like?"]
    elif "brand" in request.message.lower():
        response = "Building a strong brand identity is exciting! Let's start with your brand's core values and mission. What makes your business unique?"
        suggestions = ["Define your brand personality", "Identify your target market", "Choose your brand colors"]
    elif "video" in request.message.lower():
        response = "Video content is incredibly powerful for engagement! What type of video are you looking to create? Is it for marketing, education, or entertainment?"
        suggestions = ["Describe your video concept", "What's your target duration?", "What style appeals to you?"]
    else:
        response = "I'm here to help with all your creative design needs! Whether it's logos, videos, social media content, or complete brand kits, I can guide you through the process. What would you like to create today?"
        suggestions = ["Generate a logo", "Create video content", "Design social media posts", "Build a brand kit"]
    
    return ChatResponse(
        response=response,
        suggestions=suggestions
    )

@api_router.post("/generate-website", response_model=GenerationResponse)
async def generate_website(request: WebsiteRequest):
    """Generate website concept and layout"""
    await asyncio.sleep(3)
    
    job_id = f"website_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/websites/{job_id}.html"
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message=f"Website concept generated for {request.businessName}",
        assetUrl=mock_url,
        metadata={
            "pages": request.pages,
            "business_type": request.businessType,
            "color_scheme": request.colorScheme
        }
    )

@api_router.post("/generate-voice", response_model=GenerationResponse)
async def generate_voice(request: VoiceRequest):
    """Convert text to lifelike speech"""
    await asyncio.sleep(2)
    
    job_id = f"voice_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/audio/{job_id}.mp3"
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message="High-quality voice audio generated",
        assetUrl=mock_url,
        metadata={
            "voice": request.voice,
            "language": request.language,
            "duration": len(request.text) * 0.1  # Rough estimate
        }
    )

@api_router.post("/edit-photo", response_model=GenerationResponse)
async def edit_photo(request: PhotoEditRequest):
    """AI-powered photo editing and enhancement"""
    await asyncio.sleep(2)
    
    job_id = f"photo_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/photos/{job_id}.jpg"
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message=f"Photo {request.editType} completed successfully",
        assetUrl=mock_url,
        metadata={
            "edit_type": request.editType,
            "intensity": request.intensity,
            "original_url": request.imageUrl
        }
    )

@api_router.post("/remove-background", response_model=GenerationResponse)
async def remove_background(request: BackgroundRemovalRequest):
    """Remove background from images with one click"""
    await asyncio.sleep(1)
    
    job_id = f"bg_remove_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/backgrounds/{job_id}.png"
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message="Background removed successfully",
        assetUrl=mock_url,
        metadata={
            "original_url": request.imageUrl,
            "format": "PNG with transparency"
        }
    )

@api_router.post("/generate-domain", response_model=DomainResponse)
async def generate_domain(request: DomainRequest):
    """Generate domain name suggestions"""
    await asyncio.sleep(1)
    
    suggestions = []
    base_combinations = [
        "".join(request.keywords),
        "".join(request.keywords[:2]),
        request.keywords[0] + "hub",
        request.keywords[0] + "pro",
        "get" + request.keywords[0],
        request.keywords[0] + "ly"
    ]
    
    for combo in base_combinations[:6]:
        for ext in request.extensions:
            suggestions.append(DomainSuggestion(
                domain=combo.lower() + ext,
                available=random.choice([True, False]),
                price=f"${random.randint(10, 50)}.99/year"
            ))
    
    return DomainResponse(suggestions=suggestions[:10])

@api_router.post("/generate-slogan", response_model=SloganResponse)
async def generate_slogan(request: SloganRequest):
    """Create catchy brand slogans and taglines"""
    await asyncio.sleep(1)
    
    # Mock slogans based on industry and tone
    industry_templates = {
        "technology": [
            f"Innovate with {request.brandName}",
            f"The Future is {request.brandName}",
            f"Powered by {request.brandName}",
            f"Transform Tomorrow with {request.brandName}",
            f"Where Innovation Meets Excellence"
        ],
        "creative": [
            f"Unleash Creativity with {request.brandName}",
            f"Design Beyond Limits",
            f"Create. Inspire. {request.brandName}.",
            f"Your Creative Partner",
            f"Imagination Unleashed"
        ],
        "business": [
            f"Excellence Delivered by {request.brandName}",
            f"Your Success, Our Mission",
            f"Building Better Business",
            f"Solutions That Work",
            f"Success Starts Here"
        ]
    }
    
    slogans = industry_templates.get(request.industry.lower(), [
        f"Experience {request.brandName}",
        f"Quality You Can Trust",
        f"Making a Difference",
        f"Your Partner in Success",
        f"Excellence Every Time"
    ])
    
    return SloganResponse(slogans=slogans)

@api_router.post("/generate-business-card", response_model=GenerationResponse)
async def generate_business_card(request: BusinessCardRequest):
    """Design professional business cards"""
    await asyncio.sleep(2)
    
    job_id = f"card_{str(uuid.uuid4())[:8]}"
    mock_url = f"https://storage.googleapis.com/lotaya-assets/cards/{job_id}.pdf"
    
    return GenerationResponse(
        jobId=job_id,
        status="completed",
        message=f"Professional business card designed for {request.name}",
        assetUrl=mock_url,
        metadata={
            "style": request.style,
            "includes": ["front_design", "back_design", "print_ready_pdf"],
            "contact_info": {
                "name": request.name,
                "title": request.title,
                "company": request.company
            }
        }
    )

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)