# ⚡ ToolSphere Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies (1 minute)

**Windows:**
```bash
install.bat
```

**Mac/Linux:**
```bash
chmod +x install.sh
./install.sh
```

**Or manually:**
```bash
# Install backend
cd server
npm install

# Install frontend
cd ../client
npm install
```

---

### Step 2: Start Servers (30 seconds)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

Wait for:
```
✅ MongoDB Connected: cluster0.7utulnw.mongodb.net
🚀 ToolSphere Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Wait for:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

---

### Step 3: Open Browser (10 seconds)

Visit: **http://localhost:3000**

You should see the ToolSphere homepage! 🎉

---

## ❌ Having Issues?

### Error: Context Provider Issues

**Quick Fix:**
```bash
# Stop servers (Ctrl+C in both terminals)

# Clear cache
cd client
rm -rf .next

# Restart
cd server && npm run dev  # Terminal 1
cd client && npm run dev  # Terminal 2

# Hard refresh browser: Ctrl+Shift+R
```

### Error: Port Already in Use

**Windows:**
```bash
restart-dev.bat
```

**Mac/Linux:**
```bash
chmod +x restart-dev.sh
./restart-dev.sh
```

Then start servers again.

### Error: MongoDB Connection

1. Check your internet connection
2. Verify `.env` file exists in `server/` folder
3. MongoDB URI should be in `server/.env`

---

## 📁 Project Structure

```
toolsphere/
├── client/          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/           # Pages
│   │   ├── components/    # React components
│   │   └── contexts/      # State management
│   └── .env.local         # Frontend config
│
└── server/          # Backend (Express)
    ├── src/
    │   ├── routes/        # API routes
    │   ├── models/        # Database models
    │   └── config/        # Configuration
    └── .env               # Backend config
```

---

## 🎯 What's Included

✅ **150+ Tools** across 20 categories
✅ **Dark Mode** with auto-detection
✅ **Authentication** with JWT
✅ **Bookmarks** (local + cloud)
✅ **Share** functionality
✅ **Mobile-responsive** design
✅ **MongoDB** database
✅ **Search** functionality

---

## 🔧 Common Commands

### Development
```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm run dev

# Run both (use 2 terminals)
```

### Build for Production
```bash
# Build backend
cd server && npm run build

# Build frontend
cd client && npm run build
```

### Lint & Type Check
```bash
# Check types
npm run type-check

# Lint code
npm run lint
```

---

## 📖 Next Steps

1. ✅ **Explore Tools** - Browse 150+ tools
2. 🎨 **Customize** - Modify colors, add tools
3. 🚀 **Deploy** - See `DEPLOYMENT.md`
4. 📚 **Learn More** - Read `SETUP.md` and `FEATURES.md`

---

## 🆘 Need Help?

- **Troubleshooting:** See `TROUBLESHOOTING.md`
- **Setup Guide:** See `SETUP.md`
- **Features:** See `FEATURES.md`
- **Deployment:** See `DEPLOYMENT.md`

---

## ✨ Features to Try

1. **Search Tools** - Type in the search bar
2. **Dark Mode** - Click the moon/sun icon
3. **Bookmark Tools** - Click the bookmark icon on any tool
4. **Share Tools** - Use the share button
5. **Browse Categories** - Explore 20 categories

---

**Enjoy building with ToolSphere! 🚀**

For detailed documentation, see the other `.md` files in the root directory.
