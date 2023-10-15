import React, { useState } from 'react'
import "./Banner.scss"
import bg from "../assets/construction-worker.avif"
import { Button, BackgroundImage, Select, Center, Text } from '@mantine/core'
import { skillData } from '../assets/skillData'
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom'


const Banner = () => {
    const navigate = useNavigate()
    const [selectedSkill, setSelectedSkill] = useState("")

    return (
        <BackgroundImage
            src={bg}
            radius="sm"
            style={{ height: 400, paddingTop: 70 }}
            className='banner-main-container'
        >



            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                <div className="search-options">
                    <div className="title">Get Help. Gain Hapinness</div>
                    <div className="divider-line-box">

                        <div className="divider-line"></div>
                    </div>
                    <div className="title-bottom">Just task</div>

                    <div className='search-container'>
                        <Select className='input'
                            data={skillData?.map((skill: any) => skill.skill)}
                            searchable
                            placeholder='Search'
                            clearable
                            onSelect={(val: any) => {
                                setSelectedSkill(val.target.defaultValue)
                            }}
                        />
                        <Button className="get-help-btn" type="submit"
                            onClick={() => {
                                if (!selectedSkill) return
                                navigate("/task-form", { state: selectedSkill })

                            }}

                        >Get help today</Button>
                    </div>

                    <div className="skills">
                        {
                            skillData.map((skill: any) => (
                                // <Link to="/task-form">
                                <Button
                                    onClick={() => { navigate("/task-form", { state: skill.skill }) }}
                                    key={skill.id}
                                    className='skill-btn'
                                    color='transparent'
                                    type="submit">
                                    {skill.skill}
                                </Button>
                                // </Link>
                            ))
                        }

                    </div>
                </div>
            </div>
        </BackgroundImage>
    )
}

export default Banner