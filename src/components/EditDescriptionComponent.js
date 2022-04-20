import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import convertSecondsToCardFormat from '../helperFunctions/convertSecondsToCardFormat';
import '../assets/css/editAudioDesc.css';

const EditDescriptionComponent = (props) => {
  // destructuring props
  const currentTime = props.currentTime;
  const currentState = props.currentState;
  const currentEvent = props.currentEvent;
  const videoLength = props.videoLength;
  const handleClipStartTimeUpdate = props.handleClipStartTimeUpdate;

  const clip_description_text = props.clip_description_text;
  const clip_playback_type = props.clip_playback_type;
  const props_clip_start_time = props.clip_start_time;
  const is_recorded = props.is_recorded;
  const recorded_audio_path = props.recorded_audio_path;
  const clip_audio_path = props.clip_audio_path;

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

  // initialize state variables from props
  const [clipDescriptionText, setClipDescriptionText] = useState(
    clip_description_text
  );
  const [clipStartTime, setClipStartTime] = useState(0.0);

  const [clipStartTimeHours, setClipStartTimeHours] = useState(0.0);
  const [clipStartTimeMinutes, setClipStartTimeMinutes] = useState(0.0);
  const [clipStartTimeSeconds, setClipStartTimeSeconds] = useState(0.0);
  const videoLengthTime = convertSecondsToCardFormat(videoLength).split(':');

  useEffect(() => {
    // following statements execute whenever mediaBlobUrl is updated.. used it in the dependency array
    if (mediaBlobUrl !== null) {
      setRecordedAudio(new Audio(mediaBlobUrl));
    }
    setAdAudio(new Audio(clip_audio_path));

    // render the start time input fields based on the updated prop value - props_clip_start_time
    handleClipStartTimeInputsRender();
  }, [
    mediaBlobUrl,
    props_clip_start_time,
    // clipStartTimeHours,
    // clipStartTimeMinutes,
    // clipStartTimeSeconds,
  ]);

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

  // update the start time from the method received from props
  // let seconds =
  //   +clipStartTimeHours * 60 * 60 +
  //   +clipStartTimeMinutes * 60 +
  //   +clipStartTimeSeconds;
  // handleClipStartTimeUpdate(seconds);

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

  // function for toggling play pause functionality of audio description - on button click
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

  const handleClipDescriptionUpdate = (e) => {
    setClipDescriptionText(e.target.value);
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
    if (e.target.value.length === 1) {
      setClipStartTimeHours(e.target.value + '0');
      if (parseInt(e.target.value + '0') >= 60) {
        setClipStartTimeHours('59');
      }
      if (parseInt(e.target.value + '0') > parseInt(videoLengthTime[0])) {
        setClipStartTimeHours(videoLengthTime[0]);
      }
    } else if (e.target.value.length === 0) {
      setClipStartTimeHours('00');
    }
  };
  const handleBlurClipStartTimeMinutes = (e) => {
    if (e.target.value.length === 1) {
      setClipStartTimeMinutes(e.target.value + '0');
      if (parseInt(e.target.value + '0') >= 60) {
        setClipStartTimeMinutes('59');
      }
    } else if (e.target.value.length === 0) {
      setClipStartTimeMinutes('00');
    }
  };
  const handleBlurClipStartTimeSeconds = (e) => {
    if (e.target.value.length === 1) {
      setClipStartTimeSeconds(e.target.value + '0');
      if (parseInt(e.target.value + '0') >= 60) {
        setClipStartTimeSeconds('59');
      }
    } else if (e.target.value.length === 0) {
      setClipStartTimeSeconds('00');
    }
  };

  return (
    <div className="edit-component text-white">
      <div className="d-flex justify-content-evenly align-items-center">
        <div className="description-section mt-1">
          <div className="d-flex justify-content-evenly align-items-start">
            <div className="d-flex justify-content-center align-items-start flex-column">
              <h6 className="text-white">Description:</h6>
              <textarea
                className="form-control form-control-sm border rounded text-center description-textarea"
                rows="2"
                id="description"
                name="description"
                // defaultValue={clip_description_text}
                value={clipDescriptionText}
                onChange={handleClipDescriptionUpdate}
              ></textarea>
            </div>
            <div className="d-flex justify-content-center align-items-start flex-column">
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
            </div>
          </div>
          <div className="mb-3 d-flex justify-content-around align-items-center w-75">
            <button
              type="button"
              className="btn rounded btn-sm text-white bg-danger"
            >
              <i className="fa fa-trash" /> {'  '} Delete
            </button>
            <button
              type="button"
              className="btn rounded btn-sm text-white save-desc-btn"
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
                title="Play this Description"
                onClick={handlePlayPauseAdAudio}
              >
                <i className="fa fa-play" /> {'  '} Play
              </button>
            )}
          </div>
        </div>
        <div className="vertical-divider-div"></div>
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
                title="YouTube Video plays/pauses along with the Audio Description"
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
                title="YouTube Video plays/pauses along with the Audio Descriptions"
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

export default EditDescriptionComponent;
