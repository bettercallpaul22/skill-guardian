import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Group, Progress, TextInput } from '@mantine/core';
import "./TaskForm.scss"
import { useForm } from '@mantine/form';
import { NavLink, useLocation } from 'react-router-dom';
import { useGetAllUsersQuery } from '../services/api/userApiSlice';
import { useNetwork } from '@mantine/hooks';
import axios from 'axios';
import { User } from '../model';


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
  const [getTaskerProgress, setGetTaskerProgress] = useState(false)

  // const {isLoading, data} = useGetAllUsersQuery()
  const base_url = process.env.REACT_APP_PRODUCTION_URL
  const autoCompleteRef: any = useRef();
  const inputRef: any = useRef();
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
    if (!online) return
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,

    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      let search_places = [];
      search_places.push(place?.formatted_address);
      setTaskLocation(place?.formatted_address)
    });
  }, []);



  const form = useForm({
    initialValues: {
      area: '',
      street: '',

    },

    validate: {
      area: (value: string) => (value.length < 6 ? "password must me at least 6 characters length" : null),
      street: (value: string) => (value.length < 6 ? "password must me at least 6 characters length" : null),
    },
  });

  // console.log('all_users',usersState)

  // console.log("task place", taskLocation)


  //check if a user exist in option
  const check_user = () => {
    let location_option: string[] = []
    location_option.push(taskLocation.toLowerCase())
    location_option.map(item => item?.toLowerCase())
    const newArr = location_option[0].split(', ')
    const result = usersState.some((item: any) => newArr.includes(item))
    if (result) {
      setisAvailable("Good news skillGuardians is  available in your area")
    } else {
      setisAvailable("There's no available tasker in your selected area")

    }

    
  }





  return (
    <div className='main-task ' style={{ marginTop: 40 }}>
      <div className="task-header">
        <div ></div>
        <div className="progess-bar-container">

          <Progress.Root size="xl">
            <Progress.Section value={10} color="cyan">
              <Progress.Label>Location</Progress.Label>
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

      <div className="task-form-details">
        <p className="task-name">{skill}</p>
      </div>

      <div className="form-container">
        <p className="task-location"> Your task location </p>
        <div>
          <input
            className='input2'
            placeholder='Enter State'
            ref={inputRef}
            onChange={() => setisAvailable('')}

          />
          <input
            type="text"
            className={'input'}
            placeholder="Your task location"
          />

          {isAvailable && (<p className={!isAvailable.includes('no')? 'user-available' : 'user-null'}>{isAvailable}</p>)}

          <Group justify="center" mt="md">
            <Button onClick={check_user}>CONTINUE</Button>
          </Group>
        </div>


        {/* YOUR OWN ADDRESS */}
        {/* <div>
          <input

            className='input2'
            placeholder='Your Area'
            ref={inputRef}
            onChange={() => setisAvailable('')}

          />


          <input
            type="text"
            className={form.values.street.length > 0 ? "input" : "input2"}
            placeholder='Your street address'
          />
          {isAvailable && (<p className={!isAvailable.includes('no')? 'user-available' : 'user-null'}>{isAvailable}</p>)}



          <Group justify="center" mt="md">
            <Button onClick={check_user}>CONTINUE</Button>
          </Group>
        </div> */}
      </div>


      {/* <div className="task-options">options</div>
      <div className="task-details">options</div> */}


    </div>
  )
}

export default TaskForm