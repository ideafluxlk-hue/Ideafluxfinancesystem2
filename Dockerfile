FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production IDEAFLUX_DATA=/data FORCE_HTTPS=1
EXPOSE 4000
CMD ["node","server/index.js"]
