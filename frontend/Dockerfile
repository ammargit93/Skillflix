# # Stage 1: Build React app
# FROM node:18-alpine AS builder
#
# WORKDIR /app
#
# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install
#
# # Copy the rest of the app and build
# COPY . .
# RUN npm run build
#
# # Stage 2: Serve the app using Nginx
# FROM nginx:alpine
#
# # Remove default nginx static content
# RUN rm -rf /usr/share/nginx/html/*
#
# # Copy built React app from builder
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
#
# # Copy custom nginx config (optional)
# # COPY nginx.conf /etc/nginx/conf.d/default.conf
#
# EXPOSE 80
#
# CMD ["nginx", "-g", "daemon off;"]


# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom routing fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
