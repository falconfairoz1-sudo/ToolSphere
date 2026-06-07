#!/bin/bash

echo "🔄 Restarting ToolSphere Development Servers..."
echo ""

# Kill existing processes on ports 3000 and 5000
echo "🛑 Stopping existing servers..."

# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No process on port 3000"

# Kill process on port 5000 (Backend)
lsof -ti:5000 | xargs kill -9 2>/dev/null || echo "No process on port 5000"

echo "✅ Servers stopped"
echo ""
echo "📝 To start the servers again:"
echo "Terminal 1: cd server && npm run dev"
echo "Terminal 2: cd client && npm run dev"
