# Production Deployment Guide

## Render Deployment (Backend)
- **Runtime**: Node.js Web Service
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `DATABASE_URL`: Managed PostgreSQL URI
  - `JWT_SECRET`: 32+ character random secret
  - `GOOGLE_CLIENT_ID`: Google Cloud OAuth Web Client ID
  - `GOOGLE_CLIENT_SECRET`: Google Cloud Client Secret
  - `GEMINI_API_KEY`: Google AI Studio Gemini API Key
  - `ALLOWED_ORIGINS`: `https://prospail.vercel.app,http://localhost:3000`

## Vercel Deployment (Frontend)
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `next build`
- **Environment Variables**:
  - `NEXT_PUBLIC_BACKEND_URL`: `https://prospail.onrender.com/api/v1`
  - `BACKEND_URL`: `https://prospail.onrender.com`
  - `AUTH_URL`: `https://prospail.vercel.app`
  - `AUTH_SECRET`: Generated secret key
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Matching Google Web Client ID
