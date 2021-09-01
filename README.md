# Apollo Express Boilerplate

Apollo Graphql on Express application setup that uses mongo as its database.

### Setup includes:

- Apollo-express-graphql v2
- Express v4
- Mongoose v5
- Typescript v4
- Graphql v15
- Eslint
- Prettier
- Docker

---

## Installation

`NOTE:` You need to have a `MongoDB running` to be able to run the application.  
If you want to run Docker, then I suggest using:  

- `Docker version 20.10.7`
- `docker-compose version 1.29.2`

since these are what I'm using to run the application.

#### Step 1. Clone the application

```
git clone https://github.com/deejaygeroso/apollo-express-boilerplate.git
```

#### Step 2 (Optional). Install MongoDB using Docker

Install `mongodb` using docker.  
Then go to `config/docker` directory which contains a `docker-compose-mongo.yml` file for running MongoDB on your local machine.  
Then run docker-compose command.  

```
docker pull mongo
cd ./config/docker/
docker-compose -f docker-compose-mongo.yml  up -d
```

#### Step 3. Create environment variables

`NOTE:` Before running the application, environment variables must be defined.  
`Instruction:` Create a file `.env` inside your project directory, then add the variables with its corresponding values indicated in the table below.  

| Variables   | Definition                                                                  | Example Values                   |
| :---------- | :-------------------------------------------------------------------------- | :------------------------------- |
| AUTH_SECRET | Allows secure communication between GraphQL client and server.              | <Secret Key>                     |
| ENV         | Defines the environment the app will be running on.                         | prod                             |
| DEBUG       | Used in logging info to the console.                                        | app:\*                           |
| PORT        | The port where the app will run.                                            | 3000                             |
| MONGO_URL   | Set value to `mongodb://localhost:27017/server-app`, when not using docker. | mongodb://mongo:27017/server-app |

#### Step 4. Run Application

##### Running application without using Docker Compose

`NOTE:` Make sure `.env` is setup correctly.  
Also make sure a running `MongoDB` is running in your system.  
Then run application with this command:  

```
npm run dev
```

If you want to build the app for production use then run these commands:  

```
npm run build
npm run start
```

##### Running application using Docker Compose

This will automatically run and deploy your app in a docker container.  
`NOTE:` Make sure you have no running mongo on your docker container.  
If you did step two then you should stop that container using `docker stop <container-id>`.  
Use `docker ps` to view running containers and get the id of the container you want to stop.  

`IMPORTANT:` Update your mongo url in `.env` and change it to `MONGO_URL=mongodb://mongo:27017`.  
This will allow your application container to connect to your mongo container.  

```
docker-compose up --build -d
```

---

## API Routes

- `https://localhost:3000/api/sample`  
  This is a sample api you could use to test if the project was setup correctly.  
  Request:  
  ```
  {
    body: {},
    method: GET
  }
  ```
  Response:  
  ```
  {
    value: "Hello World"
  }
  ```

---

## Graphql Playground

- `https://localhost:3000/graphql`  
  You can get more information for graphql playground [here](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)  

Create New User:
```
mutation UserCreate {
  userCreate(input: {
    email: "email@gmail.com",
    password: "password",
    type: "admin",
  }) {
    _id
    email
  }
}
```

Get All Users:
```
{
  users {
    _id
    email
    type
  }
}
```

Update User (Note: _id must come from database):
```
mutation UserUpdate {
  userUpdate(input: {
    _id: "60e98d73ab8bc50e1aa1d6a3",
    email: "email2@gmail.com",
    password: "password",
    type: "user",
  }) {
    _id
    email
    type
  }
}
```

User account login:
mutation UserLogin {
  userLogin(input: {
    email: "email@gmail.com",
    password: "password",
  }) {
    _id
    email
  }
}

---

## Project Files and Directory structure

```
adally-server
    - config
        - docker
        - eslint
        - scripts
            - prod
            - stage
        - typescript
     - dist
     - node_modules
     - public
        - robots.txt
     - src
        - api
        - apollo
            ...
            - users
                - mutations
                - query
                - resolvers.ts
                - typeDef.ts
            ...
        - global
            - constants
            - functions
            - utilities
        - interfaces
        - mongoose
            - config
            - models
            - schemas
        - services
        - Server.ts
        - index.ts
    - .dockerignore
    - .env
    - .gitignore
    - .gitlab-ci.yml
    - .prettierignore
    - .prettierrc
    - docker-compose.dev.yml
    - docker-compose.yml
    - package.json
    - README.md
    - RELEASE.md
    - robots.txt

```

##### config

Contains project configuration like `docker`, `eslint`, `typescript` and etc.

##### dist

Contains the build directory of the project.

##### node_modules

Contains the libraries used by the project.

##### src

Contains the project source code.

| Directories | Definition                                                                           |
| :---------- | :----------------------------------------------------------------------------------- |
| api         | Place where you store all your api routes and their corresponding logic              |
| apollo      | Contains apollo configuration, mutation and queries                                  |
| global      | Contains global and reusable `variables, functions and Class objects` used by the project  |
| interfaces  | Contains application interfaces                                                      |
| mongoose    | Contains mongo configuration, models and schemas needed to use mongo database        |
| services    | This will be where main business logic of the application. You can consider this somehow like a Controller in a MVC architecture |
| Server.ts   | Class that initializes our server                                                    |
| index.ts    | Entry point of the application                                                       |

##### .dockerignore

Files that docker will ignore.

##### .env

Environment variables needed to run the application.

##### .gitignore

Files that git will ignore.

##### .gitlab-ci.yml

Gitlab CI script.

##### .prettierignore

Files that prettier will ignore.

##### .prettierrc

Prettier configuration.  
It was intentinally placed here instead under config directory since `VSCode` is configured to find prettier configuration on the project root directory.

##### docker-compose.dev.yml

Docker configuratoin to run application. Only used in development.

##### docker-compose.yml

Docker configuratoin to run application. Used in production application.

##### package.json

Holds various metadata relevant to the project.  
This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies.

##### README.md

Contains more information about the project.

##### RELEASE.md

Release information about the project.

##### public/robots.txt

Also known as the robots exclusion protocol or simply robots.txt,  
is a standard used by websites to communicate with web crawlers and other web robots.
