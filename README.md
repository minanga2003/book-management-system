# Book Management System

A simple **Book Management Web Application** built as part of an **Intern / Trainee Software Engineer assignment**.

The system allows users to **add, view, update, and delete books** using a web interface.
The frontend is built with **Angular**, and the backend is built with **ASP.NET Core Web API using C#**.

---

# Technologies Used

Frontend

* Angular
* HTML
* CSS
* TypeScript

Backend

* ASP.NET Core Web API
* C#
* .NET

Storage

* In-memory data storage using a C# List (no database required)

---

# Project Structure

```
book-management-system/
│
├── frontend/                 # Angular application
│
├── backend/                  # ASP.NET Core Web API
│   └── BookManagement.Api
│
└── README.md
```

---

# Features

* View list of books
* Add new books
* Edit existing books
* Delete books
* RESTful API integration
* Simple in-memory data storage

Book Model Fields

* id
* title
* author
* isbn
* publicationDate

---

# Prerequisites

Before running the project, make sure you have installed:

* Node.js (LTS recommended – v18 or v20)
* npm
* Angular CLI
* .NET SDK (10.0 or later)
* Git (optional)

Install Angular CLI if not installed:

```bash
npm install -g @angular/cli
```

---

# Running the Backend (ASP.NET API)

Navigate to the backend folder:

```bash
cd backend
```

Restore dependencies:

```bash
dotnet restore
```

Run the API:

```bash
dotnet run
```

The API will start on the HTTPS port configured in:

```
Properties/launchSettings.json
```

Example base URL:

```
https://localhost:5001
```

---

# Backend API Endpoints

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/books      | Get all books     |
| GET    | /api/books/{id} | Get a book by ID  |
| POST   | /api/books      | Create a new book |
| PUT    | /api/books/{id} | Update a book     |
| DELETE | /api/books/{id} | Delete a book     |

---

# Running the Frontend (Angular)

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

or

```bash
ng serve
```

The application will run at:

```
http://localhost:4200
```

---

# API Configuration

The Angular application communicates with the backend API.

Check the API base URL in:

```
src/environments/environment.ts
src/environments/environment.prod.ts
```

Example configuration:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:5001/api'
};
```

Update the port if your backend runs on a different one.

---

# CORS Configuration

CORS is enabled in the backend to allow requests from:

```
http://localhost:4200
```

If the frontend runs on another port or domain, update the CORS settings in `Program.cs`.

---

# Building for Production

Frontend production build:

```bash
ng build --configuration production
```

The output will be generated inside:

```
dist/
```

---

# Testing

Frontend tests:

```bash
npm test
```

Backend tests (if available):

```bash
dotnet test
```

---

# Demonstration

As part of the assignment submission, a **screen recording video** demonstrating the following features is included:

* Viewing books
* Adding a book
* Editing a book
* Deleting a book
* Interaction between Angular frontend and ASP.NET API

---

# License

This project is created for educational and assignment purposes.
