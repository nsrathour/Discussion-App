# 🚀 Discussion App

A full-stack discussion platform inspired by Stack Overflow where users can ask questions, post answers, upvote content, and manage discussions.

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
- 👤 User profiles
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

### Deployment
- AWS EC2
- Nginx
- PM2
- GitHub Actions (CI/CD)

---

## 📂 Project Structure

```
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
│   ├── pages
│   ├── context
│   └── services
│
└── .github/workflows
```

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/nsrathour/Discussion-App.git
cd Discussion-App
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run:

```bash
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🚀 Deployment

The application is deployed on **AWS EC2**.

- Nginx serves the React application
- PM2 manages the Node.js backend
- MongoDB Atlas stores data
- GitHub Actions automates deployment

### CI/CD Flow

```
Git Push
   ↓
GitHub Actions
   ↓
SSH to EC2
   ↓
Pull Latest Code
   ↓
Install Dependencies
   ↓
Build React App
   ↓
Restart PM2
   ↓
Live Website Updated
```

---

## 🔒 Security

- JWT Authentication
- Protected Routes
- Environment Variables
- Nginx Reverse Proxy

---

## 🚀 Future Improvements

- Email Verification
- Forgot Password
- Notifications
- Docker Support
- HTTPS
- Unit Testing

---

## 👨‍💻 Author

**Navditya Singh Rathour**

- GitHub: https://github.com/nsrathour
- LinkedIn: https://www.linkedin.com/in/navditya-singh-rathour-7268a7288

---

⭐ If you found this project helpful, consider giving it a star.
