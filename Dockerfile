# Build stage - Use buildplatform for optimized build performance
FROM --platform=$BUILDPLATFORM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage - No need to specify platform as it uses target platform by default
FROM node:18-alpine

# Set production environment
ENV NODE_ENV=production
ENV PORT=5173

WORKDIR /app

# Install tini and serve package globally
RUN apk add --no-cache tini && \
    npm install -g serve@14.2.1

# Create necessary directories with proper permissions
RUN mkdir -p /app/dist /app/data && chown -R node:node /app

# Copy only the built files from builder
COPY --from=builder /app/dist ./dist

# Create volume for user data
VOLUME /app/data

# Switch to non-root user
USER node

# Expose the configured port
EXPOSE ${PORT}

# Use tini as init for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start command using serve for the static files
CMD ["sh", "-c", "echo \"CSS Wizard Ready at http://localhost:$PORT\" && exec serve -s dist -l $PORT"]