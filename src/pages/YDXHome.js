import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
      controls: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      wmode: 'opaque',
    },
  };
  const divRef = useRef(null); // use a reference for the #draggable-div

  // State Variables
  const videoId = 'Q9Xp77AENXI';
  const videoEndTime = 299;
  const [draggableDivWidth, setDraggableDivWidth] = useState(0.0); //stores width of #draggable-div
  const [currentEvent, setCurrentEvent] = useState(0); //stores YouTube video's event
  const [currentState, setCurrentState] = useState(-1); // stores YouTube video's PLAYING, CUED, PAUSED, UNSTARTED, BUFFERING, ENDED state values
  const [currentTime, setCurrentTime] = useState(0.0); //stores current running time of the YouTube video
  const [timer, setTimer] = useState(0); // stores TBD
  const [unitLength, setUnitLength] = useState(0); // stores unit length based on the video length to maintain colored div's on the timelines
  const [draggableTime, setDraggableTime] = useState({ x: -3, y: 0 }); // stores the position of the draggable bar on the #draggable-div
  const [videoDialogTimestamps, setVideoDialogTimestamps] = useState([]); // stores dialog-timestamps data for a video from backend db

  // for calculating the draggable-div width of the timeline
  const calculateDraggableDivWidth = () => {
    // remove the left & right margin - leaving about 96% of the total width of the draggable-div
    const currWidth = divRef.current.clientWidth;
    const draggableDivWidth = (96 * currWidth) / 100;
    setDraggableDivWidth(draggableDivWidth);
    // could add this to change the unit length for every window resize.. commenting this for now
    // window.addEventListener('resize', () => {
    //   const newWidth = divRef.current.clientWidth;
    //   const draggableDivWidth = (96 * newWidth) / 100;
    //   setDraggableDivWidth(draggableDivWidth);
    // });
  };
  // calculate unit length of the timeline width based on video length
  const calculateUnitLength = () => {
    let unitLength = draggableDivWidth / videoEndTime; // let unitlength = 644 / 299;
    setUnitLength(unitLength);
  };
  // use axios and get dialog timestamps for the Dialog Timeline
  const fetchDialogData = () => {
    axios
      .get('http://localhost:4000/api/dialog_timestamps/get-video-dialog/1')
      .then((res) => {
        const dialogData = res.data;
        return dialogData;
      })
      .then((dialogData) => {
        const updatedDialogData = [];
        dialogData.forEach((dialog) => {
          const x = dialog.dialog_start_time * unitLength;
          const width = dialog.dialog_duration * unitLength;
          const dialog_start_time = {
            dialog_seq_no: dialog.dialog_sequence_num,
            controlledPosition: { x: x, y: 0 },
            width: width,
          };
          updatedDialogData.push(dialog_start_time);
        });
        setVideoDialogTimestamps(updatedDialogData);
      });
  };

  useEffect(() => {
    // order of the below function call's is important
    calculateDraggableDivWidth(); // for calculating the draggable-div width of the timeline
    calculateUnitLength(); // calculate unit length of the timeline width based on video length
    fetchDialogData(); // use axios and get dialog timestamps for the Dialog Timeline
  }, [draggableDivWidth, unitLength]);

  // function to update currentime state variable & draggable bar time.
  const updateTime = () => {
    setCurrentTime(currentEvent.getCurrentTime());
    // for updating the draggable component position based on current time
    setDraggableTime({ x: unitLength * currentEvent.getCurrentTime(), y: 0 });
  };

  // converts seconds to hh:mm:ss format
  const convertSecondsToCardFormat = (timeInSeconds) => {
    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds);
    if (hours >= 24) hours = Math.floor(hours % 24);
    if (minutes >= 60) minutes = Math.floor(minutes % 60);
    if (minutes < 10 && timeInSeconds >= 3600) minutes = `0${minutes}`;
    if (seconds >= 60) seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = `0${seconds}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (hours < 10) hours = `0${hours}`;
    return timeInSeconds < 3600
      ? `00:${minutes}:${seconds}`
      : `${hours}:${minutes}:${seconds}`;
  };

  // YouTube Player Functions
  const onStateChange = (event) => {
    // console.log('onStateChange : ', event.data);
    if (event.data === 0) {
      console.log('end of the video');
      event.target.seekTo(0);
    }
    const currentTime = event.target.getCurrentTime();
    setCurrentEvent(event.target);
    setCurrentTime(currentTime);
    setCurrentState(event.data);
    switch (event.data) {
      case 'YT.PlayerState.PLAYING':
      case 'YT.PlayerState.CUED':
      case 'YT.PlayerState.PAUSED':
        updateTime(currentTime);
        clearInterval(timer);
        break;
      case 'YT.PlayerState.UNSTARTED':
      case 'YT.PlayerState.BUFFERING':
      case 'YT.PlayerState.ENDED':
      default:
        break;
    }
  };
  const onReady = (event) => {
    setCurrentEvent(event.target);
  };
  const onPlay = (event) => {
    setCurrentEvent(event.target);
    setCurrentTime(event.target.getCurrentTime());
    setTimer(
      setInterval(() => updateTime()),
      100
    );
    setCurrentEvent(event.target);
    console.log(draggableTime);
  };
  const onPause = (event) => {
    event.target.pauseVideo();
  };

  // Dialog Timeline Draggable Functions
  const stopProgressBar = (event, position) => {
    setDraggableTime({ x: position.x, y: 0 });
    let progressBarTime = 0.0;
    progressBarTime = position.x / unitLength;
    currentEvent.seekTo(progressBarTime);
    const currentTime = currentEvent.getCurrentTime();
    setCurrentTime(currentTime);
  };
  const dragProgressBar = (event, position) => {
    // setDraggableTime({ x: position.x, y: 0 });
    let progressBarTime = 0.0;
    progressBarTime = position.x / unitLength;
    currentEvent.seekTo(progressBarTime);
    const currentTime = currentEvent.getCurrentTime();
    setCurrentTime(currentTime);
  };

  return (
    <div className="container home-container">
      <div className="d-flex justify-content-around">
        <div className="text-white">
          <YouTube
            videoId={videoId}
            opts={opts}
            onStateChange={onStateChange}
            onPlay={onPlay}
            onPause={onPause}
            onReady={onReady}
          />
        </div>
        <Notes />
      </div>
      {/* <p className="text-white px-5">
        Current Video Time is {convertSecondsToCardFormat(currentTime)}
      </p> */}
      <hr />
      <div className="row div-below-hr">
        <div className="col-3 text-white timeline-column-width-1">
          <p className="dialog-timeline-text text-center font-weight-bolder">
            Dialog Timeline <br />
            (00:04:59)
          </p>
        </div>
        <div className="col-8 mt-3 timeline-column-width-2">
          <div className="row mx-3 timeline-div">
            <div id="draggable-div" className="draggable-div" ref={divRef}>
              {/* Dialog Timeline blue & white div's */}
              {videoDialogTimestamps.map((dialog, key) => (
                <Draggable
                  axis="x"
                  key={key}
                  position={dialog.controlledPosition}
                  bounds="parent"
                >
                  <div
                    className="dialog-timestamps-div"
                    style={{
                      width: dialog.width,
                      height: '18px',
                    }}
                  ></div>
                </Draggable>
              ))}

              {/* ProgressBar */}
              <Draggable
                axis="x"
                bounds="parent"
                defaultPosition={{ x: 0, y: 0 }}
                position={draggableTime}
                onDrag={dragProgressBar}
                onStop={stopProgressBar}
              >
                <div tabIndex={0} className="progress-bar-div">
                  <p className="mt-5 text-white progress-bar-time">
                    {convertSecondsToCardFormat(currentTime)}
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
            <i className="fa fa-upload" /> {'   '}
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default YDXHome;
