# Use Node.js 18 on Ubuntu as the base image
FROM node:18-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies based on package.json
COPY package*.json ./
RUN npm install

# Expose port 4200 for ng serve
EXPOSE 4200

# Run ng serve, bind to all interfaces, and enable file watching via polling
CMD ["ng", "serve", "--host", "0.0.0.0"]

# In the terminal run the following command to build the Docker image
# docker build -t sigovia-frontend-dev .
# And then run the following command to start the container
# docker run -p 4200:4200 -v $(pwd):/app -v /app/node_modules sigovia-frontend-dev