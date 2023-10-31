import React from 'react'
import "./Account.scss"
import { CgProfile } from "react-icons/cg"
import { RiNotificationBadgeFill } from "react-icons/ri"
import { FaCcAmazonPay } from "react-icons/fa"
import { FcBusinessContact, FcCancel } from "react-icons/fc"
import { GiWallet } from "react-icons/gi"
import { FaPhoneAlt } from "react-icons/fa"
import { GrTransaction } from "react-icons/gr"
import { HiMail } from "react-icons/hi"
import { RiLockPasswordFill, RiDeleteBin5Fill } from "react-icons/ri"
import { Button, Group, Avatar, NativeSelect, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../model'
import { logOut, selectCurrentUser } from '../services/features/userSlice'
import { useNavigate } from 'react-router-dom'


const Account: React.FC = () => {
  const user = useSelector(selectCurrentUser) as User
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div>
      {/* <NavBar /> */}
      <div className='account-container'>
        <div className="title">Account</div>

        <div className="mobile-account">
        <div className="mobile-account-sub">
          <NativeSelect
            className='native-select'
            data={['Profile', 'Notification', 'Billing Info', 'Cancel a Task', 'Account Balance', 'Password', 'Delete Account']}

          />
          <div className="acc-edit">
            <Text>Account</Text>
            <Button
            onClick={()=>{
              navigate("/profile-update")
            }}
            >EDIT</Button>
          </div>

          <div className="acc-info">
            <Avatar size={100} src={user?.avatar === "" ? null : user?.avatar} alt="no image here" color="indigo" />
            <div className="acc-name-container">
              <CgProfile size={25} />
              <p className="acc-name">obaro paul</p>
            </div>
            <p className='mobile-num'>+2348890238989</p>
            <Group justify="center" mt="md">
              <Button
                onClick={() => {
                  dispatch(logOut())
                  navigate("/")
                }}
              >
                LOGOUT
              </Button>
            </Group>
          </div>
          </div>
        </div>


        <div className="account-detail-box">
          <div className="left-side">

            <div className="menu">
              <CgProfile size={25} />
              <p className="">Profile</p>
            </div>
            <div className="menu">
              <RiNotificationBadgeFill size={25} />
              <p className="">Notification</p>
            </div>
            <div className="menu">
              <FaCcAmazonPay size={25} />
              <p className="">Billing Info</p>
            </div>
            <div className="menu">
              <FcCancel size={25} />
              <p className="">Cancel a task</p>
            </div>
            <div className="menu">
              <FcBusinessContact size={25} />
              <p className="">Business Info</p>
            </div>
            <div className="menu">
              <GiWallet size={25} />
              <p className="">Account balance</p>
            </div>
            <div className="menu">
              <GrTransaction size={25} />
              <p className="">Transactions</p>
            </div>

            <div className="menu">
              <RiLockPasswordFill size={25} />
              <p className="">Password</p>
            </div>
            <div className="menu">
              <RiDeleteBin5Fill size={25} />
              <p className="">Delete account</p>
            </div>

          </div>


          <div className="right-side">
            <div className="header">
              <p className="title-acc">Account</p>
              <Button
               onClick={()=>{
                navigate("/profile-update")
              }}
              >Edit</Button>

            </div>

            <div className="profile">

              <Avatar size={100} src={user?.avatar === "" ? null : user?.avatar} alt="no image here" color="indigo" />

              <div className="profile-info">
                <div className="profile-menu">
                  <CgProfile size={25} />
                  <p className="">{user?.firstName} {user?.lastName}</p>
                  {/* <p className="">{user.lastName}</p> */}
                </div>
                <div className="profile-menu">
                  <HiMail size={25} />
                  <p className="">{user?.email}</p>
                </div>
                <div className="profile-menu">
                  <FaPhoneAlt size={25} />
                  <p className="">{user?.mobile_number}</p>
                </div>
                <Group justify="center" mt="md">
                  <Button
                    onClick={() => {
                      dispatch(logOut())
                      navigate("/")
                    }}
                  >
                    LOGOUT
                  </Button>
                </Group>
              </div>

            </div>

          </div>
        </div>
      </div>




    </div>
  )
}

export default Account