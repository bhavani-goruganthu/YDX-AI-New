import React, { useState } from 'react';
import YouTube from 'react-youtube';
import '../assets/css/home.css';

const YDXHome = () => {
  const opts = {
    height: '300',
    width: '500',
    playerVars: {
      autoplay: 0,
      enablejsapi: 1,
      cc_load_policy: 1,
      controls: 0,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      wmode: 'opaque',
    },
  };
  return (
    <div className="container home-container">
      <div className="d-flex">
        <div>
          <YouTube videoId="Q9Xp77AENXI" opts={opts} />
        </div>
      </div>
    </div>
  );
};

export default YDXHome;
