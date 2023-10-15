import React, { useState } from 'react'
import "./BannerMobile.scss"
import { Button, Select, UnstyledButton } from '@mantine/core'
import { skillData } from '../assets/skillData'
import { useNavigate } from 'react-router-dom'

const BannerMobile: React.FC = () => {
const navigate = useNavigate()
    const [selectedSkill, setSelectedSkill] = useState("")



    return (
        <div className="banner-mobile-container">
            <div className="header-title">Get help. Gain happiness</div>
            <div className="header-sub-title">just ask</div>
            <Select className='input'
                data={skillData?.map((skill: any) => skill.skill)}
                searchable
                placeholder='Search'
                clearable
                onSelect={(val: any) => {
                    setSelectedSkill(val.target.defaultValue)
                }}
            />
            <Button className='btn'
              onClick={() => {
                if(!selectedSkill) return
                navigate("/task-form", { state: selectedSkill })

            }}
            >Get Help</Button>
            {
            skillData.map((skill: any) => (
            <Button
                onClick={() => { navigate("/task-form", { state: skill.skill }) }}
                key={skill.id}
                className='btn-option'
                type="submit"
                >
                {skill.skill}
            </Button>
            ))
            }
          
        </div>
    )
}

export default BannerMobile