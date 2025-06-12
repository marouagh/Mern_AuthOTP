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

> *(Optional)* Add screenshots of login form, OTP, and reset password screens.

---

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

##### ▶️ Run both server and client
npm run dev
