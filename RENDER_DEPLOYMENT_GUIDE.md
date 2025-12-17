# 🚀 Render.com Deployment Guide

## Tiny Sumo Marketing Hub - Live Deployment Instructions

### Repository Status: ✅ Ready for Deployment
**GitHub Repository**: https://github.com/Willydilly47/tiny-sumo-hub.git

---

## 📋 Step-by-Step Deployment

### 1. Connect to Render.com
1. Go to https://render.com
2. Sign up/Login to your Render account
3. Click "New +" → "Web Service"

### 2. Connect GitHub Repository
1. Select "Build and deploy from a Git repository"
2. Choose GitHub and authorize Render to access your repositories
3. Find and select: `Willydilly47/tiny-sumo-hub`
4. Click "Connect"

### 3. Configure Web Service
Render will auto-detect the configuration from `render.yaml`. Verify these settings:

**Basic Settings:**
- **Name**: `tiny-sumo-hub`
- **Region**: Choose closest to your users
- **Branch**: `master`
- **Root Directory**: Leave empty
- **Runtime**: `Node`

**Build and Deploy:**
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm run preview`

**Environment:**
- **Plan**: `Free` (750 hours/month)
- **Auto-Deploy**: `Yes`

### 4. Add Environment Variables
In the Render dashboard, go to "Environment" tab and add these variables:

```bash
NODE_ENV=production
PORT=3000
PUBLIC_URL=https://pm.tiny-sumo.com

# OAuth Configuration (add your own credentials)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_ALLOWED_DOMAIN=tiny-sumo.com
```

### 5. Add Custom Domain
1. In your service dashboard, go to "Settings" → "Domains"
2. Click "Add Custom Domain"
3. Enter: `pm.tiny-sumo.com`
4. Render will provide DNS instructions

### 6. Update DNS
In your domain registrar (Namecheap/GoDaddy/etc.), update DNS:

**For Namecheap:**
- Add CNAME record: `hub` → `[your-render-app].onrender.com`
- Add A record: `@` → `[Render's IP]`

**For GoDaddy:**
- Add CNAME record: `hub` → `[your-render-app].onrender.com`
- Add A record: `@` → `[Render's IP]`

### 7. Deploy and Test
1. Click "Create Web Service"
2. Wait for build and deployment (3-5 minutes)
3. Test: https://[your-app].onrender.com
4. Test custom domain: https://pm.tiny-sumo.com

---

## 🔍 Verification Checklist

### Pre-Deployment
- [ ] GitHub repository connected
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Custom domain prepared

### Post-Deployment
- [ ] Application builds successfully
- [ ] Landing page loads at Render URL
- [ ] Landing page loads at pm.tiny-sumo.com
- [ ] HTTPS certificate active
- [ ] Mobile responsive design works

---

## 🌐 Expected Result

**Your marketing hub will be live at:**
- **Primary URL**: https://pm.tiny-sumo.com
- **Render URL**: https://[your-app].onrender.com

**Features:**
- ✅ Professional marketing agency landing page
- ✅ Mobile-responsive design
- ✅ HTTPS security
- ✅ Google OAuth ready
- ✅ 99.9% uptime (Render guarantee)
- ✅ Free tier (750 hours/month)

---

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify all dependencies in `package.json`
- Ensure `npm run build` works locally

### Custom Domain Issues
- Wait 24-48 hours for DNS propagation
- Verify CNAME and A records
- Check Render domain settings

### OAuth Not Working
- Verify environment variables are set correctly
- Check Google Cloud Console settings
- Ensure domain is whitelisted

---

## 📞 Next Steps After Deployment

1. **Test the platform** at https://pm.tiny-sumo.com
2. **Configure Google OAuth** for authentication
3. **Add your marketing content** to the landing page
4. **Set up analytics** (Google Analytics, etc.)
5. **Monitor performance** via Render dashboard

---

**🎉 Congratulations! Your Tiny Sumo Marketing Hub will be live and accessible worldwide!**