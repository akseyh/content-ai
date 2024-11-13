# Base image
FROM node:16

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the Nuxt application
RUN npm run build

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]