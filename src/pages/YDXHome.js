import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Draggable from 'react-draggable';
import '../assets/css/home.css';
import AudioDescriptionComponent from '../components/AudioDescriptionComponent';
import Notes from '../components/NotesComponent';

const YDXHome = () => {
  const opts = {
    height: '290',
    width: '520',
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
      <div className="d-flex justify-content-around">
        <div className="">
          <YouTube videoId="Q9Xp77AENXI" opts={opts} />
        </div>
        <Notes />
      </div>
      {/* <p className="text-white px-5">Current Video Time is 00:00:00:00</p> */}
      <hr />
      <div className="row div-below-hr">
        <div className="col-3 text-white timeline-column-width-1">
          <p className="dialog-timeline-text text-center font-weight-bolder">
            Dialog Timeline <br />
            (00:00:03:51)
          </p>
        </div>
        <div className="col-8 mt-3 timeline-column-width-2">
          <div className="row mx-3 timeline-div">
            <div className="draggable-div">
              {/* ProgressBar */}
              <Draggable
                axis="x"
                bounds="parent"
                defaultPosition={{ x: 0, y: 0 }}
                // position={draggableTime}
                // onDrag={dragProgressBar}
                // onStop={stopProgressBar}
              >
                <div
                  // id="progress_bar_timeline"
                  tabIndex={0}
                  className="progress-bar-div"
                >
                  <p className="mt-5 text-white progress-bar-time">
                    00:00:00:00
                  </p>
                </div>
              </Draggable>
            </div>
          </div>
        </div>
        <div className="col-1 timeline-column-width-3"></div>
      </div>

      <div className="audio-desc-component-list">
        <AudioDescriptionComponent />
        <AudioDescriptionComponent />
        <AudioDescriptionComponent />
        <AudioDescriptionComponent />
        <AudioDescriptionComponent />
        <AudioDescriptionComponent />
      </div>
      <div className="d-flex justify-content-between my-2">
        <div className="insert-new-buttons">
          <button type="button" className="btn inline-bg text-dark">
            <i className="fa fa-plus" /> {'   '}
            Insert New Inline
          </button>
          <button type="button" className="btn mx-5 extended-bg text-white">
            <i className="fa fa-plus" /> {'   '}
            Insert New Extended
          </button>
        </div>
        <div className="publish-buttons mx-4">
          <button type="button" className="btn publish-bg text-white">
            <i class="fa fa-upload" /> {'   '}
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default YDXHome;
