import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Group, Progress, TextInput } from '@mantine/core';
import "./TaskForm.scss"
import { useForm } from '@mantine/form';
import { NavLink, useLocation } from 'react-router-dom';
import { useGetAllUsersQuery } from '../services/api/userApiSlice';
import { useNetwork } from '@mantine/hooks';
import axios from 'axios';
import { User } from '../model';
import { ImLocation } from 'react-icons/im'
import { FaCheck } from 'react-icons/fa'


interface SkillType {
  id: number;
  skil: string;
}


const TaskForm: React.FC = () => {
  const [usersState, setUsersState] = useState<User[]>([])
  const [skill, setSkill] = useState("")
  const { state } = useLocation()
  const [taskLocation, setTaskLocation] = useState("")
  const [isAvailable, setisAvailable] = useState('')
  const [taskAddress, setTaskAddress] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [getTaskerProgress, setGetTaskerProgress] = useState(false)
  const [typing, setTyping] = useState(false)

  // const {isLoading, data} = useGetAllUsersQuery()
  const base_url = process.env.REACT_APP_PRODUCTION_URL
  const autoCompleteRef: any = useRef();
  const autoComplete_homeAddress: any = useRef();
  const inputRef1: any = useRef();
  const inputRef2: any = useRef();
  const { online } = useNetwork()


  const get_all_users = async () => {
    try {
      const res = await axios.get(`${base_url}/api/user/all`)
      setUsersState(res.data.map((user: User) => user?.state?.toLowerCase()))
    } catch (error) {
      console.log('error fetching users', error)
    }
  }

  useEffect(() => {
    get_all_users()
    setSkill(state)

  }, [])

  useEffect(() => {
    autoComplete_homeAddress.current = new window.google.maps.places.Autocomplete(inputRef2.current,);
    autoComplete_homeAddress.current.addListener("place_changed", async () => {
      const home_address = await autoComplete_homeAddress.current.getPlace();
      setUserAddress(home_address?.formatted_address);
    });
  }, [typing]);


  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef1.current,);
    autoCompleteRef.current.addListener("place_changed", async () => {
      const place = await autoCompleteRef.current.getPlace();
      let search_places = [];
      search_places.push(place?.formatted_address);
      setTaskLocation(place?.formatted_address)
    });
  }, []);








  // console.log('all_users',usersState)

  // console.log("task place", taskLocation)


  //check if a user exist in option
  const check_user = () => {
    let location_option: string[] = []
    location_option.push(taskLocation?.toLowerCase())
    location_option.map(item => item?.toLowerCase())
    const newArr = location_option[0]?.split(', ')
    const result = usersState.some((item: any) => newArr?.includes(item))
    if (result) {
      setisAvailable("Good news skillGuardians is  available in your area")
    } else {
      setisAvailable("There's no available tasker in your selected area")

    }



  }



  console.log("user ADRESS", userAddress)

  return (
    <div className='main-task ' style={{ marginTop: 40 }}>
      <div className="task-header">
        <div ></div>
        <div className="progess-bar-container">

          <Progress.Root size="xl">
            <Progress.Section value={getTaskerProgress ? 30 : 5} color="cyan">
              <Progress.Label>Task Location</Progress.Label>
            </Progress.Section>
            <Progress.Section value={0} color="pink">
              <Progress.Label>Photos</Progress.Label>
            </Progress.Section>
            <Progress.Section value={0} color="orange">
              <Progress.Label>Other</Progress.Label>
            </Progress.Section>
          </Progress.Root>
          <div className="describe">Describe your task</div>
        </div>
      </div>

      <div className="task-header2">
        <p className='tell-task'>
          Tell us about your task. We use these details
          to show Taskers in your area who fit your needs.
        </p>
      </div>

      {getTaskerProgress && (<div className="progress1">
        <h3>Your task location</h3>
        <div className="location-container">
          <ImLocation size={24} />
          <h4>{taskLocation} / {taskAddress}</h4>
          <FaCheck color='green' />
        </div>
      </div>)}

      {/* <div className="progress1">
        <h3>Your location or office address</h3>
        <div className="location-container">
          <ImLocation size={24} />
          <h4>{taskLocation}</h4>
          <FaCheck color='green' />
        </div>
      </div> */}

      <div className="task-form-details">
        <p className="task-name">{skill}</p>
      </div>

      {!getTaskerProgress && (<div className="form-container">
        <p className="task-location"> Your task location </p>
        <div>
          <input
            className='input2'
            placeholder='Your task State'
            ref={inputRef1}
            onChange={() => {
              setisAvailable('')
              setGetTaskerProgress(false)
            }}

          />
          <input
            type="text"
            className={'input'}
            placeholder="Your task address"
            value={taskAddress}
            onChange={(e) => {
              setTaskAddress(e.target.value)
              e.target.value.length > 3 && check_user()
            }}
          />

          {isAvailable && (<p className={!isAvailable.includes('no') ? 'user-available' : 'user-null'}>{isAvailable}</p>)}

          <Group justify="center" mt="md">
            <Button
              onClick={() => {
                if (isAvailable.includes('new')) {
                  setGetTaskerProgress(true)
                  setisAvailable('')

                }
              }}>CONTINUE</Button>
          </Group>
        </div>

      </div>)}


      {getTaskerProgress && (<div className="form-container">
        <p className="task-location"> Your house or office address </p>
        <div>
          <input
            className='input2'
            placeholder='Your State'
            ref={inputRef2}
            onChange={() => {
              setTyping(true)
              // setisAvailable('')
              // setGetTaskerProgress(false)
            }}

          />
          <input
            type="text"
            className={'input'}
            placeholder="Your address"
            value={homeAddress}
            onChange={(e) => {
              setHomeAddress(e.target.value)
              // e.target.value.length > 3 && check_user()
            }}
          />

          {isAvailable && (<p className={!isAvailable.includes('no') ? 'user-available' : 'user-null'}>{isAvailable}</p>)}

          <Group justify="center" mt="md">
            <Button
              onClick={() => {
                // if (isAvailable.includes('new')) {
                //   setGetTaskerProgress(true)

                // }
              }}>See Taskers & Prices </Button>
          </Group>
        </div>

      </div>)}


      {/* <div className="task-options">options</div>
      <div className="task-details">options</div> */}


    </div>
  )
}

export default TaskForm