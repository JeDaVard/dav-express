## Description

Desc

## Quick Start

1. Clone or download this repository

    ```

    ```

2. Enter the application folder

    ```

    ```

3. Create `.env` file from `.env_local`
    ```
    cp .env_local .env
    ```
4. Install the dependencies
    ```
    yarn install
    ```
5. Synchronize the database

    ```
    yarn db:migrate
    ```

6. Seed the database
    ```
    yarn db:seed --development
    ```
7. Run the application
    1. Normal mode
        ```
        yarn start
        ```
    2. Watcher mode with nodemon
        ```
        yarn dev
        ```
8. Open health endpoint in browser
    ```
    http://localhost:3000/api/health
    ```

## Using Docker

Use `docker-compose` config files to start [additional services](#additional-services).

1. To run only the additional services
    ```
    docker-compose up --build
    ```

## More commands

1. Run all tests
    ```
    yarn test
    ```
2. Run all linters
    ```
    yarn check
    ```

https://github.com/BretFisher/docker-mastery-for-nodejs
https://github.com/BretFisher/kubernetes-mastery
https://github.com/BretFisher/node-docker-good-defaults
https://github.com/BretFisher/udemy-docker-mastery
