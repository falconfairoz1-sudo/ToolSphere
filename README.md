# ToolDataBase - 150+ Tools Platform

A comprehensive, fast, and user-friendly platform offering 150+ tools including PDF utilities, image editors, AI generators, calculators, converters, and more.

## 🚀 Features

- **150+ Tools** across multiple categories
- **No Login Required** - Use tools instantly
- **100% Free** - All tools are completely free
- **Fast & Clean** - Optimized for performance
- **Mobile Responsive** - Works on all devices
- **Dark/Light Mode** - Theme switching support
- **Offline Capable** - PWA support for offline usage

## 🛠️ Tool Categories

- **AI Tools**: Content generators, chatbots, image generators
- **PDF Tools**: Merge, split, compress, sign, add seals
- **Image Tools**: Editors, converters, compressors, background removers
- **Video Tools**: Converters, compressors, downloaders
- **Text Tools**: Formatters, counters, generators
- **Developer Tools**: Code formatters, generators, validators
- **Calculators**: Math, finance, health, unit converters
- **Utilities**: QR generators, password generators, and more

## 📋 Prerequisites

- Node.js 18+ 
- Docker & Docker Compose (for deployment)
- Git

## 🔧 Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd toolsphere
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Deployment

#### Option 1: Docker Deployment (Recommended)

1. **Update configuration**
   ```bash
   # Update domain in nginx.conf and docker-compose.yml
   sed -i 's/your-domain.com/yourdomain.com/g' nginx.conf
   sed -i 's/your-domain.com/yourdomain.com/g' docker-compose.yml
   ```

2. **Deploy using script**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh yourdomain.com production
   ```

3. **Set up SSL certificates**
   ```bash
   # Using Let's Encrypt
   certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
   cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem
   cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem
   docker-compose restart nginx
   ```

#### Option 2: Manual Deployment

1. **Build the application**
   ```bash
   cd client
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

#### Option 3: Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd client
   vercel --prod
   ```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the client directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://yourdomain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_AUTH=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Docker Configuration

The project includes:
- `Dockerfile` - Multi-stage build for optimization
- `docker-compose.yml` - Full stack with Nginx reverse proxy
- `nginx.conf` - Production-ready Nginx configuration

## 📊 Performance Optimizations

- **Next.js 14** with App Router
- **Static Site Generation** for tool pages
- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **Gzip compression** via Nginx
- **CDN-ready** static assets
- **PWA support** for offline usage

## 🔒 Security Features

- **CSP headers** for XSS protection
- **HTTPS enforcement** via Nginx
- **Rate limiting** on API endpoints
- **Input sanitization** for all tools
- **No data storage** - client-side processing only

## 🚀 Deployment Platforms

### Vercel (Recommended for simplicity)
```bash
cd client
vercel --prod
```

### Netlify
```bash
cd client
npm run build
# Upload dist folder to Netlify
```

### AWS/DigitalOcean/VPS
Use the provided Docker setup for easy deployment on any VPS.

## 📱 PWA Features

- **Offline support** for core functionality
- **Install prompt** for mobile/desktop
- **Background sync** for bookmarks
- **Push notifications** (optional)

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build
```

## 📈 Monitoring

The application includes:
- Health check endpoint (`/api/health`)
- Performance monitoring ready
- Error boundary components
- Analytics integration ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact support team

## 🔄 Updates

To update your deployment:
```bash
git pull
./deploy.sh yourdomain.com production
```

## 📊 Analytics

The platform supports:
- Google Analytics 4
- Custom event tracking
- Performance monitoring
- User behavior analytics

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**