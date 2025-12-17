FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "preview"]