# Multi-stage Dockerfile for building and running the TypeScript Discord bot
# Builder stage: install all deps and compile TypeScript to /app/dist
FROM node:20 AS builder
WORKDIR /app

# Copy package manifests and install all dependencies (including dev) for build
COPY package*.json ./
RUN npm ci

# Copy project files and compile TypeScript into dist
COPY . .
RUN npx tsc --rootDir . --outDir dist

# Runtime stage: smaller image with only production dependencies
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy project files (source, static assets). .dockerignore will exclude node_modules and other excluded files
COPY . .

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Run as non-root user for safety
USER node

# Start the app from the compiled output
CMD ["node", "dist/index.js"]
