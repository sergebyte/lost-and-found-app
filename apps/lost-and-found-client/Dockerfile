FROM node:20-alpine AS builder

# Expose the ports for the React Native Expo app
EXPOSE 8081
ENV REACT_NATIVE_PACKAGER_HOSTNAME = ${LOCAL_ADDRESS}

# Set the working directory
WORKDIR /app

# Copy the React Native app code
COPY . .

# Install dependencies
RUN npm install

# Start the development server
CMD [ "npm", "start" ]
