import React from 'react'
import "./Project.scss"
import { Card, Image, Text, Flex, Group, Badge, Button } from '@mantine/core';
import { skillData } from '../assets/skillData';
import { BsFillTagsFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const data = [
  {

  }
]

const Project: React.FC = () => {

const navigate = useNavigate()

  return (

    <div className="project-main-container">
      {
        skillData.map((person: any) => (



          <Card 
          className='card' shadow="sm" padding="lg" radius="md" withBorder mah={250}
          onClick={() => { navigate("/task-form", { state: person.skill }) }}
          
          >
            <Card.Section>
              <Image
                height={160}
                alt={person.skill}
                src={person.image}
              />
            </Card.Section>

            <div className="bottom-info">
              <h5
                style={{ marginTop: 0 }}
              >{person.skill}</h5>
              <div className="pricing-container">
                <BsFillTagsFill />
                <p className='price'>Avg. Project:₦1000 - ₦2000</p>
              </div>

            </div>
          </Card>

        ))
      }

    </div>

  )
}

export default Project

{/* <div className="card">
 <div className='image-container'>
  <img className='image' src={person.image} alt={person.skill} />
 </div>
 <div className="info-container">
bottom
 </div>

</div> */}