📊 Live Polling System

A real-time polling platform where teachers can create polls and students can submit answers & view live results.
Built with React, TailwindCSS, Node.js, Express, and Socket.IO.

🚀 Features
👩‍🏫 Teacher

Create a live session with a unique session ID.

Share the session ID with students to join.

Create polls with:

Custom question text

Multiple answer options

Configurable duration (in seconds)

See connected students (live list).

Remove a student from the session.

Monitor live poll results in real-time.

👨‍🎓 Student

Join using a session ID.

View polls as soon as the teacher starts them.

Submit answers in real-time.

See live aggregated results after voting.

💻 UI

Responsive design (mobile + desktop).

Landing Page: Choose role (Teacher / Student).

Teacher Dashboard: Manage session, create polls, view students & results.

Student Dashboard: Answer polls, see live results.

TailwindCSS + Figma-inspired UI.

🛠️ Tech Stack

Frontend: React, React Router, TailwindCSS

Backend: Node.js, Express

Realtime: Socket.IO

Styling: TailwindCSS + custom CSS (to match Figma)

Build Tool: Vite

📂 Project Structure
live-polling-system/
├── backend/
│ ├── server.js # Express + Socket.IO server
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/ # React pages
│ │ │ ├── LandingPage.jsx
│ │ │ ├── TeacherPage.jsx
│ │ │ └── StudentPage.jsx
│ │ ├── components/ # UI components
│ │ ├── socket.js # Socket.IO client
│ │ └── index.css # Tailwind + custom styles
│ ├── index.html
│ ├── vite.config.js
│ └── package.json
│
└── README.md

⚙️ Setup & Installation

1. Clone the repo
   git clone https://github.com/your-username/live-polling-system.git
   cd live-polling-system

2. Backend Setup
   cd backend
   npm install
   npm run dev # starts backend on http://localhost:4000

3. Frontend Setup
   cd frontend
   npm install
   npm run dev # starts frontend on http://localhost:5173

🔗 Socket Events
Teacher

teacher:createSession → Create session, returns sessionId

teacher:createPoll → Start a new poll

teacher:removeStudent → Remove a student

session:closed → When session is terminated

Student

student:joinSession → Join with sessionId

student:submitAnswer → Submit poll answer

Shared

students:update → Notify teacher of updated student list

poll:started → Notify students of active poll

poll:partialResults → Emit partial live results

poll:ended → End poll & show results

📸 Screenshots

Replace with your actual screenshots (or paste from earlier):

Landing Page

Teacher Dashboard

Student Dashboard

🎨 Figma Design Reference

Custom UI inspired by Figma mocks.

Colors, gradients, spacing closely follow the design system.

Example:

Gradient Buttons → linear-gradient(90deg,#8F64E1 0%,#1D68BD 100%)

Rounded Cards → border-radius: 10px

🧪 Development Notes

Ensure backend (localhost:4000) and frontend (localhost:5173) run simultaneously.

TailwindCSS is used for utility-first styling.

For production, consider:

Using Docker for containerization.

Deploying backend on Heroku / Render and frontend on Vercel / Netlify.

🤝 Contributing

Fork this repo

Create a new branch (feature/new-feature)

Commit changes

Push to your branch

Open a Pull Request 🚀

📜 License

MIT License © 2025 Your Name
