# 🚀 ToolDataBase Deployment Guide

This guide covers multiple deployment options for the ToolDataBase platform.

## 📋 Pre-Deployment Checklist

- [ ] Domain name configured
- [ ] SSL certificates ready (for production)
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Build tested locally

## 🔧 Environment Setup

### 1. Update Environment Variables

**For Production (.env.production):**
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com
NEXT_PUBLIC_ENABLE_AUTH=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. Update Domain References

Replace `your-domain.com` in:
- `nginx.conf`
- `docker-compose.yml`
- `.env.production`

## 🐳 Docker Deployment (Recommended)

### Quick Deploy
```bash
# Make script executable (Linux/Mac)
chmod +x deploy.sh

# Deploy with custom domain
./deploy.sh yourdomain.com production
```

### Manual Docker Steps
```bash
# Build and start containers
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

### SSL Certificate Setup
```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem

# Set permissions
sudo chown $USER:$USER ./ssl/*.pem
sudo chmod 600 ./ssl/*.pem

# Restart nginx
docker-compose restart nginx
```

## ☁️ Cloud Platform Deployments

### Vercel (Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from client directory
cd client
vercel --prod

# Set environment variables in Vercel dashboard
```

### Netlify
```bash
# Build the project
cd client
npm run build

# Deploy via Netlify CLI or drag & drop the .next folder
npm i -g netlify-cli
netlify deploy --prod --dir=.next
```

### AWS EC2
```bash
# Connect to your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Docker
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu

# Clone and deploy
git clone <your-repo>
cd toolsphere
./deploy.sh yourdomain.com production
```

### DigitalOcean Droplet
```bash
# Create droplet with Docker pre-installed
# SSH into droplet
ssh root@your-droplet-ip

# Clone and deploy
git clone <your-repo>
cd toolsphere
./deploy.sh yourdomain.com production
```

### Google Cloud Platform
```bash
# Using Cloud Run
gcloud run deploy toolsphere \
  --source=./client \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated
```

## 🔧 Manual Server Setup

### Ubuntu/Debian Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Clone and setup
git clone <your-repo>
cd toolsphere/client
npm install
npm run build

# Start with PM2
pm2 start npm --name "toolsphere" -- start
pm2 startup
pm2 save
```

### Nginx Configuration (Manual)
```bash
# Install Nginx
sudo apt install nginx -y

# Create site configuration
sudo nano /etc/nginx/sites-available/toolsphere

# Add configuration (see nginx.conf)
# Enable site
sudo ln -s /etc/nginx/sites-available/toolsphere /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 📊 Performance Optimization

### CDN Setup
- Configure CloudFlare or AWS CloudFront
- Enable caching for static assets
- Set up image optimization

### Database (if needed)
```bash
# Redis for caching (optional)
docker run -d --name redis -p 6379:6379 redis:alpine

# MongoDB for user data (optional)
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

## 🔍 Monitoring & Maintenance

### Health Checks
```bash
# Check application health
curl https://yourdomain.com/api/health

# Monitor containers
docker-compose logs -f
docker stats
```

### Backup Strategy
```bash
# Backup user data (if any)
docker exec mongodb mongodump --out /backup

# Backup configuration
tar -czf config-backup.tar.gz nginx.conf docker-compose.yml ssl/
```

### Updates
```bash
# Update application
git pull origin main
docker-compose build --no-cache
docker-compose up -d

# Update system packages
sudo apt update && sudo apt upgrade -y
```

## 🚨 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

**SSL certificate issues:**
```bash
# Check certificate validity
openssl x509 -in ssl/cert.pem -text -noout

# Renew Let's Encrypt certificates
sudo certbot renew
```

**Docker build fails:**
```bash
# Clean Docker cache
docker system prune -a
docker-compose build --no-cache
```

**Memory issues:**
```bash
# Check memory usage
free -h
docker stats

# Increase swap if needed
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## 📈 Scaling

### Horizontal Scaling
```yaml
# docker-compose.yml
services:
  toolsphere:
    deploy:
      replicas: 3
    # ... rest of config
```

### Load Balancer Setup
```nginx
upstream toolsphere_backend {
    server toolsphere_1:3000;
    server toolsphere_2:3000;
    server toolsphere_3:3000;
}
```

## 🔐 Security Checklist

- [ ] SSL certificates installed and valid
- [ ] Firewall configured (only 80, 443, 22 open)
- [ ] Regular security updates scheduled
- [ ] Backup strategy implemented
- [ ] Monitoring and alerting setup
- [ ] Rate limiting configured
- [ ] Security headers enabled

## 📞 Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f`
2. Verify configuration files
3. Check firewall and DNS settings
4. Review the troubleshooting section
5. Open an issue on GitHub

---

**Happy Deploying! 🎉**