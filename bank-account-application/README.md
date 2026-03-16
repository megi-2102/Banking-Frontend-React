# Bank Account Application

This project is a Bank Account Management Application developed as part of the Sprint 5 Assessment.

The application allows users to manage customers and bank accounts through a web interface built with React, connected to a Spring Boot REST API backend.

---

## Running the Application

### Start the backend

Run the Spring Boot application:

`mvn spring-boot:run`

The backend will run on:

`http://localhost:8080`

---

### Start the Frontend

Navigate to the frontend project folder and run:

`npm install`

`npm start`

The application will run on:

`http://localhost:3000`

---

## API Endpoints

Customer endpoints: 

```
GET    /api/customers
GET    /api/customers/{id}
POST   /api/customers
PUT    /api/customers/{id}
DELETE /api/customers/{id}
```

Account endpoints:

```
GET    /api/accounts
GET    /api/accounts/{id}
POST   /api/accounts/customer/{customerId}
PUT    /api/accounts/{id}
DELETE /api/accounts/{id}
GET    /api/accounts/city/{city}
```