# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and lock file to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port the backend runs on
EXPOSE 3005

# Start backend only after MySQL is reachable
CMD ["sh", "-c", "until nc -z mysql 3306; do echo 'Waiting for MySQL...'; sleep 2; done; echo 'MySQL ready. Starting server.'; node server.js"]
