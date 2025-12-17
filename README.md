# Tiny Sumo Marketing Hub

Professional marketing agency platform deployed on Render.com

## 🌐 Live URL
https://hub.tiny-sumo.com

## 🚀 Deployment
This repository is configured for automatic deployment on Render.com via the `render.yaml` configuration file.

### Quick Deploy
1. Connect this repository to your Render.com account
2. The service will auto-deploy using the `render.yaml` configuration
3. Add custom domain `hub.tiny-sumo.com` in Render dashboard
4. Update DNS to point to Render's provided IP

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🔧 Configuration
- **Environment**: Node.js 18
- **Port**: 3000
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm run preview`

## 🔐 Authentication Setup
Google OAuth credentials should be configured in Render.com environment variables:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_ALLOWED_DOMAIN`

## 📁 Structure
- `public/index.html` - Marketing hub landing page
- `vite.config.js` - Vite configuration
- `render.yaml` - Render.com deployment config
- `Dockerfile` - Container configuration