# nest-graphql

> `nest-graphql` uses NestJs Typescript, Typegoose and Redis pubsub for subscription.

## Quick Start

The quickest way to get started with Nest-graphql server use [`github`](https://github.com/AlxPatidar/nest-graphql.git) repository and clone as shown below:

```bash
# Have access problem use sudo or run terminal with adminstration
$ git clone https://github.com/AlxPatidar/nest-graphql.git server
# change directory to server folder
$ cd server
```

Install dependencies and devDependencies:

```bash
$ yarn install / npm install
```

## Configuration

Configuration environment and change basic credentials:

```bash
$ cp .env.example .env
```

## Start Server

Start the nest server:

```bash
$ yarn start
```

Start the development server:

```bash
$ yarn start:dev
```

View the website at: http://localhost:4001/graphql

## Run Test

The most important part of this repository is testing. Indeed I have created this repository only for demonstrate graphql subscription testing.

```bash
# Only single and simple test is present
$ yarn run test
```

## Features

- Language - TypeScript
- Graphql(Query mutation and subscription)
- REST API
- Typegoose
- Jest
- Redis

## Useful npm/yarn commands

- `yarn build` - Build
- `yarn start` - Run application
- `yarn start:dev` - Run application in development mode
- `yarn test` - Run for test
