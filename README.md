# Getting Started

Project developed in Node.js + Typescript + Graphql + Mongoose to mongodb.

# Dependencies

* [Docker](https://docs.docker.com/engine/install/ubuntu/)
* [Docker-compose](https://docs.docker.com/compose/install/)

If prefer, you can run without docker. For that, you need these dependencies:

* [NPM]: `sudo apt install npm`
* [Node 10](https://nodejs.org/en/download/package-manager/)
* [Mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)


# Configurating ENV's

Create a copy from `.env.sample` and change name to `.env`.
Configure all ENV's:
```bash
PORT=8080
MONGODB_URI=mongodb://db
MONGODB_PORT=27017
MONGODB_DB=graphql
MONGODB_OTHERPARAMS=
LIMIT_TRYLOGIN=3
DRIVER=mongoose
```

In case use application without docker, change default `MONGODB_URI=mongodb://db` to `MONGODB_URI=mongodb://localhost`.

### Drivers

This application supports multiple drivers to save information and consulting.

Drivers implemented:
 * mongoose - (use a mongodb);
 * memory - (use intern memory);

# Docker-compose build

To build image execute this command: `docker-compose build`.

# Execute without docker-compose

To execute without docker, its simple:

In project paste:
 - `yarn install && yarn start`

# Developing

To view develop access `http://localhost:8080`

# Execute lint

To execute lint run: `yarn run lint`