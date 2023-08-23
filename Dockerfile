FROM node:14.21-alpine AS node_img

RUN mkdir -p /opt/app
WORKDIR /opt/app

RUN npm install -g pm2 && \
    npm install -g nodemon && \
    npm install 

CMD [ "npm", "start" ]