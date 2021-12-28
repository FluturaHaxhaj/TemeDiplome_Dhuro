# Node Js Project 

## Installation

```bash
$ npm install
```

## Running the app using node server (the normal way)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### .env file
See the .env.example file and then create new .env file based on that file.
Make sure to set up .env variables in order to adjust to your environment. 
If you plan to use local database then you have to create one in your local psql based on the data you have inputted in your .env file.

## Using Docker Compose

```sh
# Build the docker image
$ docker-compose build

# Start and login to the container
$ docker-compose up -d
$ docker-compose exec app sh
```

## Other useful Docker commands

```sh
# Get the container ID
$ docker ps

# View logs
$ docker logs <container id>

# Enter the container (In alpine, use sh because bash is not installed by default)
$ docker exec -it <container id> /bin/sh

```

