FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.mjs ./

EXPOSE 8080

CMD ["npm", "run", "start"]
