#!/bin/bash

# Tiny Sumo Hub - Deployment Script
# This script helps test and prepare the project for deployment

echo "🚀 Tiny Sumo Hub Deployment Helper"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🧪 Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build test passed"
else
    echo "❌ Build test failed"
    exit 1
fi

echo ""
echo "🌐 Starting preview server..."
echo "Visit http://localhost:3000 to test the site"
echo "Press Ctrl+C to stop the server"
echo ""

npm run preview