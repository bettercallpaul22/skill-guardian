import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Group, Progress, TextInput } from '@mantine/core';
import "./TaskForm.scss"
import { useForm } from '@mantine/form';
import { NavLink, useLocation } from 'react-router-dom';
import { useGetAllUsersQuery } from '../services/api/userApiSlice';
import { useNetwork } from '@mantine/hooks';
import axios from 'axios';


interface SkillType {
  id: number;
  skil: string;
}


const TaskForm: React.FC = () => {
const [users, setUsers]= useState<string[]>()
  const [skill, setSkill] = useState("")
  const { state } = useLocation()
  const [taskLocation, setTaskLocation] = useState("")
  // const {isLoading, data} = useGetAllUsersQuery()
const base_url = process.env.REACT_APP_PRODUCTION_URL
  const autoCompleteRef:any = useRef();
  const inputRef:any = useRef();
 const {online} = useNetwork()


 const get_all_users = async() =>{
  const res = await axios.get(`${base_url}/api/user/all`)
  console.log('all_users',res)
 }

 useEffect(()=>{
   get_all_users()

 },[])

  useEffect(() => {
    console.log('online', online)
    if(!online) return
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
 


  useEffect(() => {
    setSkill(state)
  }, [])

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


  console.log("task place", taskLocation)
  return (
    <div className='main-task ' style={{marginTop:40}}>
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
              <form onSubmit={form.onSubmit((values) => console.log(values.area))} >

                <input

                  className='input2'
                  placeholder='Enter State'
                  ref={inputRef}
                
                />
              
               
                <input
                  type="text"
                  className={form.values.street.length > 0 ? "input" : "input2"}
                  placeholder="Your task location"
                />

                <Group justify="center" mt="md">
                  <Button type="submit">CONTINUE</Button>
                </Group>
              </form>
            </div>


      {/* <div className="task-options">options</div>
      <div className="task-details">options</div> */}


    </div>
  )
}

export default TaskForm