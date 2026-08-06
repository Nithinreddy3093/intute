<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Intute - Your Live Teaching Assistant

**Author:** Nithin Reddy

This repository contains the full code for **Intute**, an AI-powered conversational visual learning assistant.

## Deploying to Vercel

1. **Import Project**: Connect your GitHub repository to Vercel and import this project.
2. **Framework Preset**: Select **Vite** (Vercel will auto-detect `vite`).
3. **Environment Variables**:
   - In your Vercel project settings, add an environment variable named `GEMINI_API_KEY`.
   - Set the value to your Gemini API key (from Google AI Studio).
4. **Deploy**: Click **Deploy**.

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set `GEMINI_API_KEY` in `.env.local` or `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

