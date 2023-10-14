# Build
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Run
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./
CMD ["npm" ,"start"]