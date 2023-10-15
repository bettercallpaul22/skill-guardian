
import { useEffect, useState } from 'react';
import './App.css';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthService } from './services/authServices';
import { useGetUserQuery } from './services/api/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { User } from './model';
import { selectCurrentToken, setCredientials } from './services/features/userSlice';
import TaskForm from './pages/TaskForm';
import Account from './pages/Account';
import BecomeTasker from './pages/BecomeTasker';
import Navbar from './component/Navbar';
import AuthNavbar from './component/AuthNavbar';
import SkillProfile from './pages/SkillProfile';

function App() {
  const token = useSelector(selectCurrentToken)

  const dispatch = useDispatch()
  const authService = new AuthService()

  useEffect(() => {
    const token = authService.getUserToken()
    if (!token) return
    const user: User = jwt_decode(token)
    dispatch(setCredientials({ user, token, _id: user._id }))

  }, [])




  return (
    <>
      <BrowserRouter>
      <AuthNavbar/>
      {/* {token? <AuthNavbar/> :  <Navbar/>} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-form" element={<TaskForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/:id" element={<Account />} /> 
          <Route path="/become-a-tasker" element={<BecomeTasker />} /> 
          <Route path="/skill-profile" element={<SkillProfile />} /> 
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
