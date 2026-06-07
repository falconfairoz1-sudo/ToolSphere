# ToolSphere Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (already configured)
- Git

### 1. Install Dependencies

#### Backend (Server)
```bash
cd server
npm install
```

#### Frontend (Client)
```bash
cd client
npm install
```

### 2. Environment Variables

#### Server (.env)
Already created at `server/.env`:
```env
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000

# MongoDB
MONGO_URI=mongodb+srv://fairoznew1234_db_user:Fairoz12@cluster0.7utulnw.mongodb.net/100tools

# JWT
JWT_SECRET=81ba0a6f979294065b8c862d2640a50c7dc53b254cd9ccfb941243ef317b18a57e1e092bd8d937b3324afd6b47b0410c3675e7621a4963704397fe2f8d93c922

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Client (.env.local)
Already created at `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Start Development Servers

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

The client will start on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📊 MongoDB Database

### Database Name
`100tools`

### Collections
- **users** - User accounts with authentication
  - name
  - email
  - password (hashed)
  - bookmarks (array of tool IDs)
  - recentTools (array of tool IDs)
  - createdAt
  - updatedAt

### Connection Status
The server will log MongoDB connection status:
```
✅ MongoDB Connected: cluster0.7utulnw.mongodb.net
📊 Database: 100tools
```

## 🔐 Authentication Endpoints

### Register
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

### Update Bookmarks
```http
POST http://localhost:5000/api/auth/bookmarks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "toolId": "password-generator",
  "action": "add"
}
```

### Add Recent Tool
```http
POST http://localhost:5000/api/auth/recent
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "toolId": "pdf-merge"
}
```

## 🛠️ Available Scripts

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

### Client
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 📁 Project Structure

```
toolsphere/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/              # Next.js 14 App Router
│   │   │   ├── tools/        # Tool pages
│   │   │   ├── category/     # Category pages
│   │   │   ├── layout.tsx    # Root layout with providers
│   │   │   ├── page.tsx      # Homepage
│   │   │   └── globals.css   # Global styles
│   │   ├── components/
│   │   │   ├── tools/        # Tool components (40+)
│   │   │   └── ui/           # UI components
│   │   ├── contexts/         # React contexts
│   │   │   ├── ThemeContext.tsx
│   │   │   ├── AuthContext.tsx
│   │   │   └── BookmarkContext.tsx
│   │   ├── data/             # Static data
│   │   │   ├── categories.ts
│   │   │   └── toolIcons.ts
│   │   └── types/            # TypeScript types
│   ├── .env.local            # Environment variables
│   └── package.json
│
└── server/                    # Express Backend
    ├── src/
    │   ├── config/
    │   │   └── database.ts   # MongoDB connection
    │   ├── models/
    │   │   └── User.ts       # User model
    │   ├── routes/
    │   │   ├── authRoutes.ts # Auth endpoints
    │   │   ├── tools.ts      # Tools endpoints
    │   │   ├── analytics.ts  # Analytics endpoints
    │   │   └── health.ts     # Health check
    │   ├── controllers/
    │   ├── data/
    │   │   └── allTools.ts   # 150 tools database
    │   └── index.ts          # Server entry point
    ├── .env                  # Environment variables
    └── package.json
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
If you see connection errors:
1. Check your internet connection
2. Verify the MongoDB URI is correct
3. Ensure your IP is whitelisted in MongoDB Atlas
4. Check MongoDB Atlas cluster status

### Port Already in Use
If port 5000 or 3000 is already in use:
```bash
# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found
If you see module errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Features Implemented

### ✅ Core Features
- 150+ tools across 20 categories
- Dark mode with system preference detection
- JWT authentication with MongoDB
- Bookmark system (local + cloud sync)
- Share functionality (social media + copy link)
- Mobile-first responsive design
- Search functionality
- Category browsing

### ✅ PDF Tools (8)
1. PDF Merge
2. PDF Split
3. PDF to Word
4. Word to PDF
5. PDF Compressor
6. PDF Lock/Unlock
7. PDF Watermark
8. PDF to Image

### ✅ Student Tools (7)
1. Flashcards Generator
2. Plagiarism Checker
3. Citation Generator
4. Study Timer
5. Formula Calculator
6. Unit Converter
7. GPA Calculator

### ✅ Finance Tools (8)
1. EMI Calculator
2. Loan Calculator
3. GST Calculator
4. Currency Converter
5. Profit/Loss Calculator
6. SIP Calculator
7. Tax Estimator
8. Budget Planner

### ✅ And 30+ More Tools...

## 🚀 Deployment

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set `NEXT_PUBLIC_API_URL` to your backend URL
4. Deploy

## 📝 Notes

- All tools are demo interfaces showing UI/UX
- Production implementation would require actual processing libraries
- MongoDB stores user data, bookmarks, and recent tools
- JWT tokens expire after 7 days
- Rate limiting: 100 requests per 15 minutes per IP

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the MongoDB Atlas dashboard
3. Check server logs for errors
4. Verify environment variables are set correctly

---

**Status**: ✅ Ready for development!
