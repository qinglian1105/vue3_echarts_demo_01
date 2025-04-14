FROM node:lts-alpine AS builder
WORKDIR /app
COPY frontend-app/package*.json ./
RUN npm install
COPY frontend-app/. .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]