# 🚀 Discussion App

A full-stack discussion platform inspired by Stack Overflow where users can ask questions, post answers, upvote content, and manage discussions. The application is containerized using Docker and deployed on AWS EC2 with automated CI/CD using GitHub Actions.

### 🔗 Live Demo
Frontend: http://13.48.44.230

---

## ✨ Features

- 🔐 JWT Authentication
- ❓ Ask, edit and delete questions
- 💬 Add, edit and delete answers
- 👍 Upvote questions
- ✅ Mark accepted answers
- 🔍 Search questions
- 👤 User authentication and profile support
- 📱 Responsive UI

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

### DevOps & Deployment
- Docker
- Docker Compose
- AWS EC2
- Nginx
- GitHub Actions (CI/CD)

---

## 📂 Project Structure

```text
Discussion-App
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── config
│
├── client
│   ├── components
│   ├── context
│   ├── pages
│   └── services
│
├── docker-compose.yml
├── Dockerfile
│
└── .github
    └── workflows
```

---

## ⚙️ Getting Started

### Clone Repository

```bash
git clone https://github.com/nsrathour/Discussion-App.git

cd Discussion-App
```

### Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Run Locally

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🐳 Run with Docker

```bash
docker compose up --build
```

To stop containers:

```bash
docker compose down
```

---

## 🚀 Deployment

The application is deployed on **AWS EC2** using **Docker** and **Nginx**.

- Docker containers run the frontend and backend.
- Nginx acts as a reverse proxy.
- MongoDB Atlas stores application data.
- GitHub Actions automatically deploys every push to the `main` branch.

### CI/CD Flow

```text
Developer
   │
git push
   │
   ▼
GitHub Actions
   │
SSH into EC2
   │
git pull
   │
docker compose up --build -d
   │
Application Updated
```

---

## 🔒 Security

- JWT Authentication
- Protected API Routes
- Environment Variables
- MongoDB Atlas
- Nginx Reverse Proxy

---

## 🚀 Future Improvements

- Email Verification
- Forgot Password
- Notifications
- Kubernetes Deployment
- HTTPS (SSL)
- Unit & Integration Testing

---

## 👨‍💻 Author

**Navditya Singh Rathour**

- GitHub: https://github.com/nsrathour
- LinkedIn: https://www.linkedin.com/in/navditya-singh-rathour-7268a7288

---

⭐ If you found this project useful, consider giving it a star.
