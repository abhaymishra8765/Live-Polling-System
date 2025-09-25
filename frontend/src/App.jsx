import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TeacherPage from './pages/TeacherPage'
import StudentPage from './pages/StudentPage'

export default function App(){
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/teacher" element={<TeacherPage/>} />
        <Route path="/student" element={<StudentPage/>} />
      </Routes>
    </div>
  )
}
