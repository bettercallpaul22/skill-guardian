import "./HomePage.scss"
import { Button, Divider, Select } from "@mantine/core";
import image from "../assets/construction-worker.avif"
import image2 from "../assets/images/image1.jpg"
import image3 from "../assets/images/image3.jpg"
import getstartedleft from "../assets/images/getstartedleft.png"
import getstartedright from "../assets/images/getstartedright.png"
import { skillData } from "../assets/skillData";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import Project from "./Project";
import { BiSolidCheckCircle } from "react-icons/bi";
import "aos/dist/aos.css"
import AOS from 'aos'
import Testimonies from "../component/Testimonies";
import { FooterCentered } from "../component/Footer";
import { AuthService } from "../services/authServices";


const HomePage = () => {
    const authService = new AuthService()
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])
    const navigate = useNavigate()
    const [selectedSkill, setSelectedSkill] = useState("")


    useLayoutEffect(() => {
        authService.getUserToken() && window.location.replace('/dashboard')
    }, [])

    return (
        <div className="main-home-page">
            <div className="img-container" style={{ backgroundImage: `url(${image})`, }}>
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

            <div className="testimonial-slider-container">
                <h2 className="header-title">Don't just take our word for it</h2>
                <h4 className="header-sub-title" >See how Taskers are saving the day for people like you.</h4>
                <div className="testimonial-slider" data-aos="fade-in">
                    <Testimonies />
                    <Testimonies />
                    <Testimonies />
                    <Testimonies />
                    <Testimonies />
                </div>
            </div>
            <Project />

            <div className="get-started-m">
                <div className="header">
                    <h2>Ready to get started?</h2>
                </div>
                <div className="section">
                    <div className="left">
                        <div className="img-container">
                            <img className="img" src={getstartedleft} alt="" />
                        </div>
                        <h3 className="info">
                            Hear that? The sweet sigh of relief. Start getting more done.
                        </h3>
                        <NavLink to='/login'>
                            <Button>Sign Up</Button>
                        </NavLink>
                    </div>
                    <Divider className="divider" />
                    <div className="right">
                        <div className="img-container">

                            <img className='img' src={getstartedright} alt="" />
                        </div>
                        <h3 className="info">
                            Hear that? The sweet sigh of relief. Start getting more done.
                        </h3>
                        <NavLink to='/login'>
                            <Button>Become A Tasker</Button>
                        </NavLink>
                    </div>

                </div>
            </div>





            {/* <div className="mobile-search">
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

            // <div className="download-container">
            //     <Button className="download-btn"></Button>
            //     <Button className="download-btn2"></Button>
            // </div>

            <h2 style={{ paddingLeft: 70 }}>Popular projects in your area</h2>
           

          


           
            <div className="testimonial-slider-container">
                <h2 style={{ paddingLeft: 60, marginBottom: -20 }}>Don't just take our word for it</h2>
                <h4 style={{ paddingLeft: 60 }}>See how Taskers are saving the day for people like you.</h4>
                <div className="testimonial-slider">
                    <Testimonies />
                    <Testimonies />
                    <Testimonies />
                    <Testimonies />
                    <Testimonies />
                </div>
            </div>

            <div className="get-started-m">
                <div className="header">
                    <h2>Ready to get started?</h2>
                </div>
                <div className="section">
                    <div className="left">
                        <div className="img-container">
                            <img height={150} src={getstartedleft} alt="" />
                        </div>
                        <h3 className="info">
                            Hear that? The sweet sigh of relief. Start getting more done.
                        </h3>
                        <Button>Sign Up</Button>
                    </div>
                    <Divider className="divider" />
                    <div className="right">
                        <div className="img-container">
                            <img height={150} src={getstartedright} alt="" />
                        </div>
                        <h3 className="info">
                            Hear that? The sweet sigh of relief. Start getting more done.
                        </h3>
                        <Button>Become A Tasker</Button>
                    </div>

                </div>
            </div>
             */}
            <FooterCentered />
        </div>
    )
}

export default HomePage