FROM node:14.21-alpine AS node_img

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .

RUN npm install sequelize-cli
RUN npm install 
RUN npm run db:migrate
RUN npm run db:seed:all

CMD [ "npm", "start" ]