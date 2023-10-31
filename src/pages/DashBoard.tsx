import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../services/features/userSlice";
import "./DashBoard.scss"
import { Button, Divider, Select } from "@mantine/core";
import image from "../assets/construction-worker.avif"
import image2 from "../assets/images/image1.jpg"
import image3 from "../assets/images/image3.jpg"
import getstartedleft from "../assets/images/getstartedleft.png"
import getstartedright from "../assets/images/getstartedright.png"
import { skillData } from "../assets/skillData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Project from "./Project";
import { BiSolidCheckCircle } from "react-icons/bi";
import "aos/dist/aos.css"
import AOS from 'aos'
import Testimonies from "../component/Testimonies";
import { FooterCentered } from "../component/Footer";


const DashBoard = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const [selectedSkill, setSelectedSkill] = useState("")

    return (
        <div className="main-dashboard-page">
            <div
                className="image-background"
                style={{
                    backgroundImage: `url(${image})`,

                }}
            >

                <div className="desktop-search">
                    <div style={{ padding: 20 }}>

                        <h2 className="title">Book Your Next Task</h2>
                        <h4 className="sub-title">just ask</h4>
                        <div className="search-btn-option">
                            <Select className="search"
                                data={skillData?.map((skill: any) => skill.skill)}
                                searchable
                                placeholder='Dscribe your task, e.g. cleaning '
                                clearable
                                onSelect={(val: any) => {
                                    setSelectedSkill(val.target.defaultValue)
                                }}
                            />
                            <Button className="get-help-btn"
                                onClick={() => {
                                    if (!selectedSkill) return
                                    navigate("/task-form", { state: selectedSkill })

                                }}
                            >
                                Get Help Today
                            </Button>
                        </div>
                        <div className="skill-container">
                            {
                                skillData.map((skill: any) => (
                                    <Button
                                        onClick={() => { navigate("/task-form", { state: skill.skill }) }}
                                        key={skill.id}
                                        color='transparent'
                                        className="skill-btn"
                                    >
                                        {skill.skill}
                                    </Button>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>

            <div className="mobile-search">
                <div className="box-holder" style={{minWidth:500,}}>
                <h3 className="get-help-header">Get help Gain Happiness.</h3>
                <h5 className="get-help-sub-header">Just Ask</h5>
                <Select className="search"
                    data={skillData?.map((skill: any) => skill.skill)}
                    searchable
                    placeholder='Search'
                    clearable
                    onSelect={(val: any) => {
                        setSelectedSkill(val.target.defaultValue)
                    }}
                />
                <Button className="get-help-btn"
                    onClick={() => {
                        if (!selectedSkill) return
                        navigate("/task-form", { state: selectedSkill })

                    }}
                >
                    Get Help Today
                </Button>
                <Button className="btn"
                color='transparent'
                    onClick={() => {
                        if (!selectedSkill) return
                        navigate("/task-form", { state: "Help Moving" })
                    }}
                >
                    Help Moving
                </Button>
                <Button className="btn"
                color='transparent'
                    onClick={() => {
                        if (!selectedSkill) return
                        navigate("/task-form", { state: "Electrical" })
                    }}
                >
                    Electrical
                </Button>
                <Button className="btn"
                color='transparent'
                    onClick={() => {
                        if (!selectedSkill) return
                        navigate("/task-form", { state: "ount TV or other items" })
                    }}
                >
                   ount TV or other items
                </Button>
                </div>
            </div>

            <div className="download-container">
                <Button className="download-btn"></Button>
                <Button className="download-btn2"></Button>
            </div>

            {/* <h2 style={{ paddingLeft: 70 }}>Popular projects in your area</h2>
            <Project /> */}

            <div className="info-section">
                <div className="left" data-aos="fade-left">
                    <h3 className="info-made-easier-header">Everyday life made easier</h3>
                    <p className="">
                        When life gets busy, you don’t have to tackle it alone.
                        Get time back for what you love without breaking the bank.
                    </p>
                    <div className="item">
                        <BiSolidCheckCircle />
                        <p>Choose your Tasker by reviews, skills, and price</p>
                    </div>
                    <div className="item">
                        <BiSolidCheckCircle />
                        <p>Schedule when it works for you — as early as today</p>
                    </div>
                    <div className="item">
                        <BiSolidCheckCircle />
                        <p>Choose your Tasker by reviews, skills, and price</p>
                    </div>
                    <div className="item" >
                        <BiSolidCheckCircle />
                        <p>Choose your Tasker by reviews, skills, and price</p>
                    </div>

                </div>
                <div className="right "
                    data-aos="fade-right"
                    style={{ backgroundImage: `url(${image2})` }}></div>
            </div>


            <div className="info-section">
                <div className="right "
                    data-aos="fade-left"
                    style={{ backgroundImage: `url(${image3})` }}>

                </div>
                <div className="left" data-aos="fade-right">
                    <h3 className="info-made-easier-header">Everyday life made easier</h3>
                    <p className="">
                        When life gets busy, you don’t have to tackle it alone.
                        Get time back for what you love without breaking the bank.
                    </p>
                    <div className="item">
                        <BiSolidCheckCircle />
                        <p>Choose your Tasker by reviews, skills, and price</p>
                    </div>
                    <div className="item">
                        <BiSolidCheckCircle />
                        <p>Schedule when it works for you — as early as today</p>
                    </div>
                    <div className="item">
                        <BiSolidCheckCircle />
                        <p>Choose your Tasker by reviews, skills, and price</p>
                    </div>
                    <div className="item" >
                        <BiSolidCheckCircle />
                        <p>Choose your Tasker by reviews, skills, and price</p>
                    </div>

                </div>
            </div>
      
            <FooterCentered />

        </div>
    )
}

export default DashBoard