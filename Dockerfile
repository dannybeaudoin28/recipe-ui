# Use the official Node.js image as the base image for building the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use the same Node.js image for the final stage
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the build files from the build stage
COPY --from=build /app/build /app/build

# Copy package.json and package-lock.json for dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Copy the server code into the container
COPY server.js ./

# Command to run the app
CMD ["node", "server.js"]
