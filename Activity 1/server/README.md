<h1> To-Do List Backend: NestJS, Prisma, MySQL </h1>

## About

Backend for the to-do app.

## Installation

1. Install dependencies
   ```bash
   $ npm i
   ```
2. Create a ``.env`` file with the same structure as the ``.env.example``. After doing this, you will need to change the DATABASE_URL inside the .env file with a valid <a href="https://www.prisma.io/docs/orm/overview/databases/mysql#connection-url">MySQL connection string</a> for your database.
   
3. Apply database migrations:
   ```bash
   $ npx prisma migrate dev
   ```
4. Start the project:
   ```bash
   $ npm run dev:start
   ```
6. Access the API at: <a href="http://localhost:3000">http://localhost:3000</a>
5. Access the API documentation at: <a href="http://localhost:3000">http://localhost:3000/api</a>

## Built With
#### Platform (<a href="https://nestjs.com/">Nestjs</a> + <a href="https://www.typescriptlang.org/">Typescript</a>)
<ul>
  <li>Database: <a href="https://www.mysql.com/">MySQL</a></li>
  <li>ORM: <a href="https://www.prisma.io/">Prisma</a></li>
  <li>Validation: <a href="https://github.com/typestack/class-validator">class-validator</a>, <a href="https://github.com/typestack/class-transformer">class-transformer</a></li>
  <li>API Documentation: <a href="https://swagger.io/">Swagger</a></li>
</ul>

## Directory Structure
```
.
└── server/
    ├── prisma                       # Prisma ORM configuration and database schema files
    ├── src                          # Main source code folder/
    │   ├── categories               # Module handling task categories (CRUD logic, controllers, services, DTOs)
    │   ├── database                 # Database connection setup and configuration
    │   ├── tasks                    # Module handling tasks (CRUD logic, controllers, services, DTOs)
    │   ├── app.controller.spec.ts   # Unit tests for the main app controller
    │   ├── app.controller.ts        # Root controller handling base routes
    │   ├── app.module.ts            # Main NestJS module that imports and configures other modules
    │   ├── app.service.ts           # Core service
    │   └── main.ts                  # Application entry point
    ├── test                         # Testing directory
    ├── .env.example                 # Example environment variables file
    ├── .gitignore                   # Files/folders to be ignored by Git
    ├── .prettierrc                  # Code formatting configuration for Prettier
    ├── .README.md                   # Project documentation
    ├── .eslint.config.mjs           # ESLint configuration
    ├── .nest-cli.json               # NestJS CLI configuration file
    ├── .package-lock.json           # Auto-generated dependency lock file
    ├── .package.json                # Project metadata and dependencies
    ├── .tsconfig.build.json         # TypeScript configuration for the build process
    └── .tsconfig.json               # Base TypeScript configuration
```
