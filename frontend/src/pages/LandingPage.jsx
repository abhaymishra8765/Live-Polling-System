// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// RoleCard
const RoleCard = ({ title, subtitle, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className={
        `role-card cursor-pointer transition-all duration-200 rounded-[10px]
         bg-white ${selected ? 'ring-4 ring-indigo-100' : 'border border-[#D9D9D9]'}
         w-full max-w-[387px] h-[143px] p-[15px_17px_15px_25px]
         flex flex-col justify-center items-start mx-auto`
      }
      
      
      
      
      
      aria-pressed={selected}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-3">{subtitle}</p>
    </div>
  );
};


export default function LandingPage(){
  const navigate = useNavigate();
  const [role, setRole] = useState('student'); // default selected in image - student
  // role values: 'student' or 'teacher'

  function handleContinue(){
    if(role === 'teacher') navigate('/teacher');
    else navigate('/student');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {/* badge */}
        <div className="flex justify-center mb-6">
          <div className="badge-pill" role="img" aria-label="Intervue Poll badge">
            <span className="badge-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="14" focusable="false">
                <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v1H9a1 1 0 00-1 1v1H4a2 2 0 00-2 2v3a2 2 0 002 2h4l3 2V6H4a2 2 0 01-2-2z" />
              </svg>
            </span>
            <span className="badge-text">Intervue Poll</span>
          </div>
        </div>


        {/* heading */}
        <div className="text-center mt-8">
          <h1 className="text-3xl md:text-4xl text-gray-900">
            <span className="font-normal">Welcome to the </span>
            <span className="font-extrabold text-primaryFrom">Live Polling System</span>
          </h1>
          <p className="text-muted mt-3 max-w-2xl mx-auto">
            Please select the role that best describes you to begin using the live polling system
          </p>
        </div>

        {/* role cards */}
        <div className="mt-10 cards-wrapper">


          <RoleCard
            title="I'm a Student"
            subtitle="Submit answers and view live poll results in real-time."
            selected={role === 'student'}
            onClick={() => setRole('student')}
          />
          <RoleCard
            title="I'm a Teacher"
            subtitle="Create polls, view live results, and manage students."
            selected={role === 'teacher'}
            onClick={() => setRole('teacher')}
          />
        </div>



        {/* continue button */}
        <div className="mt-8 md:mt-0 flex justify-center">

          <button
            type="button"
            aria-label="Continue"
            onClick={handleContinue}
            className="btn-continue btn-glossy"
          >
            Continue
          </button>
        </div>


      </div>
    </div>
  );
}
