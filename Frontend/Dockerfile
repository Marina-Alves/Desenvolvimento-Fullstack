FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_BACKEND_HOST=localhost
ARG REACT_APP_BACKEND_PORT=5000
ENV REACT_APP_BACKEND_HOST=$REACT_APP_BACKEND_HOST REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
