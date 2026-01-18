# Image to Video AI Agent

An AI-powered web application that converts a single image into a short, realistic video using prompt-based motion control.  
The project is built as a full-stack web app with a modern UI and a real AI inference pipeline.

---

## Live Demo

- **Frontend (Vercel):**  
  https://image-to-video-ai-agent.vercel.app/

- **Backend (Render):**  
  https://image-to-video-backend-qqtq.onrender.com

---

## Assignment Option

**Option 1: Image to Video Agent**

This project satisfies all core and bonus requirements of the assignment:
- Image-based video generation
- Prompt-driven motion control
- User-selectable motion styles
- Smooth visual transitions
- Realistic AI-generated motion

---

## Features

-  Upload an image (click to upload, click again to replace)
-  Live image preview inside the upload card
-  Prompt-based motion description (multi-line input)
-  Motion style selection (Slow / Cinematic / Dynamic)
-  AI-generated short video output
-  Download generated video
-  Demo animation showing image → video transformation
-  Fully responsive UI (desktop & mobile)

---

##  Architecture Overview
User Browser
|
|--> Frontend (Vite + React + Tailwind CSS) [Vercel]
|
|--> Backend (Node.js + Express) [Render]
|
|--> Cloudinary (image & video storage)
|--> Replicate API (AI video generation)


---

##  AI Model & APIs Used

### AI Model
- **Model:** `wan-video/wan-2.2-t2v-fast`
- **Platform:** Replicate
- **Type:** Image-to-video generation
- **Output:** MP4 video stream

### Media Handling
- **Cloudinary**
  - Image upload (input)
  - Video upload (generated output)

### Why this approach?
- Correct model selection for image-to-video tasks
- Proper handling of binary video streams
- Realistic motion instead of exaggerated animation
- Production-style media pipeline

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Material UI Icons
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- Replicate SDK
- Cloudinary SDK

### Deployment
- **Frontend:** Vercel
- **Backend:** Render

---


##  How to Run Locally

### 1️. Clone the Repository
- git clone https://github.com/AnoopPatel582/image-to-video-ai-agent.git
- cd image-to-video-ai-agent 
### 2️. Backend Setup
- cd backend
- npm install
- Create a .env file inside backend/:
  - REPLICATE_API_TOKEN=your_replicate_token
  - CLOUDINARY_CLOUD_NAME=your_cloud_name
  - CLOUDINARY_API_KEY=your_api_key
  - CLOUDINARY_API_SECRET=your_api_secret
- Run backend: npm start
### 3️. Frontend Setup
- cd frontend
- npm install
- Create a .env file inside frontend/:
 - VITE_API_URL=http://localhost:5000
- Run frontend: npm run dev

### Usage Guide
- Open the deployed frontend link
- Click the upload card to select an image
- Enter a motion prompt (optional but recommended)
- Choose a motion style
- Click Generate Video
- Wait for AI processing (first request may take longer due to cold start)
- Preview and download the generated video

### Notes on Performance
- Backend uses Render free tier, which may sleep when idle
- First request can take ~20–30 seconds
- Subsequent requests are faster
- AI generation time depends on model inference

### Future Improvements
- Duration control for generated videos
- Camera movement presets
- Multiple scene prompts
- Authentication & user history
- Migration to AWS (EC2 + S3 + CloudFront)

### Author
- Anoop Patel
- B.Tech Mechanical Engineering, NIT Sikkim
- Aspiring AI & Software Developer

### License
- This project is created for evaluation and learning purposes.
