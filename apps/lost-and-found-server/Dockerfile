FROM node:20-alpine

# Expose the port for NestJS API
EXPOSE 3000

# Set the working directory
WORKDIR /app

# Copy the NestJS app code
COPY . .

# Install dependencies
RUN npm install

# Start the NestJS server
CMD ["npm", "run", "start:dev"]
