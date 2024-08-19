# Use the official Node.js image as the base image
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

# Use a lightweight web server to serve the build
FROM nginx:alpine

# Copy the build files from the build stage
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY fullchain.pem /etc/letsencrypt/live/dannybeaudoin613.com-0002/fullchain.pem
COPY privkey.pem /etc/letsencrypt/live/dannybeaudoin613.com-0002/privkey.pem

# Expose port 80 for Nginx
EXPOSE 80
EXPOSE 443

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
