# Tourism Scoreboard
The tourism scoreboard is a project that aims to visualize the BigData4Tourism data form South Tyrol in a user friendly way.

This repository contains the source code for the tourism scoreboard frontend.

[![CI](https://github.com/noi-techpark/davinci-bigdata4tourism-scoreboard-web/actions/workflows/ci.yml/badge.svg)](https://github.com/noi-techpark/davinci-bigdata4tourism-scoreboard-web/actions/workflows/ci.yml)

## Table of contents

- [Gettings started](#getting-started)
- [Running tests](#running-tests)
- [Deployment](#deployment)
- [Docker environment](#docker-environment)
- [Information](#information)

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 (and NPM)

If you don't want to install all prerequisites directly on your machine and instead use a Docker environment with all prerequisites already installed and configured, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
git clone git@github.com:noi-techpark/davinci-innovation-scoreboard-web.git
```

Change directory:

```bash
cd davinci-innovation-scoreboard-web
```

### Dependencies

Install all dependencies by executing the following command:

```bash
npm install
```

### Development

To start a local webserver that compiles and serves the project, simply run the following command:

```bash
npm run dev
```

The website will be available at [http://localhost:3000](http://localhost:3000). It also recompiles automatically if you make any change to the source code.

## Running tests

The unit tests can be executed with the following command:

```bash
npm run test
```

## Deployment

To deploy the website, simply run the command `npm run generate` from the root folder of the project. The final version of the website will then be generate inside the `dist` folder.

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

The website will be available at [http://127.0.0.1:3000](http://127.0.0.1:3000). It also recompiles automatically if you make any change to the source code.

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose exec java /bin/sh -c "..."
```

Some examples are:

```bash
docker-compose exec java /bin/sh -c "npm install"

# or

docker-compose exec java /bin/sh -c "npm run test"
```

## Information

### Support

For support, please contact [help@opendatahub.bz.it](mailto:help@opendatahub.bz.it).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `master` branch.

- Make sure the tests are passing.

- Create a pull request against the `master` branch.

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.

### Acknowledgements

This project is based on the wonderful [Innovation Scoreboard](https://github.com/noi-techpark/davinci-innovation-scoreboard-web), developed by [About Bits](https://aboutbits.it/).
