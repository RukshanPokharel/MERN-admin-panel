import React from "react";
import { Ratio } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import myVideo from './MegaGrant.mp4';

import '../../styles/Home.css';


//controls width="100%"

const src = "https://nanoscalesimulations.com/Gallery/BIG-MAP%20demo%201.1.mov";

// const yt = "https://www.youtube.com/embed/Yo3AcnSr6_g";

const Video = () => {

    return (
        <div className='video-wrapper' style={{}}>
            {/*
            <Ratio aspectRatio="16x9">
                <video src={src} type="video/mp4" autoPlay loop muted/>
            </Ratio>
            */}
            <ReactPlayer
            url={myVideo}
            controls={false}
            playing={true}
            loop={true}
            volume={null}
            muted={true}
            width={'100%'}
            height={'100%'}
            />
        </div>
    )

}

export default Video;