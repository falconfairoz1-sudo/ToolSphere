#!/bin/bash

# ToolSphere Setup Script
# This script sets up both client and server

echo "🚀 ToolSphere Setup Script"
echo "=========================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"
echo ""

# Setup Client
echo -e "${BLUE}📦 Setting up Client (Frontend)...${NC}"
cd client

if [ ! -f ".env.local" ]; then
    echo "Creating .env.local from example..."
    cp .env.local.example .env.local
    echo -e "${GREEN}✓ Created .env.local${NC}"
fi

echo "Installing client dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Client dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install client dependencies${NC}"
    exit 1
fi

cd ..
echo ""

# Setup Server
echo -e "${BLUE}📦 Setting up Server (Backend)...${NC}"
cd server

if [ ! -f ".env" ]; then
    echo "Creating .env from example..."
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env${NC}"
fi

echo "Installing server dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Server dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install server dependencies${NC}"
    exit 1
fi

cd ..
echo ""

# Success message
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Start the backend:"
echo -e "   ${BLUE}cd server && npm run dev${NC}"
echo ""
echo "2. In a new terminal, start the frontend:"
echo -e "   ${BLUE}cd client && npm run dev${NC}"
echo ""
echo "3. Open your browser:"
echo -e "   ${BLUE}http://localhost:3000${NC}"
echo ""
echo "📚 Documentation:"
echo "   - QUICKSTART.md - Getting started guide"
echo "   - IMPLEMENTATION_GUIDE.md - How to add tools"
echo "   - DEPLOYMENT.md - Deploy to production"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
