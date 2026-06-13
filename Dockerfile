# Stage 1: Build the Astro site
FROM node:22-alpine AS build
WORKDIR /app

# Copy dependency files first (caching optimization)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (gzip, caching, security headers)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
