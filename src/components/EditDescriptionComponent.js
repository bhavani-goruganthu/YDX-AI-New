import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import convertSecondsToCardFormat from '../helperFunctions/convertSecondsToCardFormat';
import '../assets/css/editAudioDesc.css';

const EditDescriptionComponent = (props) => {
  // variable and function declaration of the react-media-recorder package
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true }); // using only the audio recorder here
  // this state variable keeps track of the play/pause state of the recorded audio
  const [isRecordedAudioPlaying, setIsRecordedAudioPlaying] = useState(false);
  // this state variable is updated whenever mediaBlobUrl is updated. i.e. whenever a new recording is created
  const [audio, setAudio] = useState('');

  useEffect(() => {
    // following statements execute whenever mediaBlobUrl is updated.. used it in the dependency array
    if (mediaBlobUrl !== null) {
      setAudio(new Audio(mediaBlobUrl));
    }
  }, [mediaBlobUrl]);

  // function for toggling play pause functionality of the recorded audio
  const handlePlayPauseRecordedAudio = () => {
    if (isRecordedAudioPlaying) {
      audio.pause();
      setIsRecordedAudioPlaying(false);
    } else {
      audio.play();
      setIsRecordedAudioPlaying(true);
      // this is for setting setIsRecordedAudioPlaying variable to false, once the playback is completed.
      audio.addEventListener('ended', function () {
        setIsRecordedAudioPlaying(false);
      });
    }
  };

  return (
    <div className="edit-component text-white">
      <div className="d-flex justify-content-around align-items-center">
        <div className="w-50 mt-1">
          <h6 className="text-white">Visual Description:</h6>
          <div className="d-flex justify-content-around align-items-center">
            <textarea
              className="form-control form-control-sm border rounded text-center description-textarea"
              rows="2"
              id="description"
              name="description"
              // defaultValue="a car driving down a street next to a tree and a sign that is on the side of the car."
              value={props.clip_description_text}
            ></textarea>
            <div className="edit-time-div">
              <input
                className="text-white bg-dark edit-time-input text-center"
                type="text"
                // defaultValue="00:01:20"
                value={convertSecondsToCardFormat(props.clip_start_time)}
                readOnly
              />
            </div>
          </div>
          <div className="my-2 d-flex justify-content-around align-items-center w-75">
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

            <button
              type="button"
              className="btn rounded btn-sm primary-btn-color text-white"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Play this Description"
            >
              <i className="fa fa-play" /> {'  '} Play
            </button>
          </div>
        </div>
        <div>
          <div className="bg-white rounded text-dark d-flex justify-content-between align-items-center p-2 w-100 my-2">
            <h6>Click to Record{/* <p>- {status}</p> */}</h6>
            <div className="mx-1">
              {status === 'recording' ? (
                <button
                  type="button"
                  className="btn rounded btn-sm mx-auto border bg-light"
                  onClick={stopRecording} // default functions given by the react-media-recorder package
                >
                  <i className="fa fa-stop text-danger" />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn rounded btn-sm mx-auto border bg-light"
                  onClick={startRecording} // default functions given by the react-media-recorder package
                >
                  <i className="fa fa-microphone text-danger" />
                </button>
              )}
            </div>
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
            ) : isRecordedAudioPlaying ? (
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
          <div className="d-flex justify-content-center align-items-center w-50 rounded mx-auto p-1">
            <button
              type="button"
              className="btn rounded btn-sm text-white primary-btn-color"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="YouTube Video plays/pauses along with the Audio Description"
            >
              <i className="fa fa-play play-pause-icons" />
              <i className="fa fa-pause play-pause-icons" />
              {'  '} Play/Pause Video
            </button>
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
