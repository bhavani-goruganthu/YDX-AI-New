import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; /* to use params on the url */
import axios from 'axios';
import YouTube from 'react-youtube';
import Draggable from 'react-draggable';
import '../assets/css/home.css';
import AudioDescriptionComponent from '../components/AudioDescriptionComponent';
import Notes from '../components/NotesComponent';
import convertSecondsToCardFormat from '../helperFunctions/convertSecondsToCardFormat';

const YDXHome = (props) => {
  /* to use params on the url and get userId & youtubeVideoId */
  const { userId, youtubeVideoId } = useParams();
  /* Options for YouTube video API */
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
  // use a reference for the #draggable-div to get the width and use in calculateDraggableDivWidth()
  const divRef = useRef(null);

  // State Variables
  const [videoId, setVideoId] = useState(0); // retrieved from db, stored to fetch audio_descriptions
  const [draggableDivWidth, setDraggableDivWidth] = useState(0.0); //stores width of #draggable-div
  const [currentEvent, setCurrentEvent] = useState(0); //stores YouTube video's event
  const [currentState, setCurrentState] = useState(-1); // stores YouTube video's PLAYING, CUED, PAUSED, UNSTARTED, BUFFERING, ENDED state values
  const [currentTime, setCurrentTime] = useState(0.0); //stores current running time of the YouTube video
  const [timer, setTimer] = useState(0); // stores TBD
  const [unitLength, setUnitLength] = useState(0); // stores unit length based on the video length to maintain colored div's on the timelines
  const [draggableTime, setDraggableTime] = useState({ x: -3, y: 0 }); // stores the position of the draggable bar on the #draggable-div
  const [videoDialogTimestamps, setVideoDialogTimestamps] = useState([]); // stores dialog-timestamps data for a video from backend db
  const [isPublished, setIsPublished] = useState(false); // holds the published state of the Video & Audio Description
  const [audioClips, setAudioClips] = useState([]); // stores list of Audio Descriptions data for a video from backend db

  useEffect(() => {
    fetchUserVideoData(); // use axios to get audio descriptions for the youtubeVideoId & userId passed to the url Params
  }, [draggableDivWidth, unitLength, videoId, youtubeVideoId]);

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
  const calculateUnitLength = (videoEndTime) => {
    let unitLength = draggableDivWidth / videoEndTime; // let unitlength = 644 / 299;
    setUnitLength(unitLength);
  };
  // use axios and get dialog timestamps for the Dialog Timeline
  const fetchDialogData = () => {
    axios
      .get(
        `http://localhost:4000/api/dialog-timestamps/get-video-dialog/${videoId}`
      )
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

  // fetch videoId based on the youtubeVideoId which is later used to get audioDescriptions
  const fetchUserVideoData = () => {
    axios
      .get(
        `http://localhost:4000/api/videos/get-by-youtubeVideo/${youtubeVideoId}`
      )
      .then((res) => {
        const video_id = res.data.video_id;
        const video_length = res.data.video_length;
        setVideoId(video_id);
        return video_length;
      })
      .then((video_length) => {
        // order of the below function calls is important
        calculateDraggableDivWidth(); // for calculating the draggable-div width of the timeline
        calculateUnitLength(video_length); // calculate unit length of the timeline width based on video length
        fetchDialogData(); // use axios and get dialog timestamps for the Dialog Timeline});
        fetchAudioDescriptions();
      });
  };

  // use axios to get audio descriptions for the videoId (set in fetchUserVideoData()) & userId passed to the url Params
  const fetchAudioDescriptions = () => {
    axios
      .get(
        `http://localhost:4000/api/audio-descriptions/get-user-ad/${videoId}&${userId}`
      )
      .then((res) => {
        const ad_id = res.data.ad_id;
        setIsPublished(res.data.is_published);
        return ad_id;
      })
      .then((ad_id) => {
        axios
          .get(`http://localhost:4000/api/audio-clips/get-user-ad/${ad_id}`)
          .then((res) => {
            setAudioClips(res.data);
          });
      });
  };

  // function to update currentime state variable & draggable bar time.
  const updateTime = () => {
    setCurrentTime(currentEvent.getCurrentTime());
    // for updating the draggable component position based on current time
    setDraggableTime({ x: unitLength * currentEvent.getCurrentTime(), y: 0 });
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
            videoId={youtubeVideoId}
            opts={opts}
            onStateChange={onStateChange}
            onPlay={onPlay}
            onPause={onPause}
            onReady={onReady}
          />
        </div>
        <Notes currentTime={convertSecondsToCardFormat(currentTime)} />
      </div>
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
                      height: '20px',
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
        {audioClips.map((clip, key) => (
          <AudioDescriptionComponent
            key={key}
            clip={clip}
            unitLength={unitLength}
          />
        ))}
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
          <button
            type="button"
            className="btn publish-bg text-white"
            data-bs-toggle="modal"
            data-bs-target="#publishModal"
          >
            <i className="fa fa-upload" /> {'   '}
            Publish
          </button>
        </div>
      </div>
      {/* <!-- Publish Modal --> Confirmation Modal - opens when user hits Publish button and asks for a confirmation*/}
      <div className="modal fade text-dark" id="publishModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content mx-auto w-75">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Publish</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="modal-body text-center">Are you sure?</div>
            {/* <!-- Modal footer --> */}
            <div className="modal-footer d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn primary-btn-color text-center m-1 text-white"
                data-dismiss="modal"
              >
                Yes
              </button>
              <button
                type="button"
                className="btn primary-btn-color text-white"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YDXHome;
