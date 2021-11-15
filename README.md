# Sharespace coding task - Node.js developer

## 📖 Table of Contents

- [✨ Getting started](#%e2%9c%a8-getting-started)
  - [Prerequisites](#prerequisites)
  - [Bootstrap](#bootstrap)
  - [Open API Docs](#open-api-docs)
- [📜 Scripts](#%f0%9f%93%9c-scripts)
  - [Test](#test)
  - [Analyze](#analyze)
  - [Development](#development)
- [📏 Rules](#%f0%9f%93%8f-rules)
- [📚 Documentation](#%f0%9f%93%9a-documentation)
  - [Commit Message Guideline](#commit-message-guideline)

## ✨ Getting started

### Prerequisites

You need to have installed the following software:

- [nodejs](https://nodejs.org/en/) (>=14.17.0)
- [yarn](https://yarnpkg.com/) (>= 1.22.0)
- [docker](https://www.docker.com/) (>=1.13.0)
  - [compose](https://docs.docker.com/compose/) (>=3.0)

### Bootstrap

```bash
  git clone git@github.com:Miczeq22/challenge-nodejs.git
  cd challenge-nodejs
  yarn
  cp .env.dist .env
  docker-compose up -d
  yarn start:dev
```

There is also available script to run seeds for `desks`:

```bash
yarn seed
```

_Please remember that `.env` must be implemented for proper work._

### Open API Docs

The application contains documentation for rest endpoints. Documentation was written with `Swagger`. To view the documentation, just go to `GET /api` endpoint.

## 📜 Scripts

> Every command should start with `yarn/yarn run`

### Test

- `test`: Run `jest` in standard mode.
- `test:watch`: Run `jest` in watch mode.

### Analyze

- `format`: Runs `prettier` to format all files.
- `lint`: Runs `eslint`. Output any errors.

### Development

- `start:dev`: Runs application in development mode.

## 📏 Rules

This project follows clean architecture rules. Each of the layers communicates with each other using abstraction and the lower layers know nothing about the upper layers.

![Clean architecture](https://miro.medium.com/max/1200/0*JD606Sqx6RYZLKdu.)

We can distinguish four layers in this repository:

- `api` - here a server is prepared to communicate with the outside world using the REST API powered by `express`. With the lower layer it communicates only using the `command bus` and `query bus`.

- `application` - this layer is responsible for the implementation of commands and queries available in the application. According to the CQRS pattern.

- `infrastructure` - layer responsible for concrete implementations of external tools, e.g. persistence layer is implemented using postgresql.

- `core` - layer that is responsible for creating and managing domain objects.

## 📚 Documentation

### Commit Message Guideline

- For easier commit type recognition commit messages are prefixed with an emoji
- See available [commit-emojis](https://github.com/sebald/commit-emojis#available-emojis)
