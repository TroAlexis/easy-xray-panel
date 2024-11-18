# Step 1: Build the Svelte app
FROM node:18-alpine AS build

WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Svelte app
RUN npm run build

# The final output will be in /app/public (default SvelteKit output directory)
