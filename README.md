# 🌾 Smart Crop Marketplace

A full-stack web application that connects farmers and buyers, enabling seamless crop trading, order management, and analytics.

---

## 🚀 Features

- 👨‍🌾 Farmer & Buyer Authentication  
- 🌱 Crop Listing & Management  
- 🛒 Order Placement & Tracking  
- ⭐ Reviews & Ratings  
- 📊 Analytics Dashboard  
- 🔐 Secure API with JWT Authentication  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)  
- Axios  
- React Router  
- Recharts  

### Backend
- Node.js  
- Express.js  
- MongoDB Atlas
- Mongoose
- JWT Authentication (jsonwebtoken) 🔐

### DevOps
- Docker 🐳  
- GitHub Actions (CI/CD)  
- Vercel (Frontend Hosting)  
- Render (Backend Deployment)  

---

## 🌐 Live Application

- **Frontend (Vercel):**  
  https://smart-crop-market-place.vercel.app/

- **Backend (Render):**  
  https://smart-crop-market-place.onrender.com

---
## ⚠️ Note on Backend Availability

The backend of this application is deployed on the **Render free tier**.

- The service may **enter sleep mode after periods of inactivity**  
- The first request after inactivity may take **30–60 seconds** to respond  
- During this time, API requests (login, register, data fetching) may temporarily fail  

### 💡 Solution

If the app appears unresponsive:

1. Open the backend URL manually:  
   https://smart-crop-market-place.onrender.com  

2. Wait a few seconds for the server to wake up  

3. Refresh the frontend application  

> In a production environment, this can be resolved by using always-on hosting or upgrading the service plan.

## 📂 Project Structure

```text
Smart-crop-market-place/
│
├── backend/
├── frontend/
├── docker-compose.yml
└── .github/workflows/
```


## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/AkhilaGundeti/Smart-crop-market-place.git
cd Smart-crop-market-place
```
###2. Environment Variables

Backend (backend/.env)

```text
MONGO_URI=your_mongodb_connection_string
```
Frontend (frontend/.env)
```text
VITE_API_URL=https://smart-crop-market-place.onrender.com
```
###3. Run with Docker
```text
docker-compose up --build
```
---

## 🌐 Local Access

- Frontend: http://localhost:4173  
- Backend: http://localhost:5000  

---

## 🚀 Deployment Architecture

This project follows a modern production architecture:

- Frontend deployed on Vercel
- Backend deployed on Render (Docker-based)
- Database hosted on MongoDB Atlas

---

## 🔄 CI/CD Pipeline

- Automated testing using GitHub Actions  
- Backend tests executed on every push  
- Frontend build validation  

---

## 💡 Future Enhancements

- Payment Integration  
- Real-time notifications  
- Mobile app version  

---

## 👩‍💻 Author

**Akhila Gundeti**

---

## ⭐ Acknowledgements

This project was built as part of learning full-stack development, DevOps, Docker, and cloud deployment practices.



## 🧑‍💻 Run Project in VS Code (Without Docker)

Follow these steps to run the project manually using Visual Studio Code.

### 1. Open Project

Open the project folder in VS Code.

---

### 2. Setup Backend

```bash
cd backend
npm install
```
### Create a .env file inside backend:
```text
MONGO_URI=your_mongodb_connection_string
```
### Run backend:
```bash
npm run dev
```
- Backend will run at:
http://localhost:5000
### 3. Setup Frontend

```bash
cd frontend
npm install
```
### Create a .env file inside frontend:
```text
VITE_API_URL=http://localhost:5000
```
### Run backend:
```bash
npm run dev
```
- Frontend will run at:
http://localhost:5173

### 4. Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 💡 Notes
- Ensure MongoDB Atlas is properly connected
- Start backend before frontend
- Use local API URL (http://localhost:5000) for development
- Use deployed API URL for production



