# Task Management API

## Overview
The Task Management API is a RESTful API for managing tasks. Built with Node.js, Express, and MongoDB, this API allows users to create, update, retrieve, and delete tasks. User authentication is handled via JSON Web Tokens (JWT).

## Features
- User registration and authentication
- Create, read, update, and delete tasks
- Filter tasks by status (pending/completed)
- API documentation with Swagger UI

## Installation Instructions
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
2.Install dependencies 
    npm install
3.Set up environment variables
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET_KEY=your_jwt_secret
   PORT=8000
4.Run the application
   npm start


## API Documentation
The API documentation is available at the following URL:
- [Swagger UI](http://localhost:8000/api-docs) *(for local development)*


