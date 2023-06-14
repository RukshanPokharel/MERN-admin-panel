import React from 'react';
import { Ratio } from 'react-bootstrap';

import '../../styles/Home.css';
import ReactPlayer from 'react-player';


//controls width="100%"


const Video = () => {

    return (
        <div className='video-wrapper' style={{}}>
            <Ratio aspectRatio="16x9">
                <ReactPlayer  
                url = 'https://nanoscalesimulations.com/Gallery/BIG-MAP%20demo%201.1.mov'
                playing={true}
                loop={true}
                muted={true}
                controls={false}
                id="background_video"
                aspectRatio="16x9"
                />
            </Ratio>
        </div>
    )

}

export default Video;