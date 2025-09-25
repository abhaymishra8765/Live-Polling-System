## 📊 Live Polling System

A real-time polling platform where teachers create polls and students submit answers and view live results. Built with React, TailwindCSS, Node.js, Express, and Socket.IO.

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

### ⚙️ Setup & Installation

1. Clone the repo

```bash
git clone <your repo url>
cd <repo name>
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
