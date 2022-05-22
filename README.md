# KsMf REST API Skeleton
This is a template to create REST API services in a simple and easy way.

## Install 
- git clone https://github.com/ameksike/ksmf-skeleton-rest.git
- cd ksmf-skeleton-rest
- mv ksmf-skeleton-rest my-project
- cd my-project
- npm install
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all
- npm start

## Demo
- npm run dev
- GET http://localhost:3005/api/v1/doc
- GET http://localhost:3005/api/v1/user
- GET http://localhost:3005/api/v1/tag
- GET http://localhost:3005/api/v1/comment
- GET http://localhost:3005/api/v1/comment/1/tag

## Test
- npm run test

## Data Base Migrations 
- npx sequelize-cli model:generate --name user --attributes name:string,age:integer,job:string,note:text
- npx sequelize-cli model:generate --name comment --attributes comment:text,userId:integer,flightId:integer,tagId:integer
- npx sequelize-cli model:generate --name tag --attributes name:string
- npx sequelize-cli model:generate --name tagComment --attributes commentId:integer,tagId:integer
- npx sequelize-cli db:migrate

## Data Base Seeders
- npx sequelize-cli seed:generate --name add-user
- npx sequelize-cli seed:generate --name add-tag
- npx sequelize-cli seed:generate --name add-comment
- npx sequelize-cli seed:generate --name add-comment-tag
- npx sequelize-cli db:seed:all