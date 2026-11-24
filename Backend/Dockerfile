FROM node:22-slim
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build
ENV SERVER_PORT=5000
EXPOSE 5000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/app.js"]
