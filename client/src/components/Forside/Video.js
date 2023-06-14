import React from 'react';
import { Ratio } from 'react-bootstrap';

import '../../styles/Home.css';


//controls width="100%"


const Video = () => {

    return (
        <div className='video-wrapper' style={{}}>
            <Ratio aspectRatio="16x9">
                <video src={`${process.env.PUBLIC_URL}https://nanoscalesimulations.com/Gallery/BIG-MAP%20demo%201.1.mov`} type="video/mp4" autoPlay loop muted/>
            </Ratio>
        </div>
    )

}

export default Video;