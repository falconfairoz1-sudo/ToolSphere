#!/bin/bash

echo "🚀 ToolSphere Installation Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -eq 0 ]; then
    echo "✅ Server dependencies installed successfully"
else
    echo "❌ Failed to install server dependencies"
    exit 1
fi
cd ..
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -eq 0 ]; then
    echo "✅ Client dependencies installed successfully"
else
    echo "❌ Failed to install client dependencies"
    exit 1
fi
cd ..
echo ""

echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start the backend:  cd server && npm run dev"
echo "2. Start the frontend: cd client && npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For more details, see SETUP.md"
