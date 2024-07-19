# Use an official Node.js runtime as a parent image
FROM node:14-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Run Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
