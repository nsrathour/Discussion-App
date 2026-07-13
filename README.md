# 🚀 Discussion App

A full-stack discussion platform inspired by Stack Overflow where users can ask questions, post answers, upvote questions, and manage discussions. The application is deployed on AWS EC2 with automated CI/CD using GitHub Actions.

---

## 🌐 Live Demo

**Frontend:** http://13.48.44.230




---

## ✨ Features

### User Authentication
- Register and Login using JWT Authentication
- Secure protected routes
- User profile support

### Questions
- Ask new questions
- View all questions
- Search questions
- View question details
- Edit/Delete your own questions
- Track question views
- Upvote questions

### Answers
- Add answers
- Edit/Delete your answers
- Mark accepted answers
- Answers sorted by accepted status

### UI
- Responsive design
- Modern React UI
- Tailwind CSS styling

---

# 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- MongoDB Atlas
- Mongoose

### Deployment
- AWS EC2
- Nginx
- PM2
- GitHub Actions (CI/CD)

---

# 📁 Project Structure

```
Discussion-App
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── utils
│   │
│   └── package.json
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── utils
│   │
│   └── package.json
│
└── .github
    └── workflows
        └── deploy.yml
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/nsrathour/Discussion-App.git

cd Discussion-App
```

---

## Backend

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET
```

Run

```bash
npm start
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# 🚀 Deployment Architecture

```
                    Internet
                        │
                        ▼
                   GitHub Repository
                        │
                 GitHub Actions
                        │
                    SSH Deploy
                        │
                        ▼
                 AWS EC2 Instance
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
     Nginx                        PM2 (Node.js)
        │                               │
        ▼                               ▼
 React Production Build          Express Backend
        │                               │
        └───────────────┬───────────────┘
                        ▼
                 MongoDB Atlas
```

---

# 🔄 CI/CD Pipeline

Every push to the `main` branch automatically:

- Pulls latest code
- Installs backend dependencies
- Installs frontend dependencies
- Builds React application
- Deploys frontend to Nginx
- Restarts backend using PM2
- Reloads Nginx

Workflow:

```
Developer
    │
git push
    │
    ▼
GitHub Repository
    │
GitHub Actions
    │
SSH
    ▼
AWS EC2
    │
git pull
    │
npm install
    │
npm run build
    │
Restart PM2
    │
Reload Nginx
    │
Live Website Updated
```

---

# 🔐 Security

- JWT Authentication
- Protected API Routes
- Environment Variables
- MongoDB Atlas
- Nginx Reverse Proxy

---

# 📸 Screenshots



- Home Page
- Login
- Ask Question
- Question Details
- Profile

---

# 📌 Future Improvements

- Email Verification
- Forgot Password
- Notifications
- Tags & Categories
- User Reputation
- Docker
- HTTPS
- Unit Testing
- GitHub Actions Testing
- Kubernetes Deployment

---

# 👨‍💻 Author

**Navditya Singh Rathour**

- GitHub: https://github.com/nsrathour
- LinkedIn: (Add your LinkedIn)

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub.
