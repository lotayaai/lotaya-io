#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Lotaya AI Platform
Tests all 12 AI tool endpoints plus basic functionality
"""

import requests
import sys
import json
from datetime import datetime
import time

class LotayaAPITester:
    def __init__(self, base_url="https://74d58c5b-eb01-4edd-b53b-6b57e7c6c417.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            self.failed_tests.append(f"{name}: {details}")
            print(f"❌ {name} - FAILED: {details}")

    def test_endpoint(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Test a single API endpoint"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            start_time = time.time()
            
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)
            
            end_time = time.time()
            response_time = round(end_time - start_time, 2)
            
            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    print(f"   Status: {response.status_code} | Time: {response_time}s")
                    print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}")
                    self.log_test(name, True)
                    return True, response_data
                except json.JSONDecodeError:
                    self.log_test(name, False, f"Invalid JSON response")
                    return False, {}
            else:
                self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}")
                return False, {}

        except requests.exceptions.Timeout:
            self.log_test(name, False, f"Request timeout after {timeout}s")
            return False, {}
        except requests.exceptions.ConnectionError:
            self.log_test(name, False, "Connection error")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_basic_endpoints(self):
        """Test basic API endpoints"""
        print("\n" + "="*60)
        print("TESTING BASIC ENDPOINTS")
        print("="*60)
        
        # Test root endpoint
        self.test_endpoint("API Root", "GET", "", 200)
        
        # Test status creation
        status_data = {"client_name": f"test_client_{int(time.time())}"}
        self.test_endpoint("Create Status Check", "POST", "status", 200, status_data)
        
        # Test status retrieval
        self.test_endpoint("Get Status Checks", "GET", "status", 200)

    def test_ai_generation_endpoints(self):
        """Test all 12 AI generation endpoints"""
        print("\n" + "="*60)
        print("TESTING AI GENERATION ENDPOINTS")
        print("="*60)
        
        # 1. Logo Generator
        logo_data = {
            "brandName": "TestBrand",
            "keywords": ["modern", "tech"],
            "industry": "technology",
            "colorPalette": ["#1A73E8", "#FBBC05"],
            "style": "modern"
        }
        self.test_endpoint("Logo Generator", "POST", "generate-logo", 200, logo_data)
        
        # 2. Video Generator
        video_data = {
            "prompt": "A futuristic city with flying cars",
            "durationSeconds": 15,
            "style": "cinematic",
            "resolution": "1080p"
        }
        self.test_endpoint("Video Generator", "POST", "generate-video", 200, video_data)
        
        # 3. Brand Kit Generator
        brand_kit_data = {
            "brandName": "TestBrand",
            "industry": "technology",
            "brandPersonality": ["innovative", "trustworthy"],
            "targetAudience": "tech professionals"
        }
        self.test_endpoint("Brand Kit Generator", "POST", "generate-brand-kit", 200, brand_kit_data)
        
        # 4. Social Media Content
        social_data = {
            "platform": "instagram",
            "contentType": "post",
            "topic": "AI technology trends",
            "tone": "professional"
        }
        self.test_endpoint("Social Media Generator", "POST", "generate-social-content", 200, social_data)
        
        # 5. AI Chat Assistant
        chat_data = {
            "message": "Help me create a logo for my tech startup",
            "context": "brand design"
        }
        self.test_endpoint("AI Chat Assistant", "POST", "chat-assistant", 200, chat_data)
        
        # 6. Website Generator
        website_data = {
            "businessName": "TestTech",
            "businessType": "technology",
            "pages": ["home", "about", "services", "contact"],
            "colorScheme": "modern"
        }
        self.test_endpoint("Website Generator", "POST", "generate-website", 200, website_data)
        
        # 7. Voice Generator
        voice_data = {
            "text": "Welcome to Lotaya AI, your creative partner",
            "voice": "female",
            "language": "en-US",
            "speed": 1.0
        }
        self.test_endpoint("Voice Generator", "POST", "generate-voice", 200, voice_data)
        
        # 8. Photo Editor
        photo_data = {
            "imageUrl": "https://example.com/test-image.jpg",
            "editType": "enhance",
            "intensity": 0.8
        }
        self.test_endpoint("Photo Editor", "POST", "edit-photo", 200, photo_data)
        
        # 9. Background Remover
        bg_remove_data = {
            "imageUrl": "https://example.com/test-image.jpg"
        }
        self.test_endpoint("Background Remover", "POST", "remove-background", 200, bg_remove_data)
        
        # 10. Domain Generator
        domain_data = {
            "keywords": ["tech", "ai"],
            "extensions": [".com", ".io", ".ai"]
        }
        self.test_endpoint("Domain Generator", "POST", "generate-domain", 200, domain_data)
        
        # 11. Slogan Generator
        slogan_data = {
            "brandName": "TestBrand",
            "industry": "technology",
            "tone": "inspiring"
        }
        self.test_endpoint("Slogan Generator", "POST", "generate-slogan", 200, slogan_data)
        
        # 12. Business Card Generator
        card_data = {
            "name": "John Doe",
            "title": "CEO",
            "company": "TestTech Inc",
            "email": "john@testtech.com",
            "phone": "+1-555-0123",
            "website": "www.testtech.com",
            "style": "modern"
        }
        self.test_endpoint("Business Card Generator", "POST", "generate-business-card", 200, card_data)

    def test_error_handling(self):
        """Test error handling with invalid data"""
        print("\n" + "="*60)
        print("TESTING ERROR HANDLING")
        print("="*60)
        
        # Test invalid endpoint
        self.test_endpoint("Invalid Endpoint", "GET", "invalid-endpoint", 404)
        
        # Test missing required fields
        invalid_logo_data = {"brandName": ""}  # Missing required fields
        self.test_endpoint("Logo Generator - Invalid Data", "POST", "generate-logo", 422, invalid_logo_data)

    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting Lotaya AI Backend API Tests")
        print(f"🌐 Testing against: {self.base_url}")
        print(f"⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        start_time = time.time()
        
        # Run test suites
        self.test_basic_endpoints()
        self.test_ai_generation_endpoints()
        self.test_error_handling()
        
        end_time = time.time()
        total_time = round(end_time - start_time, 2)
        
        # Print final results
        print("\n" + "="*60)
        print("FINAL TEST RESULTS")
        print("="*60)
        print(f"📊 Tests Run: {self.tests_run}")
        print(f"✅ Tests Passed: {self.tests_passed}")
        print(f"❌ Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"⏱️  Total Time: {total_time}s")
        print(f"📈 Success Rate: {round((self.tests_passed/self.tests_run)*100, 1)}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for i, failure in enumerate(self.failed_tests, 1):
                print(f"   {i}. {failure}")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    tester = LotayaAPITester()
    success = tester.run_all_tests()
    
    if success:
        print(f"\n🎉 All tests passed! Backend API is working correctly.")
        return 0
    else:
        print(f"\n⚠️  Some tests failed. Check the results above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())