# Simple CRUD API

This project is a basic CRUD API built using Node.js and TypeScript. The API provides endpoints for creating, reading, updating, and deleting users stored in an in-memory database.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **Create, Read, Update, Delete (CRUD)** operations for users.
- **In-memory database** for simplicity (no external database required).
- **UUID** used to uniquely identify each user.
- **Error handling** for invalid requests and internal server errors.
- **Environment variable configuration** for port management.
- **Development and Production modes**.
- **Horizontal scaling** using Node.js cluster API.

## Requirements

- Node.js version 22.9.0 or higher.
- TypeScript version 4.3.2 or higher.
- The following npm packages: `nodemon`, `dotenv`, `typescript`, `ts-node-dev`, `uuid`.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tursynkhan/simple-crud-api.git
   ```
   ```
   cd simple-crud-api
   ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Create an .env file in the root directory and specify the port (default is 4000):**
    ```
    PORT=4000
    ```

## Running the Project
There are two main modes: development and production.

### Development Mode
In development mode, the app will restart automatically when you make changes to the source code.

To start the app in development mode, run:
  ```
  npm run start:dev
  ```

### Production Mode
  In production mode, the TypeScript files will be compiled to JavaScript and then executed.

To start the app in production mode, run:
```
npm run start:prod
```

## API Endpoints

### Base URL: `/api/users`

| Method | Endpoint             | Description               | Status Codes     |
|--------|----------------------|---------------------------|------------------|
| GET    | `/users`              | Get all users             | 200              |
| GET    | `/users/{userId}`     | Get a user by their ID    | 200, 400, 404    |
| POST   | `/users`              | Create a new user         | 201, 400         |
| PUT    | `/users/{userId}`     | Update an existing user   | 200, 400, 404    |
| DELETE | `/users/{userId}`     | Delete a user             | 204, 400, 404    |



