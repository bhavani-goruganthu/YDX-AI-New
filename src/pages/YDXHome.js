import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Draggable from 'react-draggable';
import '../assets/css/home.css';

const YDXHome = () => {
  const opts = {
    height: '260',
    width: '450',
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
      <div className="row mt-1">
        <div className="col">
          <div className="">
            <YouTube videoId="Q9Xp77AENXI" opts={opts} />
          </div>
        </div>
        <div className="col">
          <div className="notes-bg">
            <div className="my-auto align-items-center pt-1 px-3">
              <h6 className="text-white">Notes:</h6>
            </div>
            <div className="mx-auto my-auto notes-textarea align-items-center border rounded">
              <textarea
                className="form-control border rounded"
                style={{ resize: 'none' }}
                rows="7"
                id="notes"
                name="notes"
              ></textarea>
            </div>
            <div className="mx-auto text-center mt-2">
              <button
                type="button"
                className="btn rounded btn-sm text-white primary-btn-color"
              >
                <i className="fa fa-save" />
                <b> Save</b>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-2 text-white">
          <p className="margin-dialog-timeline-text text-center">
            Dialog Timeline <br />
            (00:00:03:51)
          </p>
        </div>
        <div className="col-10 mt-2">
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
      </div>
    </div>
  );
};

export default YDXHome;
