#!/bin/bash
# Build script for Huly deployment

echo "Preparing Tiny Sumo Huly for deployment..."

# For static deployment, we serve directly from public
echo "Huly interface ready - serving from public directory"

# Copy files to dist for AWS Amplify compatibility
rm -rf dist
mkdir dist
cp -r public/* dist/

echo "Huly deployment ready"
ls -la dist/