
# Core API – NestJS Backend (PostgreSQL + TypeORM)

This is a backend API built with **NestJS**, **PostgreSQL**, and **TypeORM**.  
It demonstrates real-world backend architecture including entities, relations, repositories, and transactions.

---

##  Tech Stack

- NestJS (Node.js framework)
- TypeScript
- PostgreSQL
- TypeORM
- REST API

---

##  Core Concepts

### SQL vs NoSQL
This project uses **SQL (PostgreSQL)** for structured relational data instead of NoSQL document storage.

---

###  Entities & Relations
Database models are defined using TypeORM entities:

- User
- Project
- Task

Relationships:

- One User → Many Projects
- One Project → Many Tasks

---

###  Repositories
Uses `@InjectRepository()` to access database operations.

This helps separate business logic from database logic.

---

###  Query Handling (ORM)
Uses TypeORM repository methods:

- find
- findOne
- save
- update
- delete

Also uses relations to fetch connected data.

---

###  Transactions
Implements database transactions to ensure data consistency.

Example:
- Creating a Project + First Task together
- Either both succeed or both fail

---

###  Dependency Injection
Uses NestJS Dependency Injection with:

- `InjectRepository`
- `DataSource`

This keeps the code clean and testable.

---

##  Features

- Create User
- Create Project
- Create Task
- Create Project with first Task (Transaction)
- Get all Projects with relations
- Get single Project
- Update Project
- Delete Project

---

##  Architecture

- Controller: handles HTTP requests
- Service: business logic
- Repository: database access layer

---

##  Learning Outcomes

This project demonstrates:

- Replacing in-memory data with a real database
- Working with relational data
- Using transactions for data safety
- Building scalable NestJS architecture
- Applying TypeORM in real-world apps

---
```text
dbcore-api/
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│
│   ├── config/                     #  Configuration layer
│   │   ├── database.config.ts      # DB connection settings
│   │           
│   │
│   ├── modules/
│   │   ├── users/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   │
│   │   ├── projects/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.service.ts
│   │   │   └── projects.module.ts
│   │   │
│   │   ├── tasks/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│
├── .env                           #  Environment variables
├── package.json
└── README.md
##  Future Improvements

- JWT Authentication
- Role-based access control
- Pagination & filtering
- DTO validation (class-validator)
- Swagger documentation
