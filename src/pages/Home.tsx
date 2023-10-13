import React, { useEffect } from 'react'
import "./Home.scss"
// import NavBar from '../component/Navbar'
import Banner from '../component/Banner'
import { AuthService } from '../services/authServices'
import { useGetUserQuery } from '../services/api/userApiSlice'
import Project from './Project'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../services/features/userSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import NavbarAuth from '../component/NavbarAuth'

const Home:React.FC = () => {
  const navigate = useNavigate()
  const authService = new AuthService()
  const token = useSelector(selectCurrentToken)

  const { data, isLoading } = useGetUserQuery(authService.getUserId())


  // console.log("data", data)
  //   if(isLoading) return(
  //     <div>Loading</div>
  //   )

  return (
    <div className='home-main-container'>

      {/* {!token ? <NavBar />
        :
        <NavbarAuth/>
        // <div className="navbar">
        //   <NavLink to="/" className="left-side">
        //     <div >Skill Guradian</div>
        //   </NavLink>


        //   <div className="right-side">
        //     <NavLink to="/" className="children">
        //       <div >Book a Task</div>
        //     </NavLink>
        //     <NavLink to="/" className="children">
        //       <div >My Tasks</div>
        //     </NavLink>
        //     <div
        //       style={{ cursor: "pointer" }}
        //       className="children"
        //       onClick={() => {
        //         navigate(`/account/${authService.getUserId()}`)
        //       }}
        //     >Account</div>
        //   </div>
        // </div>
      } */}
      <Banner />
      <Project />
    </div>
  )
}

export default Home