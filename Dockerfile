# https://nodejs.org/es/docs/guides/nodejs-docker-webapp
# FROM node:14.21-alpine AS node_img
FROM node:18-alpine3.17 AS node_img_18

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install 
RUN npm run test
RUN npm run db:migrate
RUN npm run db:seed:all

COPY . .
COPY ./.env.develop ./.env

EXPOSE 3005

CMD [ "npm", "start" ]