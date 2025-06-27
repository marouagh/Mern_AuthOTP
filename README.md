## AuthApp - MERN Authentication with Password Reset and Email OTP

This is a full-stack authentication app built with the MERN stack (MongoDB, Express.js, React, Node.js). It includes secure login, password reset via email OTP, and is CI/CD-ready.

## Features

- User registration and login
- Email OTP verification for password reset
- Secure password hashing (bcrypt) and JWT authentication
- Clean UI built with React
- Backend API built with Express
- Email sending with Nodemailer
- Environment-ready for CI/CD and Docker

## Screenshots

## 🚀 Tech Stack

### 🖥️ Frontend
- **React** – UI library for building components
- **React DOM** – React rendering for the web
- **React Router DOM** – Client-side routing
- **Axios** – HTTP client for API requests
- **React Toastify** – Toast notifications for user feedback
- **React Icons** – Popular icon packs as React components

### 🖧 Backend
- **Node.js**
- **Express.js** – Web server framework
- **Mongoose** – MongoDB object modeling
- **bcryptjs** – Password hashing
- **jsonwebtoken** – Token-based authentication
- **cookie-parser** – Parse cookies from requests
- **cors** – Enable CORS for cross-origin requests
- **dotenv** – Load environment variables
- **nodemailer** – Send emails (e.g., confirmation, reset password)
- **nodemon** – Dev dependency for automatic server restarts

  ## ⚙️ Development Tools
- **Concurrently** – Run frontend and backend servers in parallel
- **Nodemon** – Automatically restarts the backend server on changes


## Project Structure

AUTHMERNSTACK/
├── client/               # React frontend
├── server/               # Express backend
├── .github/
│   └── workflows/
│       └── ci.yml        # GitHub Actions workflow
├── README.md             # Documentation du projet
└── docker-compose.yml    # (si tu utilises Docker)



---

## ⚙️ Setup Instructions

npm install 

### 🧪 Backend

cd server
cp .env.example .env
npm install


#### 🌐 Frontend

cd client
npm install

#### ▶️ Run both server and client
npm run dev

### 🚀 Start the app

To start both frontend and backend at the same time, run:
npm run dev

