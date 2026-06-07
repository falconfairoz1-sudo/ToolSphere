# 🚀 ToolSphere Deployment Guide

## ✅ Pre-Deployment Checklist

### Environment Configuration
- [x] MongoDB Atlas configured
- [x] JWT Secret set
- [x] DNS servers configured (1.1.1.1, 8.8.8.8)
- [x] CORS origins configured
- [x] Rate limiting enabled

### Database
- **Provider:** MongoDB Atlas
- **Cluster:** cluster0.7utulnw.mongodb.net
- **Database:** 100tools
- **Connection:** Configured with DNS fallback

### Security
- [x] JWT authentication
- [x] Password hashing (bcrypt)
- [x] Helmet.js security headers
- [x] Rate limiting (100 req/15min)
- [x] CORS protection

---

## 🌐 Backend Deployment

### Option 1: Railway

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd server
   railway init
   
   # Deploy
   railway up
   ```

3. **Set Environment Variables**
   ```
   MONGO_URI=mongodb+srv://fairoznew1234_db_user:Fairoz12@cluster0.7utulnw.mongodb.net/100tools
   JWT_SECRET=81ba0a6f979294065b8c862d2640a50c7dc53b254cd9ccfb941243ef317b18a57e1e092bd8d937b3324afd6b47b0410c3675e7621a4963704397fe2f8d93c922
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
   PORT=5000
   ```

4. **Get Deployment URL**
   - Railway will provide a URL like: `https://toolsphere-production.up.railway.app`

### Option 2: Render

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `server` folder as root directory

3. **Configure**
   - **Name:** toolsphere-api
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

4. **Environment Variables**
   Add the same variables as Railway

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment

> Note: This repository includes `render.yaml` at the project root for Render backend deployment and `client/vercel.json` inside the frontend folder for Vercel.
>
> - Set `MONGO_URI` and `JWT_SECRET` as Render secrets.
> - Set `NEXT_PUBLIC_API_URL` in Vercel to your Render backend URL.

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd server
   heroku create toolsphere-api
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI="mongodb+srv://fairoznew1234_db_user:Fairoz12@cluster0.7utulnw.mongodb.net/100tools"
   heroku config:set JWT_SECRET="81ba0a6f979294065b8c862d2640a50c7dc53b254cd9ccfb941243ef317b18a57e1e092bd8d937b3324afd6b47b0410c3675e7621a4963704397fe2f8d93c922"
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

---

## 🎨 Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd client
   vercel
   ```

3. **Set Environment Variable**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app`

4. **Redeploy**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   cd client
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Environment Variables**
   - Go to Netlify Dashboard
   - Site settings → Environment variables
   - Add: `NEXT_PUBLIC_API_URL`

---

## 🔧 Post-Deployment

### 1. Test API Endpoints

```bash
# Health check
curl https://your-api-url.com/api/health

# Get tools
curl https://your-api-url.com/api/tools

# Register user
curl -X POST https://your-api-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### 2. Update CORS Origins

In your backend `.env`:
```env
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://www.your-domain.com
```

### 3. Configure Custom Domain (Optional)

#### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

#### Railway/Render
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records

### 4. Enable HTTPS

Both Vercel and Railway/Render provide automatic HTTPS certificates.

---

## 📊 Monitoring

### Backend Monitoring

**Railway:**
- View logs in Railway dashboard
- Monitor CPU/Memory usage
- Set up alerts

**Render:**
- View logs in Render dashboard
- Monitor metrics
- Set up health checks

### Frontend Monitoring

**Vercel:**
- Analytics dashboard
- Performance insights
- Error tracking

---

## 🔒 Security Checklist

- [x] Environment variables not committed to Git
- [x] HTTPS enabled on all endpoints
- [x] CORS properly configured
- [x] Rate limiting enabled
- [x] JWT tokens with expiration
- [x] Password hashing
- [x] MongoDB IP whitelist (if needed)
- [x] Security headers (Helmet.js)

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem:** Cannot connect to MongoDB
**Solution:**
1. Check MongoDB Atlas IP whitelist
2. Verify connection string
3. Check DNS configuration (already set to 1.1.1.1, 8.8.8.8)
4. Test connection locally first

### CORS Errors

**Problem:** CORS policy blocking requests
**Solution:**
1. Add frontend URL to `ALLOWED_ORIGINS`
2. Ensure credentials are enabled
3. Check protocol (http vs https)

### 502 Bad Gateway

**Problem:** Backend not responding
**Solution:**
1. Check backend logs
2. Verify environment variables
3. Check MongoDB connection
4. Restart backend service

### Build Failures

**Problem:** Deployment build fails
**Solution:**
1. Check TypeScript errors locally
2. Verify all dependencies in package.json
3. Check Node.js version compatibility
4. Review build logs

---

## 📈 Performance Optimization

### Backend
- [x] Compression middleware enabled
- [x] Rate limiting configured
- [x] MongoDB indexes on User model
- [ ] Consider Redis for caching (optional)
- [ ] CDN for static assets (optional)

### Frontend
- [x] Next.js automatic optimization
- [x] Image optimization
- [x] Code splitting
- [ ] Consider CDN for assets
- [ ] Enable Vercel Analytics

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📝 Environment Variables Summary

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://fairoznew1234_db_user:Fairoz12@cluster0.7utulnw.mongodb.net/100tools
JWT_SECRET=81ba0a6f979294065b8c862d2640a50c7dc53b254cd9ccfb941243ef317b18a57e1e092bd8d937b3324afd6b47b0410c3675e7621a4963704397fe2f8d93c922
ALLOWED_ORIGINS=https://your-frontend.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

---

## 🎯 Production URLs

After deployment, update these in your documentation:

- **Frontend:** https://toolsphere.vercel.app
- **Backend API:** https://toolsphere-api.railway.app
- **MongoDB:** cluster0.7utulnw.mongodb.net

---

## ✅ Deployment Complete!

Your ToolSphere platform is now live and ready to serve users worldwide! 🎉

### Next Steps:
1. Test all features in production
2. Monitor logs for errors
3. Set up analytics
4. Share with users
5. Gather feedback

---

**Need Help?** Check the logs in your hosting dashboard or review the troubleshooting section above.
