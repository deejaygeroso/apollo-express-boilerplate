# Apollo Express Boilerplate

Apollo Graphql on Express application setup that uses mongo as its database.

### Setup includes:

- apollo-express-graphql
- express
- mongoose
- Typescript
- Eslint
- Prettier
- Docker

### Required Setup

Create file `.env` file then add variable:

```
# Use ENV=prod for production
ENV=dev
PORT=8000
```

### Running docker in daemon

Note: `docker` && `docker-compose` should be installed on your machine.
Also, set `ENV=prod` from `.env` file.

```
docker-compose up --build -d
```

### Build nginx dockerfile manually

```
docker build -t client-nginx . --file config/nginx/Dockerfile
```

### Running application in development

```
npm run dev
```

### Running application for production using npm

```
npm run build && npm run start
```
