import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import convertSecondsToCardFormat from '../helperFunctions/convertSecondsToCardFormat';
import '../assets/css/editAudioDesc.css';
import axios from 'axios';

const EditClipComponent = (props) => {
  // destructuring props
  //props of URL Params
  const userId = props.userId;
  const youtubeVideoId = props.youtubeVideoId;
  // props of the video
  const currentTime = props.currentTime;
  const currentState = props.currentState;
  const currentEvent = props.currentEvent;
  const videoLength = props.videoLength;
  const handleClipStartTimeUpdate = props.handleClipStartTimeUpdate;

  // props - state for updating and fetching data in YDXHome.js (child to parent component)
  const updateData = props.updateData;
  const setUpdateData = props.setUpdateData;

  const clip_id = props.clip_id;
  const clip_description_text = props.clip_description_text;
  const clip_description_type = props.clip_description_type;
  const clip_playback_type = props.clip_playback_type;
  const props_clip_start_time = props.clip_start_time;
  const clip_duration = props.clip_duration;
  const is_recorded = props.is_recorded;
  const recorded_audio_path = props.recorded_audio_path;
  const clip_audio_path = props.clip_audio_path;

  // use 3 state variables to hold the value of 3 input type number fields
  const [clipStartTimeHours, setClipStartTimeHours] = useState(0.0);
  const [clipStartTimeMinutes, setClipStartTimeMinutes] = useState(0.0);
  const [clipStartTimeSeconds, setClipStartTimeSeconds] = useState(0.0);

  // variable and function declaration of the react-media-recorder package
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true }); // using only the audio recorder here
  // this state variable keeps track of the play/pause state of the recorded audio
  const [isRecordedAudioPlaying, setIsRecordedAudioPlaying] = useState(false);
  // this state variable is updated whenever mediaBlobUrl is updated. i.e. whenever a new recording is created
  const [recordedAudio, setRecordedAudio] = useState('');
  const [adAudio, setAdAudio] = useState('');
  const [isAdAudioPlaying, setIsAdAudioPlaying] = useState(false);
  const [isYoutubeVideoPlaying, setIsYoutubeVideoPlaying] = useState(false);
  const [showStartTimeError, setShowStartTimeError] = useState(false);

  // timeout for the alert
  if (showStartTimeError) {
    setTimeout(() => {
      setShowStartTimeError(false);
    }, 4000);
  }

  // initialize state variables from props
  const [clipDescriptionText, setClipDescriptionText] = useState(
    clip_description_text
  );

  useEffect(() => {
    // following statements execute whenever mediaBlobUrl is updated.. used it in the dependency array
    if (mediaBlobUrl !== null) {
      setRecordedAudio(new Audio(mediaBlobUrl));
    }
    setAdAudio(new Audio(clip_audio_path));
    // render the start time input fields based on the updated prop value - props_clip_start_time
    handleClipStartTimeInputsRender();
  }, [mediaBlobUrl, props_clip_start_time]);

  // render the values in the input[type='number'] fields of the start time - renders everytime the props_clip_start_time value changes
  const handleClipStartTimeInputsRender = () => {
    setClipStartTimeHours(
      convertSecondsToCardFormat(props_clip_start_time).split(':')[0]
    );
    setClipStartTimeMinutes(
      convertSecondsToCardFormat(props_clip_start_time).split(':')[1]
    );
    setClipStartTimeSeconds(
      convertSecondsToCardFormat(props_clip_start_time).split(':')[2]
    );
  };

  // calculate the Start Time in seconds from the Hours, Minutes & Seconds passed from handleBlur functions
  const calculateClipStartTimeinSeconds = (hours, minutes, seconds) => {
    let calculatedSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds;
    // check if the updated start time is more than the videolength, if yes, throw error and retain the old state
    if (calculatedSeconds > videoLength) {
      setShowStartTimeError(true);
      handleClipStartTimeInputsRender();
    } else {
      // handleClipStartTimeUpdate is the prop function received from parent component - this runs an axios PUT call and updates the clipStartTime
      handleClipStartTimeUpdate(calculatedSeconds);
    }
  };

  // function for toggling play pause functionality of the recorded audio - on button click
  const handlePlayPauseRecordedAudio = () => {
    if (isRecordedAudioPlaying) {
      recordedAudio.pause();
      setIsRecordedAudioPlaying(false);
    } else {
      recordedAudio.play();
      setIsRecordedAudioPlaying(true);
      // this is for setting setIsRecordedAudioPlaying variable to false, once the playback is completed.
      recordedAudio.addEventListener('ended', function () {
        setIsRecordedAudioPlaying(false);
      });
    }
  };

  // function for toggling play pause functionality of audio Clip - on button click
  const handlePlayPauseAdAudio = () => {
    if (isAdAudioPlaying) {
      adAudio.pause();
      setIsAdAudioPlaying(false);
    } else {
      adAudio.play();
      setIsAdAudioPlaying(true);
      // this is for setting setIsAdAudioPlaying variable to false, once the playback is completed.
      adAudio.addEventListener('ended', function () {
        setIsAdAudioPlaying(false);
      });
    }
  };

  // function for toggling play pause functionality of the YouTube video - on button click
  const handlePlayPauseYouTubeVideo = () => {
    // if youTube video is not started or it has ended or it is paused
    if (currentState === -1 || currentState === 0 || currentState === 2) {
      currentEvent.playVideo();
      setIsYoutubeVideoPlaying(true);
    }
    // if youTube video is playing
    else if (currentState === 1) {
      currentEvent.pauseVideo();
      setIsYoutubeVideoPlaying(false);
    }
  };

  // lots of if else conditions to ensure correct input in the start time number fields.
  const handleOnChangeClipStartTimeHours = (e) => {
    setClipStartTimeHours(e.target.value);
    if (e.target.value.length > 2) {
      setClipStartTimeHours(e.target.value.substring(0, 2));
    }
  };
  const handleOnChangeClipStartTimeMinutes = (e) => {
    setClipStartTimeMinutes(e.target.value);
    if (e.target.value.length > 2) {
      setClipStartTimeMinutes(e.target.value.substring(0, 2));
    } else if (e.target.value.length === 2) {
      if (parseInt(e.target.value) >= 60) {
        setClipStartTimeMinutes('59');
      }
    }
  };
  const handleOnChangeClipStartTimeSeconds = (e) => {
    setClipStartTimeSeconds(e.target.value);
    if (e.target.value.length > 2) {
      setClipStartTimeSeconds(e.target.value.substring(0, 2));
    } else if (e.target.value.length === 2) {
      if (parseInt(e.target.value) >= 60) {
        setClipStartTimeSeconds('59');
      }
    }
  };
  const handleBlurClipStartTimeHours = (e) => {
    // store the current clipStartTimeHours in a temp variable,
    // so that when calculateClipStartTimeinSeconds without going into the loops,
    // it has the previous value in it
    let tempStartTimeHours = clipStartTimeHours;
    if (e.target.value.length === 1) {
      setClipStartTimeHours(e.target.value + '0');
      tempStartTimeHours = e.target.value + '0';
      if (parseInt(e.target.value + '0') >= 60) {
        setClipStartTimeHours('59');
        tempStartTimeHours = '59';
      }
    } else if (e.target.value.length === 0) {
      setClipStartTimeHours('00');
      tempStartTimeHours = '00';
    }
    // call the function which will update the clipStartTime in the parent component and the db is updated too.
    calculateClipStartTimeinSeconds(
      tempStartTimeHours,
      clipStartTimeMinutes,
      clipStartTimeSeconds
    );
  };
  const handleBlurClipStartTimeMinutes = (e) => {
    // store the current clipStartTimeMinutes in a temp variable,
    // so that when calculateClipStartTimeinSeconds without going into the loops,
    // it has the previous value in it
    let tempStartTimeMinutes = clipStartTimeMinutes;
    if (e.target.value.length === 1) {
      setClipStartTimeMinutes(e.target.value + '0');
      tempStartTimeMinutes = e.target.value + '0';
      if (parseInt(e.target.value + '0') >= 60) {
        setClipStartTimeMinutes('59');
        tempStartTimeMinutes = '59';
      }
    } else if (e.target.value.length === 0) {
      setClipStartTimeMinutes('00');
      tempStartTimeMinutes = '00';
    }
    // call the function which will update the clipStartTime in the parent component and the db is updated too.
    calculateClipStartTimeinSeconds(
      clipStartTimeHours,
      tempStartTimeMinutes,
      clipStartTimeSeconds
    );
  };
  const handleBlurClipStartTimeSeconds = (e) => {
    // store the current clipStartTimeSeconds in a temp variable,
    // so that when calculateClipStartTimeinSeconds without going into the loops,
    // it has the previous value in it
    let tempStartTimeSeconds = clipStartTimeSeconds;
    if (e.target.value.length === 1) {
      setClipStartTimeSeconds(e.target.value + '0');
      tempStartTimeSeconds = e.target.value + '0';
      if (parseInt(e.target.value + '0') >= 60) {
        setClipStartTimeSeconds('59');
        tempStartTimeSeconds = '59';
      }
    } else if (e.target.value.length === 0) {
      setClipStartTimeSeconds('00');
      tempStartTimeSeconds = '00';
    }
    // call the function which will update the clipStartTime in the parent component and the db is updated too.
    calculateClipStartTimeinSeconds(
      clipStartTimeHours,
      clipStartTimeMinutes,
      tempStartTimeSeconds
    );
  };

  const handleClipDescriptionUpdate = (e) => {
    setClipDescriptionText(e.target.value);
  };

  const handleClickSaveClipDescription = (e) => {
    e.preventDefault();
    // check if the clip has been updated
    if (clipDescriptionText !== clip_description_text) {
      axios
        .put(
          `http://localhost:4000/api/audio-clips/update-ad-description/${clip_id}`,
          {
            userId: userId,
            youtubeVideoId: youtubeVideoId,
            clipDescriptionText: clipDescriptionText,
            clipDescriptionType: clip_description_type,
          }
        )
        .then((res) => {
          // below prop is used to re-render the parent component i.e. fetch audio clip data
          setUpdateData(!updateData);
          alert('Description saved Successfully!!');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div className="edit-component text-white">
      <div className="d-flex justify-content-evenly align-items-center">
        {/* Clip Description & Start time Div */}
        <div className="description-section mt-1">
          <div className="d-flex justify-content-between align-items-start">
            {/* Description label, text area & buttons*/}
            <div className="d-flex justify-content-center align-items-start flex-column">
              <h6 className="text-white">Clip Description:</h6>
              <textarea
                className="form-control form-control-sm border rounded text-center description-textarea"
                rows="2"
                id="description"
                name="description"
                // defaultValue={clip_description_text}
                value={clipDescriptionText}
                onChange={handleClipDescriptionUpdate}
              ></textarea>
              {/* play, save & Delete buttons */}
              <div className="my-2 d-flex justify-content-evenly align-items-center w-100">
                <button
                  type="button"
                  className="btn rounded btn-sm text-white bg-danger"
                >
                  <i className="fa fa-trash" /> {'  '} Delete
                </button>
                <button
                  type="button"
                  className="btn rounded btn-sm text-white save-desc-btn"
                  onClick={handleClickSaveClipDescription}
                >
                  <i className="fa fa-save" /> {'  '} Save
                </button>
                {isAdAudioPlaying ? (
                  <button
                    type="button"
                    className="btn rounded btn-sm primary-btn-color text-white"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Pause Audio"
                    onClick={handlePlayPauseAdAudio}
                  >
                    <i className="fa fa-pause" /> {'  '} Pause
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn rounded btn-sm primary-btn-color text-white"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Play this Clip"
                    onClick={handlePlayPauseAdAudio}
                  >
                    <i className="fa fa-play" /> {'  '} Play
                  </button>
                )}
              </div>
            </div>
            {/* Start Time div */}
            <div className="mx-2 d-flex justify-content-between align-items-center flex-column">
              <h6 className="text-white">Start Time</h6>
              <div className="edit-time-div">
                <div className="text-dark text-center d-flex justify-content-evenly">
                  <input
                    type="number"
                    style={{ width: '25px' }}
                    className="text-white bg-dark"
                    min="0"
                    value={clipStartTimeHours}
                    onChange={handleOnChangeClipStartTimeHours}
                    onBlur={handleBlurClipStartTimeHours}
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                  <div className="mx-1">:</div>
                  <input
                    type="number"
                    style={{ width: '25px' }}
                    className="text-white bg-dark"
                    value={clipStartTimeMinutes}
                    onChange={handleOnChangeClipStartTimeMinutes}
                    onBlur={handleBlurClipStartTimeMinutes}
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                  <div className="mx-1">:</div>
                  <input
                    type="number"
                    style={{ width: '25px' }}
                    className="text-white bg-dark"
                    value={clipStartTimeSeconds}
                    onChange={handleOnChangeClipStartTimeSeconds}
                    onBlur={handleBlurClipStartTimeSeconds}
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
              </div>
              {showStartTimeError ? (
                <div className="bg-white rounded p-1 mb-1 text-center">
                  <h6 className="text-danger small mb-0">
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>{' '}
                    Start Time cannot be later than the video end time
                  </h6>
                </div>
              ) : (
                <div>
                  <h6 className="text-white text-center">
                    {/* Duration: {convertSecondsToCardFormat(clip_duration)} sec*/}
                    Duration: {parseFloat(clip_duration).toFixed(2)} sec
                  </h6>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* vertical divider line */}
        <div className="d-flex flex-column align-items-center">
          <h6>Or</h6>
          <div className="vertical-divider-div"></div>
        </div>
        {/* Record & Replace Section */}
        <div>
          <h6 className="text-white text-center">
            Record & Replace AI's voice
          </h6>
          <div className="bg-white rounded text-dark d-flex justify-content-between align-items-center p-2 w-100 my-2">
            <div className="mx-1">
              {status === 'recording' ? (
                <button
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Click to Stop Recording"
                  type="button"
                  className="btn rounded btn-sm mx-auto border border-warning bg-light"
                  onClick={stopRecording} // default functions given by the react-media-recorder package
                >
                  <i className="fa fa-stop text-danger" />
                </button>
              ) : (
                <button
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Click to Start Recording your voice"
                  type="button"
                  className="btn rounded btn-sm mx-auto border border-warning bg-light"
                  onClick={startRecording} // default functions given by the react-media-recorder package
                >
                  <i className="fa fa-microphone text-danger" />
                </button>
              )}
            </div>
            {/* No recording to Play */}
            {mediaBlobUrl === null ? (
              <>
                <div
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="No recording to Play"
                >
                  <button
                    type="button"
                    className="btn rounded btn-sm text-white primary-btn-color mx-3"
                    disabled
                  >
                    Listen
                  </button>
                </div>
                <div
                  data-bs-toggle="toggle"
                  data-bs-placement="bottom"
                  title="Replace the AI's Voice with your Voice"
                >
                  <button
                    type="button"
                    className="btn rounded btn-sm text-white primary-btn-color"
                    disabled
                  >
                    Replace
                  </button>
                </div>
              </>
            ) : isRecordedAudioPlaying ? ( //Listen to your recording
              <>
                <button
                  type="button"
                  className="btn rounded btn-sm text-white primary-btn-color mx-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Listen to your recording"
                  onClick={handlePlayPauseRecordedAudio} // toggle function for play / pause
                >
                  Pause/Stop
                </button>
                <div
                  data-bs-toggle="toggle"
                  data-bs-placement="bottom"
                  title="Replace the AI's Voice with your Voice"
                >
                  <button
                    type="button"
                    className="btn rounded btn-sm text-white primary-btn-color"
                    data-bs-toggle="modal"
                    data-bs-target="#replaceModal"
                  >
                    Replace
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn rounded btn-sm text-white primary-btn-color mx-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Listen to your recording"
                  onClick={handlePlayPauseRecordedAudio} // toggle function for play / pause
                >
                  Listen
                </button>
                <div
                  data-bs-toggle="toggle"
                  data-bs-placement="bottom"
                  title="Replace the AI's Voice with your Voice"
                >
                  <button
                    type="button"
                    className="btn rounded btn-sm text-white primary-btn-color"
                    data-bs-toggle="modal"
                    data-bs-target="#replaceModal"
                  >
                    Replace
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center rounded mx-auto p-1">
            {isYoutubeVideoPlaying ? (
              <button
                type="button"
                className="btn rounded btn-sm text-white primary-btn-color"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="YouTube Video plays/pauses along with the Audio Clip"
                onClick={handlePlayPauseYouTubeVideo}
              >
                <i className="fa fa-pause play-pause-icons" />
                {'  '} Pause Video with AD
              </button>
            ) : (
              <button
                type="button"
                className="btn rounded btn-sm text-white primary-btn-color"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="YouTube Video plays/pauses along with the Audio Clips"
                onClick={handlePlayPauseYouTubeVideo}
              >
                <i className="fa fa-play play-pause-icons" />
                {'  '} Play Video with AD
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <!-- Replace Modal --> Confirmation Modal - opens when user hits Replace and asks for a confirmation if AI's audio is to be replaced with the user recorded audio*/}
      <div className="modal fade text-dark" id="replaceModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Replace</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="modal-body text-center">
              Are you sure you want to replace AI's voice with the one you
              recorded?
            </div>
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

export default EditClipComponent;
