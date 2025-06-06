# ┌──────── Build Stage ────────
FROM node:18-alpine AS build
WORKDIR /app

# 1. Copy package.json (and package-lock.json if it exists)
COPY package.json ./
# If you have package-lock.json, uncomment the next line:
# COPY package-lock.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy all source and force PUBLIC_URL to "/"
COPY . .
ENV PUBLIC_URL=/
RUN npm run build   # CRA output goes into /app/build/

# ┌──────── Production Stage ────
FROM nginx:stable-alpine

# 4. Copy our root‐serving NGINX config
COPY nginx-admin.conf /etc/nginx/conf.d/default.conf

# 5. Switch to NGINX’s html directory & clear it
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# 6. Copy the build output into NGINX
COPY --from=build /app/build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
