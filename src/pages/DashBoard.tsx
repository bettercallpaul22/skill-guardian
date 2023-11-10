import "./DashBoard.scss"
import { Button, Select } from "@mantine/core";
import image from "../assets/images/errand-girl.jpg"
import image2 from "../assets/images/image1.jpg"
import image3 from "../assets/images/image3.jpg"
import { skillData } from "../assets/skillData";
import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { BiSolidCheckCircle } from "react-icons/bi";
import "aos/dist/aos.css"
import AOS from 'aos'
import { FooterCentered } from "../component/Footer";
import { AuthService } from "../services/authServices";


const DashBoard = () => {

    const authService = new AuthService();
    useLayoutEffect(() => {
        !authService.getUserToken() && window.location.replace('/')
    }, [])

  
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])
    const navigate = useNavigate()
    const [selectedSkill, setSelectedSkill] = useState("")

    return (
        <div className="main-dashboard-page">
            <div className="img-container" 
            style={{ backgroundImage: `url(${image})`, }}
            >
                <div className="desktop-search">
                    <div style={{ padding: 20 }}>

                        <h1 className="title">Get help. Gain happiness.</h1>
                        <h4 className="sub-title">just ask</h4>
                        <div className="search-btn-option">
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


            {/* MOBILE DEVICE 640 */}
            <div className="mobile-search">
                <div className="box-holder" style={{}}>
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
                            navigate("/task-form", { state: "Help Moving" })
                        }}
                    >
                        Help Moving
                    </Button>
                    <Button className="btn"
                        color='transparent'
                        onClick={() => {
                            navigate("/task-form", { state: "Electrical" })
                        }}
                    >
                        Electrical
                    </Button>
                    <Button className="btn"
                        color='transparent'
                        onClick={() => {
                            navigate("/task-form", { state: "Mount TV or other items" })
                        }}
                    >
                        Mount TV or other items
                    </Button>
                </div>
            </div>


            <div className="download-container">
                <Button className="download-btn"></Button>
                <Button className="download-btn2"></Button>
            </div>
            <div className="info-section-wrapper">

                <div className="info-section">
                    <div data-aos="fade-in">
                        <h3 className="info-made-easier-header">Everyday life made easier</h3>
                        <p className="sub-info-text">
                            When life gets busy, you don’t have to tackle it alone.
                            Get time back for what you love without breaking the bank.
                        </p>
                        <div className="sub-info-text-item">
                            <BiSolidCheckCircle />
                            <p>Choose your Tasker by reviews, skills, and price</p>
                        </div>
                        <div className="sub-info-text-item">
                            <BiSolidCheckCircle />
                            <p>Schedule when it works for you — as early as today</p>
                        </div>
                        <div className="sub-info-text-item">
                            <BiSolidCheckCircle />
                            <p>Choose your Tasker by reviews, skills, and price</p>
                        </div>
                        <div className="sub-info-text-item" >
                            <BiSolidCheckCircle />
                            <p>Choose your Tasker by reviews, skills, and price</p>
                        </div>
                    </div>
                    <div
                        className="left-img"
                        data-aos="fade-in"
                        style={{ backgroundImage: `url(${image2})`, }}
                    >
                    </div>
                </div>
                <div className="info-section">
                    <div >
                        <h3 className="info-made-easier-header">Everyday life made easier</h3>
                        <p className="sub-info-text">
                            When life gets busy, you don’t have to tackle it alone.
                            Get time back for what you love without breaking the bank.
                        </p>
                        <div className="sub-info-text-item">
                            <BiSolidCheckCircle />
                            <p>Choose your Tasker by reviews, skills, and price</p>
                        </div>
                        <div className="sub-info-text-item">
                            <BiSolidCheckCircle />
                            <p>Schedule when it works for you — as early as today</p>
                        </div>
                        <div className="sub-info-text-item">
                            <BiSolidCheckCircle />
                            <p>Choose your Tasker by reviews, skills, and price</p>
                        </div>
                        <div className="sub-info-text-item" >
                            <BiSolidCheckCircle />
                            <p>Choose your Tasker by reviews, skills, and price</p>
                        </div>
                    </div>
                    <div
                        className="left-img"
                        data-aos="fade-in"
                        style={{ backgroundImage: `url(${image3})`, }}
                    >
                    </div>
                </div>
            </div>


            <FooterCentered />
        </div>
    )
}

export default DashBoard