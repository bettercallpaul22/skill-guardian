import React, { useEffect } from 'react'
import "./NavbarAuth.scss"

import { AuthService } from '../services/authServices'
import { useGetUserQuery } from '../services/api/userApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../services/features/userSlice'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const NavbarAuth:React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const authService = new AuthService()
  const token = useSelector(selectCurrentToken)

  const { data, isLoading } = useGetUserQuery(authService.getUserId())


  // console.log("data", data)
  //   if(isLoading) return(
  //     <div>Loading</div>
  //   )
console.log("params" , params)
  return (
  
        <div className="navbar-main">
          <NavLink to="/" className="left-side">
            <div >Skill Guradian</div>
          </NavLink>


          <div className="right-side">
            <NavLink to="/" className="children">
              <div >Book a Task</div>
            </NavLink>
            <NavLink to="/" className="children">
              <div >My Tasks</div>
            </NavLink>
            <div
              style={{ cursor: "pointer" }}
              className="children"
              onClick={() => {
                navigate(`/account/${authService.getUserId()}`)
              }}
            >Account</div>
          </div>
        </div>
     
  )
}

export default NavbarAuth