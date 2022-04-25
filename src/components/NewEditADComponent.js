import React, { useState, useEffect } from 'react';
import '../assets/css/audioDesc.css';

const NewEditADComponent = () => {
  return (
    <div className="edit-component text-white">
      <div className="d-flex justify-content-evenly align-items-center">
        <div className="description-section mt-1">
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex justify-content-center align-items-start flex-column">
              <h6 className="text-white">Description:</h6>
              <textarea
                className="form-control form-control-sm border rounded text-center description-textarea"
                rows="2"
                id="description"
                name="description"
                // defaultValue={clip_description_text}
                // value={clipDescriptionText}
                // onChange={handleClipDescriptionUpdate}
              ></textarea>
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
                  //   onClick={handleClickSaveDescription}
                >
                  <i className="fa fa-save" /> {'  '} Save
                </button>

                <button
                  type="button"
                  className="btn rounded btn-sm primary-btn-color text-white"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Play this Description"
                  //   onClick={handlePlayPauseAdAudio}
                >
                  <i className="fa fa-play" /> {'  '} Play
                </button>
              </div>
            </div>
            <div className="mx-2 d-flex justify-content-between align-items-center flex-column">
              <h6 className="text-white">Start Time</h6>
              <div className="edit-time-div">
                <div className="text-dark text-center d-flex justify-content-evenly">
                  <input
                    type="number"
                    style={{ width: '25px' }}
                    className="text-white bg-dark"
                    min="0"
                    // value={clipStartTimeHours}
                    // onChange={handleOnChangeClipStartTimeHours}
                    // onBlur={handleBlurClipStartTimeHours}
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
                    // value={clipStartTimeMinutes}
                    // onChange={handleOnChangeClipStartTimeMinutes}
                    // onBlur={handleBlurClipStartTimeMinutes}
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
                    // value={clipStartTimeSeconds}
                    // onChange={handleOnChangeClipStartTimeSeconds}
                    // onBlur={handleBlurClipStartTimeSeconds}
                    onKeyDown={(evt) =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vertical-divider-div"></div>
        <div>
          <h6 className="text-white text-center">
            Record & Replace AI's voice
          </h6>
          <div className="bg-white rounded text-dark d-flex justify-content-between align-items-center p-2 w-100 my-2">
            <div className="mx-1">
              {/* {status === 'recording' ? (
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
              ) : ( */}
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Click to Start Recording your voice"
                type="button"
                className="btn rounded btn-sm mx-auto border border-warning bg-light"
                // onClick={startRecording} // default functions given by the react-media-recorder package
              >
                <i className="fa fa-microphone text-danger" />
              </button>
              {/* )} */}
            </div>
            {/* No recording to Play */}
            {/* {mediaBlobUrl === null ? (
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
            ) : isRecordedAudioPlaying ? ( //Listen to your recording */}
            <>
              <button
                type="button"
                className="btn rounded btn-sm text-white primary-btn-color mx-3"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Listen to your recording"
                // onClick={handlePlayPauseRecordedAudio} // toggle function for play / pause
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
            {/* ) : ( */}
            {/* <>
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
            )} */}
          </div>
          <div className="d-flex justify-content-center align-items-center rounded mx-auto p-1">
            {/* {isYoutubeVideoPlaying ? (
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
            ) : ( */}
            <button
              type="button"
              className="btn rounded btn-sm text-white primary-btn-color"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="YouTube Video plays/pauses along with the Audio Descriptions"
              //   onClick={handlePlayPauseYouTubeVideo}
            >
              <i className="fa fa-play play-pause-icons" />
              {'  '} Play Video with AD
            </button>
            {/* )} */}
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

export default NewEditADComponent;
