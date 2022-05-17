import React, { useState, useEffect } from 'react';
import '../assets/css/audioDesc.css';
import Draggable from 'react-draggable';
import EditClipComponent from './EditClipComponent';
import convertSecondsToCardFormat from '../helperFunctions/convertSecondsToCardFormat';
import axios from 'axios';

const AudioClipComponent = (props) => {
  // destructuring props
  //props of URL Params
  const userId = props.userId;
  const youtubeVideoId = props.youtubeVideoId;

  // props of Video
  const unitLength = props.unitLength;
  const currentTime = props.currentTime;
  const videoLength = props.videoLength;

  // props - state for updating and fetching data in YDXHome.js (child to parent component)
  const updateData = props.updateData;
  const setUpdateData = props.setUpdateData;

  // all audio clip data from props
  const clip_id = props.clip.clip_id;
  const clip_sequence_num = props.clip.clip_sequence_num;
  const clip_title = props.clip.clip_title;
  const clip_description_type = props.clip.description_type;
  const clip_description_text = props.clip.description_text;
  const clip_playback_type = props.clip.playback_type;
  const clip_start_time = props.clip.clip_start_time;
  const clip_end_time = props.clip.clip_end_time;
  const clip_duration = props.clip.clip_duration;
  const clip_audio_path = props.clip.clip_audio_path;
  const is_recorded = props.clip.is_recorded;
  const recorded_audio_path = props.clip.recorded_audio_path;

  // React State Variables
  const [clipPlaybackType, setClipPlayBackType] = useState(clip_playback_type);
  const [clipTitle, setClipTitle] = useState(clip_title);
  const [clipStartTime, setClipStartTime] = useState(0);

  // toggle variable to show or hide the edit component.
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [adDraggableWidth, setAdDraggableWidth] = useState(0.0);
  const [adDraggablePosition, setAdDraggablePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    //  update the clip start time based on the value from the props
    setClipStartTime(clip_start_time);
    // set draggable position & width
    setAdDraggablePosition({ x: clip_start_time * unitLength, y: 0 });
    setAdDraggableWidth(clip_duration * unitLength);
  }, [
    unitLength, // re-render when unit-length from the props changes
    // clipStartTime, // re-render when the state variable clipStartTime
    // clip_start_time, // re-render when the clipStartTime from props changes
    props,
  ]);

  // Dialog Timeline Draggable Functions
  const stopADBar = (event, position) => {
    setAdDraggablePosition({ x: position.x, y: 0 });
    let adBarTime = position.x / unitLength;
    setClipStartTime(parseFloat(adBarTime).toFixed(2));
    handleClipStartTimeUpdate(parseFloat(adBarTime).toFixed(2));
  };

  // Handle Nudge icons -> add/remove 1 second to start_time
  const handleLeftNudgeClick = (e) => {
    let newClipStartTime = (parseFloat(clipStartTime) - 1).toFixed(2);
    // so that the audio block isn't out of the timeline
    if (newClipStartTime >= 0) {
      setClipStartTime(newClipStartTime);
      // Also update the draggable div position based on start time
      setAdDraggablePosition({ x: clipStartTime * unitLength, y: 0 });
      handleClipStartTimeUpdate(newClipStartTime);
    }
  };
  const handleRightNudgeClick = (e) => {
    let newClipStartTime = (parseFloat(clipStartTime) + 1).toFixed(2);
    // so that the audio block isn't out of the timeline
    if (newClipStartTime <= videoLength) {
      setClipStartTime(newClipStartTime);
      // Also update the draggable div position based on start time
      setAdDraggablePosition({ x: clipStartTime * unitLength, y: 0 });
      handleClipStartTimeUpdate(newClipStartTime);
    }
  };

  // handle put (update) requests
  // handle update of start time from handleLeftNudgeClick, handleRightNudgeClick, stopADBar
  const handleClipStartTimeUpdate = (updatedClipStartTime) => {
    axios
      .put(
        `http://localhost:4000/api/audio-clips/update-clip-start-time/${clip_id}`,
        {
          clipStartTime: updatedClipStartTime,
        }
      )
      .then((res) => {
        // below prop is used to re-render the parent component i.e. fetch audio clip data
        setUpdateData(!updateData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // update clip title
  const handleClipTitleUpdate = (e) => {
    setClipTitle(e.target.value);
    axios
      .put(
        `http://localhost:4000/api/audio-clips/update-clip-title/${clip_id}`,
        {
          adTitle: e.target.value,
        }
      )
      .then((res) => {
        // console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // update clip playback type - inline/extended
  const handlePlaybackTypeUpdate = (e) => {
    setClipPlayBackType(e.target.value);
    axios
      .put(
        `http://localhost:4000/api/audio-clips/update-clip-playback-type/${clip_id}`,
        {
          clipPlaybackType: e.target.value,
        }
      )
      .then((res) => {
        setUpdateData(!updateData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      {/* React Fragments allow you to wrap or group multiple elements without adding an extra node to the DOM. */}
      <div className="text-white component mt-2 rounded">
        <div className="row align-items-center">
          <div className="col-2 component-column-width-1">
            <div className="mx-1 text-center">
              <p className="ad-title">Audio Clip {clip_sequence_num}:</p>
              <input
                type="text"
                className="form-control form-control-sm ad-title-input text-center"
                placeholder="Title goes here.."
                value={clipTitle}
                onChange={handleClipTitleUpdate}
              />
              <h6 className="mt-1 text-white">
                <b>Type: </b>
                {clip_description_type.charAt(0).toUpperCase() +
                  clip_description_type.slice(1)}{' '}
                {/* <b>End: </b>
                {clip_end_time} */}
              </h6>
            </div>
          </div>
          <div className="col-1 component-column-width-2 text-center">
            <small className="text-white">Nudge</small>
            <div
              className="nudge-btns-div d-flex justify-content-around align-items-center"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Nudge the audio block (1s)"
            >
              <i
                className="fa fa-chevron-left p-2 nudge-icons"
                onClick={handleLeftNudgeClick}
              />
              <i
                className="fa fa-chevron-right p-2 nudge-icons"
                onClick={handleRightNudgeClick}
              />
            </div>
          </div>
          <div className="col-8 component-column-width-3">
            <div className="row component-timeline-div">
              <div id="ad-draggable-div" className="ad-draggable-div">
                <Draggable
                  axis="x"
                  defaultPosition={{ x: 0, y: 0 }}
                  position={adDraggablePosition}
                  onStop={stopADBar}
                  bounds="parent"
                >
                  {clipPlaybackType === 'inline' ? (
                    <div
                      className="ad-timestamp-div"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={convertSecondsToCardFormat(clipStartTime)}
                      style={{
                        width: adDraggableWidth,
                        height: '20px',
                        backgroundColor: 'var(--inline-color)',
                      }}
                    ></div>
                  ) : (
                    <div
                      className="ad-timestamp-div"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={convertSecondsToCardFormat(clipStartTime)}
                      style={{
                        width: '2px',
                        height: '20px',
                        backgroundColor: 'var(--extended-color)',
                      }}
                    ></div>
                  )}
                </Draggable>
              </div>
            </div>
            <div className="mx-5 mt-2">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name={clip_sequence_num}
                  id="radio1"
                  value="inline"
                  checked={clipPlaybackType === 'inline' ? true : false}
                  onChange={handlePlaybackTypeUpdate}
                />
                <div className="inline-bg text-dark inline-extended-radio px-2">
                  <label className="inline-extended-label">Inline</label>
                </div>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name={clip_sequence_num}
                  id="radio2"
                  value="extended"
                  checked={clipPlaybackType === 'extended' ? true : false}
                  onChange={handlePlaybackTypeUpdate}
                />
                <div className="extended-bg text-white inline-extended-radio px-2">
                  <label className="inline-extended-label">Extended</label>
                </div>
              </div>
            </div>
          </div>
          {/* toggle the chevron to show or hide the edit Clip component */}
          <div className="col-1 component-column-width-4">
            {showEditComponent ? (
              <i
                className="fa fa-chevron-up"
                onClick={() => setShowEditComponent(false)}
              />
            ) : (
              <i
                className="fa fa-chevron-down"
                onClick={() => setShowEditComponent(true)}
              />
            )}
          </div>
        </div>
      </div>
      {/* Based on the state of the showEditComponent variable, the edit component will be displayed*/}
      {showEditComponent ? (
        <EditClipComponent
          handleClipStartTimeUpdate={handleClipStartTimeUpdate}
          userId={userId}
          youtubeVideoId={youtubeVideoId}
          clip_id={clip_id}
          clip_description_type={clip_description_type}
          clip_description_text={clip_description_text}
          clip_playback_type={clip_playback_type}
          clip_start_time={clipStartTime}
          clip_duration={clip_duration}
          is_recorded={is_recorded}
          recorded_audio_path={recorded_audio_path}
          clip_audio_path={clip_audio_path}
          currentTime={currentTime}
          updateData={updateData}
          setUpdateData={setUpdateData}
          currentEvent={props.currentEvent}
          currentState={props.currentState}
          videoLength={videoLength}
          setShowSpinner={props.setShowSpinner}
        />
      ) : (
        <> </>
      )}
    </React.Fragment>
  );
};
export default AudioClipComponent;
