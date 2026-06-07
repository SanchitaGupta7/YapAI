# 🤖 YapAI — Gemini Clone (AI Chat Application)

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Bundler-Vite-purple?logo=vite)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![Gemini API](https://img.shields.io/badge/AI-Gemini%203.1%20Flash--Lite-orange)
![AssemblyAI](https://img.shields.io/badge/Voice%20Input-AssemblyAI-red)
![Deployment](https://img.shields.io/badge/Deployed-Vercel%20%26%20Render-purple)

---

## 🔗 Live Links

* 🌐 **Frontend:** https://yap-ai.vercel.app/
* ⚙️ **Backend:** https://yapaibackend.onrender.com
* 📂 **GitHub:** https://github.com/SanchitaGupta7/YapAI

---

## ✨ Features

### 💬 AI Chat with Gemini

* Real-time conversation with **Gemini 3.1 Flash Lite API**
* Context-aware responses

### 🧵 Multiple Chat Threads

* Create and manage multiple conversations
* Independent chat history per thread

### 💾 Chat History Storage

* All chats stored in **MongoDB**
* Persistent conversation across sessions

### 🗑️ Thread Management

* Delete unwanted chat threads

### 📝 Markdown Rendering

* Supports formatted AI responses
* Clean text rendering for better readability

### 💻 Code Syntax Highlighting

* Highlighted code blocks for better developer experience

### ⚡ Streaming Responses

* Real-time response rendering (typing-like experience)

### 🌙 Dark Mode

* Smooth dark theme support(Adopts system mode)

### 🔊 Voice-to-Text Input

* Speech input using **AssemblyAI API**

### ⏳ Loading States

* Clean loader while AI is generating responses

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### AI & APIs

* Google Gemini 3.1 Flash Lite API
* AssemblyAI (Voice-to-text)

---

## 💾 Database Schema

* **Threads**

  * Stores chat sessions
  * Each thread contains messages

---

## 📸 Screenshot

### Chat Interface

<img width="959" height="530" alt="image" src="https://github.com/user-attachments/assets/b8d736e5-2f01-4307-970b-4f4cef2f637e" />

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/SanchitaGupta7/YapAI.git
cd YapAI
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file in backend:

```env
MONGO_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_key
```

---

### 4️⃣ Run Project

#### Start Backend

```bash
cd backend
node server.js
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🚀 Future Improvements

* 🔐 User authentication (JWT)
* 🧠 Multi-model support (GPT + Gemini)
* 📁 File upload support
* 🎤 Full voice chat assistant mode
* 🔍 Chat search feature
* 📱 Mobile optimization improvements

---

## 👩‍💻 Author

### Sanchita Gupta

- GitHub: https://github.com/SanchitaGupta7

---

## 📜 License

This project is built for educational and portfolio purposes.
