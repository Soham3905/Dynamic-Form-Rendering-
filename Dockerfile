# Use node 20 on Debian
FROM node:20-bullseye AS base

WORKDIR /app
ENV DEBIAN_FRONTEND=noninteractive

# Install watchman and other dependencies (better file watching)
RUN apt-get update && apt-get install -y \
    watchman \
    curl \
    git \
 && rm -rf /var/lib/apt/lists/*

# Copy package.json to use Docker caching
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Expose Metro Bundler port
EXPOSE 8081

# Set environment variables for Metro bundler
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

# Start Metro server with reset cache option
CMD ["npx", "react-native", "start", "--reset-cache"]
