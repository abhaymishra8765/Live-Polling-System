## 📊 Live Polling System

A real-time polling platform where teachers create polls and students submit answers and view live results. Built with React, TailwindCSS, Node.js, Express, and Socket.IO.

---

### Table of Contents

- [Features](#-features)
- [UI](#-ui)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Socket Events](#-socket-events)
- [Screenshots](#-screenshots)
- [Figma Design Reference](#-figma-design-reference)
- [Development Notes](#-development-notes)
- [Contributing](#-contributing)
- [License](#-license)

---

### 🚀 Features

- **Teacher**

  - Create a live session with a unique session ID
  - Share the session ID with students
  - Create polls with custom question text, multiple options, and configurable duration
  - See connected students (live list)
  - Remove a student from the session
  - Monitor live poll results in real-time

- **Student**
  - Join using a session ID
  - View polls as soon as the teacher starts them
  - Submit answers in real-time
  - See aggregated results after voting

---

### 💻 UI

- **Responsive design**: mobile and desktop
- **Landing Page**: Choose role (Teacher / Student)
- **Teacher Dashboard**: Manage session, create polls, view students and results
- **Student Dashboard**: Answer polls, see live results
- **Styling**: TailwindCSS with Figma-inspired UI

---

### 🛠️ Tech Stack

- **Frontend**: React, React Router, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Realtime**: Socket.IO

---

### 📂 Project Structure

```startLine:endLine:filepath
// See repository layout below (trimmed)
```

```text
polling-live/
├── backend/
│  ├── index.js               # Express + Socket.IO server
│  ├── package.json
│  └── package-lock.json
│
├── frontend/
│  ├── src/
│  │  ├── pages/
│  │  │  ├── LandingPage.jsx
│  │  │  ├── TeacherPage.jsx
│  │  │  └── StudentPage.jsx
│  │  ├── socket.js           # Socket.IO client
│  │  ├── App.jsx / main.jsx
│  │  └── index.css
│  ├── index.html
│  ├── vite.config.js
│  ├── tailwind.config.cjs
│  └── package.json
│
└── README.md
```

---

### ⚙️ Setup & Installation

1. Clone the repo

```bash
git clone https://github.com/your-username/polling-live.git
cd polling-live
```

2. Backend setup

```bash
cd backend
npm install
npm run dev   # expected at http://localhost:4000
```

3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev   # expected at http://localhost:5173
```

Run both backend and frontend simultaneously in separate terminals.

---

### 🔗 Socket Events

- **Teacher**

  - `teacher:createSession` → Create session, returns `sessionId`
  - `teacher:createPoll` → Start a new poll
  - `teacher:removeStudent` → Remove a student
  - `session:closed` → Session terminated

- **Student**

  - `student:joinSession` → Join with `sessionId`
  - `student:submitAnswer` → Submit poll answer

- **Shared**
  - `students:update` → Notify teacher of updated student list
  - `poll:started` → Notify students of active poll
  - `poll:partialResults` → Emit partial live results
  - `poll:ended` → End poll and show results

---

### 📸 Screenshots

Add screenshots or GIFs of the UI:

- Landing Page
- Teacher Dashboard
- Student Dashboard

---

### 🎨 Figma Design Reference

Custom UI inspired by Figma mocks. Colors, gradients, and spacing follow the design system.

- Gradient Buttons → `linear-gradient(90deg, #8F64E1 0%, #1D68BD 100%)`
- Rounded Cards → `border-radius: 10px`

---

### 🧪 Development Notes

- Ensure backend (`http://localhost:4000`) and frontend (`http://localhost:5173`) run simultaneously.
- TailwindCSS is used for utility-first styling.
- For production, consider:
  - Docker for containerization
  - Deploy backend on Render/Heroku and frontend on Vercel/Netlify

---

### 🤝 Contributing

1. Fork this repo
2. Create a new branch: `feature/your-feature`
3. Commit your changes
4. Push to your branch
5. Open a Pull Request 🚀

---

### 📜 License

MIT License © 2025 Your Name
