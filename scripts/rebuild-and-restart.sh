#!/bin/bash

# Stop the running container
docker stop blog-backend-container

# Remove the stopped container
docker rm blog-backend-container

# Build the Docker image
docker build -t blog-backend .

# Run the Docker container
docker run -d -p 3000:3000 --name blog-backend-container blog-backend