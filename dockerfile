# Step 1: Build the app
FROM node:18 AS builder

WORKDIR /app

COPY front/package*.json ./
RUN npm install

COPY front/ ./
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]