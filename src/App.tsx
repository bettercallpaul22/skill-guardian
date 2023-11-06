
import { useEffect, useState } from 'react';
import './App.css';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import { AuthService } from './services/authServices';
import { useGetUserQuery } from './services/api/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { User } from './model';
import { selectCurrentToken, selectCurrentUser } from './services/features/userSlice';
import TaskForm from './pages/TaskForm';
import Account from './pages/Account';
import BecomeTasker from './pages/BecomeTasker';
import Navbar from './component/Navbar';
import AuthNavbar from './component/AuthNavbar';
import SkillProfile from './pages/SkillProfile';
import ProfileUpdate from './pages/ProfileUpdate';
import PrivateRoutes from './utilities/PrivateRoutes';
import DashBoard from './pages/DashBoard';
import HomePage from './pages/HomePage';
import { useAppDispatch, useAppSelector } from './services2/hooks';
import { getToken, setCredientials } from './services2/features/authSlice';

function App() {
  const authToken = useAppSelector(getToken)

  const dispatch = useAppDispatch()
  const authService = new AuthService()

  useEffect(() => {
    const token = authService.getUserToken()
    if (!token) return
    dispatch(setCredientials(token))

  },[])




  return (
    <div>
      <Router>
        {/* <AuthNavbar/> */}
        {authToken ? <AuthNavbar /> : <Navbar />}
        <Routes>
          <Route element={<PrivateRoutes />} >
            <Route element={<DashBoard />} path='/dashboard' />
            <Route path="/account/:id" element={<Account />} />
            <Route path="/skill-profile" element={<SkillProfile />} />
            <Route path="/task-form" element={<TaskForm />} />
          <Route path="/profile-update" element={<ProfileUpdate />} /> 

          </Route>
          
          <Route path="/become-a-tasker" element={<BecomeTasker />} />
          <Route element={ <HomePage />} path='/' />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />


        </Routes>
      </Router>
      {/* {token? <AuthNavbar/> :  <Navbar/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-form" element={<TaskForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/:id" element={<Account />} /> 
          <Route path="/become-a-tasker" element={<BecomeTasker />} /> 
          <Route path="/skill-profile" element={<SkillProfile />} /> 
          <Route path="/profile-update" element={<ProfileUpdate />} /> 
        </Routes> */}

    </div>
  );
}

export default App;
