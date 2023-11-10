import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Modal, Button, Select, Tooltip, BackgroundImage, Center, Text, Box } from '@mantine/core';

import "./BecomeTasker.scss"
import bg from "../assets/tasker-image.jpg"
import { GoQuestion } from 'react-icons/go'
import { useDisclosure } from '@mantine/hooks';
import { useLoginMutation } from '../services/api/authApiSlice';
import { AuthService } from '../services/authServices';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoginModal from '../component/LoginModal';
import RegisterModal from '../component/RegisterModal';
import { area } from '../assets/area-Data';
import { skillData } from '../assets/skillData';
// import { selectCurrentToken } from '../services/features/userSlice'
import SkillProfile from './SkillProfile';
import { statesData } from '../assets/statesData';
import { StatesData } from '../model';



const BecomeTasker = () => {
  // const token ="hjhh"
  // const token = useSelector(selectCurrentToken)
  const authService = new AuthService()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [login, { isLoading }] = useLoginMutation()
  const [opened, { open, close }] = useDisclosure(false)
  const [modalState, setModalState] = useState("")


  return (
    <div className='main-become-tasker'>
      {/* <div className="task-header">
        <NavLink to="/" className="logo">
          <div >Skill Guardians</div>
        </NavLink>
        <div> </div>
      </div> */}
      <div className="body">
        <div className="body-section" >
          {/* <div className="left-side" style={{ backgroundImage: `url(${bg})`, }}></div> */}

          <BackgroundImage
            src="https://www.taskrabbit.com/v3/assets/_/_/_/src/becomeATaskerNew/images/hero_landing-fdeb7ef8f1a4361ec76f75d007d79546.jpg"
            radius="sm"
            // style={{ maxWidth: 700 }}
            className='image'
          >
            {/* <Center p="md" >
              <Text c="white">
                BackgroundImage component can be used to add any content on image. It is useful for hero
                headers and other similar sections
              </Text>
            </Center> */}
          </BackgroundImage>

          <div className="right-side">
            <p className="title-header-earn">Earn money your way</p>
            <p className="title-header-earn2">
              See how much you can make
              tasking on Skill-Gurdians
            </p>
            <Select className=''
              style={{ fontWeight: 600, fontSize: 26 }}
              data={statesData.map((state: StatesData) => state.name)}
              searchable
              placeholder='Search'
              clearable
              label="Select your area"
            />
            <Select className=''
              style={{ fontWeight: 600, fontSize: 26 }}
              data={skillData?.map((skill: any) => skill.skill)}
              searchable
              placeholder='Search'
              clearable
              label="Choose a category"
            />
            <div className="charges">
              <p className="pay">₦1000</p>
              <p className="hour">per hour</p>
              <Tooltip label="Tooltip">
                <GoQuestion style={{ cursor: "pointer" }} />
              </Tooltip>
            </div>
            <Button
              className='button'
              onClick={() => {
                setModalState("register")
                open()
              }}
            >Get Started</Button>
            <div className="have-acc">Already have an account?
              <span style={{ color: "green", cursor: "pointer" }}
                onClick={() => {
                  setModalState("login")
                  open()
                }}
              > Sign In
              </span>
            </div>

          </div>
        </div>
      </div>
      {/* <FooterLinks/> */}
      <Modal opened={opened} onClose={close}>

        {modalState === "login" && (<LoginModal />)}
        {modalState === "register" && (<RegisterModal />)}
      </Modal>

      {/* <Modal opened={opened} onClose={close} title="Authentication" className='login-box'>

      </Modal> */}


    </div>
  )



}

export default BecomeTasker