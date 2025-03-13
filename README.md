Task Management Application

📌 Overview

This is a full-stack Task Management application built using React.js for the frontend and Node.js with Express.js for the backend. The app allows users to register, log in, and manage their tasks efficiently. Authentication is handled using JWT, and tasks are stored securely in a database.

🏗 Tech Stack

React.js
Redux Toolkit (for state management)
Axios (for API requests)
React Router (for navigation)
Node.js
Express.js
MongoDB with Mongoose
JWT for Authentication
bcrypt.js for Password Hashing

🚀 Features

✅ User authentication (Sign up, Login, Logout)✅ JWT-based secure authentication✅ Create, Read, Update, and Delete (CRUD) operations for tasks✅ Protected routes for logged-in users✅ Error handling with proper responses✅ API request validation

🔧 Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/your-repo-url.git
cd task-management-app

2️⃣ Backend Setup

cd backend
npm install

Create a .env file inside the backend folder and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server: node server.js

3️⃣ Frontend Setup

cd frontend
npm install

Start the frontend development server: npm start
