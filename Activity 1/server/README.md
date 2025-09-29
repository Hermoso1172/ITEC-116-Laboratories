<h1> To-Do List Backend: NestJS, Prisma, MySQL </h1>

## About

A simple To-Do backend using Nestjs.

## Features
- **Categories:**
  - [x] Create, Read, Update, and Delete operations

- **Tasks:**
  - [x] Create, Read, Update, and Delete operations

## Installation

Before you begin, make sure you have <a href="https://nodejs.org/en">NodeJS</a> installed.

1. Clone this repository:
   ```bash
   $ git clone https://github.com/Hermoso1172/ITEC-116-Laboratories.git
   ```
2. Access project folder in your terminal
   ```bash
   $ cd "Activity 1"
   $ cd "server"
   ```
3. Install dependencies
   ```bash
   $ npm i
   ```
4. Create a ``.env`` file with the same structure as the ``.env.example``. After doing this, you will need to change the DATABASE_URL inside the .env file with a valid <a href="https://www.prisma.io/docs/orm/overview/databases/mysql#connection-url">MySQL connection string</a> for your database.
   
5. Apply database migrations:
   ```bash
   $ npx prisma migrate dev
   ```
6. Start the project:
   ```bash
   $ npm run dev:start
   ```
7. Access the documentation at: <a href="http://localhost:3000">http://localhost:3000/api</a>

## Built With
#### Platform (<a href="https://nestjs.com/">Nestjs</a> + <a href="https://www.typescriptlang.org/">Typescript</a>)
<ul>
  <li>ORM: <a href="https://www.prisma.io/">Prisma</a></li>
  <li>Validation: <a href="https://github.com/typestack/class-validator">class-validator</a>, <a href="https://github.com/typestack/class-transformer">class-transformer</a></li>
  <li>API Documentation: <a href="https://swagger.io/">Swagger</a></li>
</ul>
