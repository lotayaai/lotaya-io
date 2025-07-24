# syntax=docker/dockerfile:1
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lock file
COPY frontend/package.json frontend/yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY frontend/ .

# Build the React application
RUN yarn build

# --- Production Stage ---
FROM node:18-alpine AS runner

WORKDIR /app

# Install serve to run the built application
RUN yarn global add serve

# Copy build artifacts from builder stage
COPY --from=builder /app/build ./build

# Set environment variables
ENV NODE_ENV=production

# Expose port 3000 for the React app
EXPOSE 3000

# Command to serve the React application
CMD ["serve", "-s", "build", "-l", "3000"]