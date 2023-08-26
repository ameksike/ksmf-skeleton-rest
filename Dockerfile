FROM node:14.21-alpine AS node_img

RUN mkdir -p /app
WORKDIR /app
COPY . .
COPY ./.env.dev ./.env

RUN npm install 
RUN npm run db:migrate
RUN npm run db:seed:all

CMD [ "npm", "start" ]