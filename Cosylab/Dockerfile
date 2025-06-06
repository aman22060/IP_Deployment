# ┌──────── Build Stage ────────
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json (if it exists), then install
COPY package.json package-lock.json* ./
RUN npm ci      # npm ci honors package-lock.json exactly

# Copy all source files and run the Vite build
COPY . .
RUN npm run build

# ┌──────── Production Stage ────
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default Nginx files
RUN rm -rf ./*

# Copy built static files from the build stage
COPY --from=build /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
