# Use the official Node.js image as the base image
FROM node:22.11.0 as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "dev"]