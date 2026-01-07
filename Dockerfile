# SDK Development Container
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Copy SDK packages
COPY packages/@sopres/core/package*.json ./packages/@sopres/core/
COPY packages/@sopres/sdk/package*.json ./packages/@sopres/sdk/
COPY packages/@sopres/utils/package*.json ./packages/@sopres/utils/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build packages
RUN npm run build:packages

# Default command for development
CMD ["npm", "test"]
