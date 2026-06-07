#!/bin/bash

echo "🧹 Clearing Next.js cache..."

# Remove .next directory
rm -rf .next

# Remove node_modules/.cache
rm -rf node_modules/.cache

echo "✅ Cache cleared!"
echo "📝 Now run: npm run dev"
