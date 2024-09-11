# CodeChallenge-Tibo

## Project Description

This project is a REST API built with NestJS, designed to manage transactions within a current account. It allows for the creation of current accounts, depositing funds, and making payments. Each deposit or payment transaction is recorded in a separate entity to maintain a clear transaction flow.

## Project Requirements

- A new NestJS module for managing current accounts has been created.
- The module includes a controller, a service, and two entities: `CurrentAccount` and `Flows`.
- `CurrentAccount` entity fields:
  - Balance (integer)
  - Owner (string)
  - CreatedAt (date/time)
  - UpdatedAt (date/time)
  - Type (USD or ARS, enum)
- `Flows` entity fields:
  - Amount (integer): Positive for deposits, negative for payments.
  - CreatedAt (date/time)
  - UpdatedAt (date/time)
  - CurrentAccountId (int, FK): Associated current account ID.

## Implemented Endpoints

1. `POST /current-account`: Create a new current account.

   - Parameters:
     - `owner` (string): The name of the account owner. Only letters and spaces are allowed.
     - `type` (enum): The type of current account, either USD or ARS.

2. `POST /current-account/deposit`: Deposit funds into a current account.

   - Parameters:
     - `currentAccountId` (number): The ID of the current account.
     - `amount` (number): The amount of funds to deposit. Must be a positive number.

3. `POST /current-account/payment`: Make a payment from a current account.
   - Parameters:
     - `currentAccountId` (number): The ID of the current account.
     - `amount` (number): The amount of the payment. Must be a positive number indicating the amount to be deducted.

## Features

- Input data validation for each endpoint with proper error handling.
- Payments are not permitted if the current account lacks sufficient funds.
- DTOs (Data Transfer Objects) are created for each entity and endpoint.
- Deposits and payments are recorded in the `Flows` entity.
- One-to-many relationship between `CurrentAccount` and `Flows`.
- MySQL is used as the database.

## Getting Started

To get the project up and running, you can use the following commands from `package.json`:

- `npm run start`: Start the application.
- `npm run start:dev`: Start the application in watch mode.
- `npm run start:debug`: Start the application in debug mode.
- `npm run start:prod`: Start the application using the compiled files in the `dist` directory.
- `npm run test`: Run the tests.
- `npm run test:watch`: Run the tests in watch mode.
- `npm run test:cov`: Run the tests with coverage.
- `npm run test:e2e`: Run the end-to-end tests.
- `npm run lint`: Run the linter.
- `npm run build`: Build the application.
- `npm run format`: Format the code using Prettier.

## Setting Up MySQL with Docker

To set up the MySQL container, use the `docker-compose.yml` file with the following command:

```bash
docker-compose -f "docker-compose.yml" up -d --build
```

This will start a MySQL instance on port `3307`. The necessary environment variables are specified in the `.env` file and include:

- `MYSQL_URL`: Connection URL for the MySQL database.
- `MYSQL_HOST`: Host for the MySQL database.
- `MYSQL_DATABASE`: Database name.
- `MYSQL_USER`: Username for the database.
- `MYSQL_PASSWORD`: Password for the database user.
- `MYSQL_ROOT_PASSWORD`: Password for the root user.
- `MYSQL_PORT`: Port on which MySQL is exposed.

## Accessing Swagger Documentation

The Swagger documentation for the API can be accessed by navigating to `http://localhost:3000/api-docs` after starting the application. This is set up in `src/main.ts` where the Swagger module is configured and served on the `/api-docs` endpoint.
