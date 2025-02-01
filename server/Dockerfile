# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Expose the server's port (e.g., 5000)
EXPOSE 5000

# Start the Node.js server
CMD ["npm", "start"]
