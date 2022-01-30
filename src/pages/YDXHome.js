import React, { useState } from 'react';
import YouTube from 'react-youtube';
import '../assets/css/home.css';

const YDXHome = () => {
  const opts = {
    height: '350',
    width: '560',
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
            <div className="my-auto align-items-center pt-2 px-3">
              <h5 className="text-white">Notes:</h5>
            </div>
            <div className="mx-auto my-auto notes-textarea align-items-center border rounded">
              <textarea
                className="form-control border rounded"
                style={{ resize: 'none' }}
                rows="9"
                id="notes"
                name="notes"
              ></textarea>
            </div>
            <div className="mx-auto text-center mt-3">
              <button type="button" className="btn rounded bg-warning">
                <i className="fa fa-save" />
                <b> Save</b>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <button type="button" className="btn rounded bg-warning">
          <i className="fa fa-play" /> <i className="fa fa-pause" />
          <b> Play/Pause</b>
        </button>
        <button type="button" className="btn rounded bg-warning">
          <i className="fa fa-plus"></i>
          <b> Insert New AD</b>
        </button>
      </div>
      <hr />
    </div>
  );
};

export default YDXHome;
