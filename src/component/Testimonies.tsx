import React from 'react'
import './Testimonies.scss'
import { AiTwotoneStar } from 'react-icons/ai'
import testimony1 from '../assets/images/testimony3.jpg'



const Testimonies = () => {
    return (
        // <div className='main-testimony-container'>

            <div className="testimony-box">
                <div className="avatar-box" 
                // style={{backgroundImage:`url(${testimony1})`}}
                >
                <img className="avatar" src={testimony1} alt="" />

                </div>
                <div className="right-side">
                    <div className="header">
                        <h4>John Doe</h4>
                        <AiTwotoneStar color='green' />
                        <AiTwotoneStar color='green' />
                        <AiTwotoneStar color='green' />
                    </div>
                    <p className="body">
                        Profile photo for Donald L.
                        Donald L.
                        "Nick did an outstanding job assembling my patio heater,
                        and he got it done faster than I could have imagined. He also has a very pleasan..."
                        September 30, 2019, SF Bay Area
                    </p>
                    <h5 className='task-type'>Help Moving</h5>
                </div>
            </div>
        // </div>
    )
}

export default Testimonies