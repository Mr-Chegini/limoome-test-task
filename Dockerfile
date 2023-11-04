# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN yarn

# Copy the rest of your app's source code to the container
COPY . .

# Expose the port your NestJS app listens on
EXPOSE 5000

# Start your NestJS app
CMD ["yarn", "start"]
