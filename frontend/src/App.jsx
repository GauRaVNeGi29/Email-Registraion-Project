import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.css'
import LandingPage from './components/LandingPage';
import LoginComponent from './components/LoginComponent';
import ForgotPassword from './components/ForgotPasswrod';
import CandidateHome from './components/CandidateHome';
import SignUpComponent from './components/SignUpComponent';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path="/signup" element={<SignUpComponent />}></Route>
        <Route path="/login" element={<LoginComponent />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
        <Route path="/candidate/home" element={<CandidateHome />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;