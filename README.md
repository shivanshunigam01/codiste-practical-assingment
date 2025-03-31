
# 📸 Social Media Platform (MERN Stack) : CODISTE

## 🚀 Project Overview

This is a **social media platform** built using the **MERN Stack** where users can:
- **Register & Login**
- **Edit & View Profiles**
- **Create and Upload Posts** (Title, Description, Image URL)
- **Like & Unlike Posts**
- **View Posts with Like Counts and Recent Likes**

## 🛠️ Tech Stack

| **Technology**  | **Description** |
|-----------------|----------------|
| **Backend**     | Nest.js (Node.js, Express) |
| **Frontend**    | React.js / Next.js |
| **Database**    | SQL (PostgreSQL / MySQL) |
| **State Management** | Redux Toolkit / Zustand |
| **API Handling** | React Query |

---

## 📂 Folder Structure

### **Backend (Nest.js)**
```
backend/
├── src/
│   ├── common/        # DTOs & Utility functions
│   ├── modules/
│   │   ├── auth/      # Authentication APIs (Register, Login)
│   │   ├── user/      # User Profile APIs
│   │   ├── post/      # Post CRUD, Like/Unlike APIs
│   ├── main.ts
│   ├── app.module.ts
│   └── app.service.ts
├── .env
├── package.json
└── README.md
```

### **Frontend (React.js)**
```
frontend/
├── src/
│   ├── api/          # API requests (React Query)
│   ├── components/   # Reusable UI components
│   ├── models/       # TypeScript models
│   ├── App.tsx
│   ├── index.tsx
│   ├── styles/
│   └── store/        # Redux/Zustand store
├── package.json
└── README.md
```

---

## 📌 Features & Endpoints

### 🔹 **Authentication**
- `POST /auth/register` ➝ Register new user
- `POST /auth/login` ➝ Login user

### 🔹 **User Management**
- `GET /user/profile` ➝ Get logged-in user profile
- `PUT /user/update` ➝ Edit profile

### 🔹 **Post Management**
- `POST /post/create` ➝ Create a post
- `GET /post/all?page=1&limit=10` ➝ Get paginated posts
- `PUT /post/like/:postId` ➝ Like a post
- `PUT /post/unlike/:postId` ➝ Unlike a post

📌 **Post Response Format**
```json
[
  {
    "Title": "Sample Post",
    "Description": "This is a sample description",
    "Image": "https://example.com/image.jpg",
    "Likes": {
      "TotalLikes": 5,
      "RecentLikedBy": [
        { "Id": 1, "Name": "John Doe" },
        { "Id": 2, "Name": "Jane Smith" }
      ]
    }
  }
]
```

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```

### **2️⃣ Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Configure database & secrets
npm run start
```

### **3️⃣ Frontend Setup**
```bash
cd frontend
npm install
npm start
```

---

## 🏆 Best Practices Followed

✅ **RESTful API design**  
✅ **React Query for efficient API fetching**  
✅ **Redux/Zustand for scalable state management**  
✅ **Optimized SQL queries for better performance**  
✅ **Clean Code & Folder Structure**  

---

## 📜 License
This project is licensed under the **MIT License**.

---

### 🎯 **Contribute & Support**
Feel free to contribute or report issues! Star ⭐ the repo if you find it useful.  

📬 **Contact:** [shivanshunigam8@gmail.com](mailto:shivanshunigam8@gmail.com)
