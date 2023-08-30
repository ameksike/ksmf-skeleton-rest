# KsMf REST API Skeleton
This is a template to create REST API services in a simple and easy way. This project implements an example where three main entities are managed: Users, Tags and Comments. The data is managed using a relational model with support for different database management systems (MySQL, PostgreSQL, SQLite, etc.). This solution provides from its home page access to documentation that helps understand the services, including how to test it. Also, this project shows the use of many-to-many and one-to-many relationships between entities, parameter validators, management of duplicates entries, sort and filter data, unit and integration test based on TDD approach, and application of some design patterns and principles such as SOLID.

## Install 
- git clone https://github.com/ameksike/ksmf-skeleton-rest.git
- mv ksmf-skeleton-rest my-project
- cd my-project
- npm install

## Configuration 
- edit ```./cfg/config.json``` and define database access options
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all
- npm start

## Docker
    $ docker-compose up -d db
    $ docker-compose stop db
    $ docker-compose -f docker-compose.yml up -d api
    $ docker-compose -f docker-compose.yml stop api
    $ docker logs oauth-server-api-1 -f
    $ docker-compose run -it api /bin/ash
    $ docker-compose build --no-cache api

## Demo run
- npm run dev
- GET http://localhost:3005/api/v1/doc
- GET http://localhost:3005/api/v1/user
- GET http://localhost:3005/api/v1/tag
- GET http://localhost:3005/api/v1/comment
- GET http://localhost:3005/api/v1/comment/1/tag
- https://app.forestadmin.com/Ksike

## Filters
The filters are defined based on an array data structure, each record define a query criterion as a list of 3 element [field, value, operator]. The filters are specified as one more variable within the url of the endopint list.
```
filter = [ 
    [
        field: STRING
        value: STRING 
        operator: STRING [OPTIONAL] default: eq, values: eq,ne,is,not,or,gt,lt,between,in,like,regexp 
    ],
    ...
]
```
For more information about the available operators, see: [operators on filters](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators).

### Filters examples
- GET http://localhost:3005/api/v1/comment?filter=[["flightId", 666]]
- GET http://localhost:3005/api/v1/comment?filter=[["flightId", [666, 222], "in"]]
- GET http://localhost:3005/api/v1/comment?filter=[["date", "2022-05-27", "gte"], ["comment", "Cupidatat", "iLike"]]


## Sort
It is possible to sort the data based on different criteria. The criteria are described as an array of elements. These elements are arrays in the form [column or field name, direction].
```
sort = [ 
    [
        field: STRING
        direction: STRING [OPTIONAL] default: ASC, values: ASC|DESC
    ],
    ...
]
```
The column or field name will be escaped correctly and the direction will be checked in a whitelist of valid directions (such as ASC, DESC, NULLS FIRST, etc).

### Sort examples
- GET http://localhost:3005/api/v1/comment?sort=[["date"]]
- GET http://localhost:3005/api/v1/comment?sort=[["date","DESC"], ["comment","ASC"]]


## Pagination 
The **page** and **size** options allow you to work with limiting and pagination. The size option defines the limit of rows to get from the server and with **page** you can navigate through data for get better performance.

- GET http://localhost:3005/api/v1/comment?page=1&size=3
- GET http://localhost:3005/api/v1/comment?page=2&size=3
- GET http://localhost:3005/api/v1/comment?page=3&size=3

### Demo query with filters and sorting
- GET http://localhost:3005/api/v1/comment?page=2&size=2&filter=[["flightId",666]]&sort=[["date","DESC"]]
- GET http://localhost:3005/api/v1/comment?page=2&size=2&filter=[["flightId",666], ["comment","Lorem ipsum dolor", "iLike"]]&sort=[["date","DESC"]]


## Test
- npm run test

## Create Data Base Migrations 
- npx sequelize-cli model:generate --name user --attributes name:string,age:integer,job:string,note:text
- npx sequelize-cli model:generate --name comment --attributes comment:text,userId:integer,flightId:integer,tagId:integer
- npx sequelize-cli model:generate --name tag --attributes name:string
- npx sequelize-cli model:generate --name tag_comment --attributes comment_id:integer,tag_id:integer
- npx sequelize-cli model:generate --name supplier --attributes user_id:integer,service_id:integer,status:integer 
- npx sequelize-cli model:generate --name customer --attributes user_id:integer,service_id:integer,status:integer 
- npx sequelize-cli model:generate --name affiliate --attributes code:string,user_id:integer,owner_id:integer,campaign_id:integer,status:integer  
- npx sequelize-cli model:generate --name campaign --attributes name:string,description:string,type:integer,value:integer,percent:integer,minimum:integer,maximum:integer,expiration:date,status:integer  
- npx sequelize-cli model:generate --name service --attributes name:string,description:string,image:string,owner_name:string,owner_id:integer,type:integer,category:integer,country:string,address:string,grupo_id:integer,stock:integer,store:integer,status:integer 
- npx sequelize-cli model:generate --name bill --attributes service_id:integer,currency:string,change:integer,amount:integer,type:integer,cost:integer,tax:integer,tax_percent:integer,transport:integer,discount:integer,discount_percent:integer,decrease:integer,price:integer,benefit:integer,benefit_percent:integer,profit:integer,profit_percent:integer,status:integer 
- npx sequelize-cli model:generate --name file --attributes name:string,content:string,url:string,status:integer  
- npx sequelize-cli model:generate --name group --attributes name:string,description:string,status:integer   
- npx sequelize-cli model:generate --name group_user --attributes grupo_id:integer,user_id:integer,status:integer  
- npx sequelize-cli model:generate --name group_service --attributes grupo_id:integer,service_id:integer,status:integer  
 
- npx sequelize-cli db:migrate

## Create Data Base Seeders
- npx sequelize-cli seed:generate --name add-user
- npx sequelize-cli seed:generate --name add-tag
- npx sequelize-cli seed:generate --name add-comment
- npx sequelize-cli seed:generate --name add-comment-tag
- npx sequelize-cli db:seed:all
