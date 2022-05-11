import React, { useState, useEffect } from 'react';
import '../assets/css/audioDesc.css';
import '../assets/css/editAudioDesc.css';
import convertSecondsToCardFormat from '../helperFunctions/convertSecondsToCardFormat';

const NewAudioClipComponent = (props) => {
  // destructuring props
  let showInlineACComponent = props.showInlineACComponent;
  let setShowNewACComponent = props.setShowNewACComponent;
  const currentTime = props.currentTime;
  const videoLength = props.videoLength;

  // state variables - for new AD
  const [newADTitle, setNewADTitle] = useState('');
  const [newADType, setNewADType] = useState('nonOCR'); // default for Visual

  // use 3 state variables to hold the value of 3 input type number fields
  const [clipStartTimeHours, setClipStartTimeHours] = useState(
    convertSecondsToCardFormat(currentTime).split(':')[0]
  );
  const [clipStartTimeMinutes, setClipStartTimeMinutes] = useState(
    convertSecondsToCardFormat(currentTime).split(':')[1]
  );
  const [clipStartTimeSeconds, setClipStartTimeSeconds] = useState(
    convertSecondsToCardFormat(currentTime).split(':')[2]
  );
  const [showStartTimeError, setShowStartTimeError] = useState(false);

  // timeout for the alert
  if (showStartTimeError) {
    setTimeout(() => {
      setShowStartTimeError(false);
    }, 4000);
  }

  useEffect(() => {
    // scroll to the bottom of the screen and make the Inline AD component visible
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  // calculate the Start Time in seconds from the Hours, Minutes & Seconds passed from handleBlur functions
  const calculateClipStartTimeinSeconds = (hours, minutes, seconds) => {
    let calculatedSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds;
    // check if the updated start time is more than the videolength, if yes, throw error and retain the old state
    if (calculatedSeconds > videoLength) {
      setShowStartTimeError(true);
      setClipStartTimeHours(
        convertSecondsToCardFormat(currentTime).split(':')[0]
      );
      setClipStartTimeMinutes(
        convertSecondsToCardFormat(currentTime).split(':')[1]
      );
      setClipStartTimeSeconds(
        convertSecondsToCardFormat(currentTime).split(':')[2]
      );
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

  const handleCloseNewAD = () => {
    setShowNewACComponent(false);
  };

  return (
    <div className="text-white component mt-2 rounded border border-1 border-white mx-5 d-flex flex-column pb-3 justify-content-between">
      {/* close icon to the top right */}
      <div className="mx-2 text-end">
        <i
          className="fa fa-close fs-4 close-icon "
          onClick={handleCloseNewAD}
        ></i>
      </div>
      {/* div for radio button, title, type, start time */}
      <div className="d-flex justify-content-evenly align-items-start">
        {/* Inline or Extended Radio Button */}
        <div className="">
          {showInlineACComponent ? (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="radio1"
                value="inline"
                defaultChecked
              />
              <div className="inline-bg text-dark inline-extended-radio px-2">
                <label className="inline-extended-label">Inline</label>
              </div>
            </div>
          ) : (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="radio2"
                value="extended"
                defaultChecked
              />
              <div className="extended-bg text-white inline-extended-radio px-2">
                <label className="inline-extended-label">Extended</label>
              </div>
            </div>
          )}
        </div>
        {/* Title Text box div */}
        <div className="d-flex justify-content-evenly align-items-center">
          <h6 className="text-white fw-bolder mb-0">Title:</h6>
          <input
            type="text"
            className="form-control form-control-sm text-center mx-2"
            placeholder="Title goes here.."
            value={newADTitle}
            onChange={(e) => setNewADTitle(e.target.value)}
          />
        </div>
        {/* type dropdown div */}
        <div className="d-flex justify-content-evenly align-items-center">
          <h6 className="text-white fw-bolder mb-0">Type:</h6>
          <select
            className="form-select form-select-sm text-center mx-2"
            aria-label="Select the type of new AD"
            required
            defaultValue={'nonOCR'}
            onChange={(e) => setNewADType(e.target.value)}
          >
            <option value="nonOCR">Visual</option>
            <option value="OCR">Text on Screen</option>
          </select>
        </div>
        {/* Start Time Div */}
        <div className="d-flex justify-content-evenly flex-column align-items-center">
          <div className="d-flex justify-content-evenly align-items-center">
            <h6 className="text-white fw-bolder mx-2">Start Time:</h6>
            <div className="edit-time-div mx-auto">
              <div className="text-dark text-center d-flex justify-content-evenly">
                <input
                  type="number"
                  style={{ width: '25px', height: '28px' }}
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
                  style={{ width: '25px', height: '28px' }}
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
                  style={{ width: '25px', height: '28px' }}
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
          <div>
            {showStartTimeError ? (
              <div className="bg-white rounded p-1 mb-1 text-center">
                <h6 className="text-danger small mb-0">
                  <i
                    className="fa fa-exclamation-circle"
                    aria-hidden="true"
                  ></i>{' '}
                  Start Time cannot be later than the video end time
                </h6>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <hr className="m-2" />
      {/* div below hr to enter description / record audio */}
      <div className="d-flex justify-content-evenly align-items-start">
        <div className="d-flex justify-content-center align-items-start flex-column">
          <h6 className="text-white">Add New Clip Description:</h6>
          <textarea
            className="form-control form-control-sm border rounded text-center description-textarea"
            rows="2"
            id="description"
            name="description"
          ></textarea>
        </div>
        {/* vertical divider line */}
        <div className="d-flex flex-column align-items-center">
          <h6>Or</h6>
          <div
            className="vertical-divider-div"
            style={{ height: '65px' }}
          ></div>
        </div>
        {/* Recording Div */}
        <div>
          <h6 className="text-white text-center">Record New Audio Clip</h6>
          <div className="bg-white rounded text-dark d-flex justify-content-between align-items-center p-2 w-100 my-2">
            <div className="mx-1">
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Click to Start Recording your voice"
                type="button"
                className="btn rounded btn-sm mx-auto border border-warning bg-light"
              >
                <i className="fa fa-microphone text-danger" />
              </button>
            </div>
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
          </div>
        </div>
      </div>
      <hr className="m-2" />
      {/* Save New AD Button */}
      <div className="text-center mt-1">
        <button
          type="button"
          className="btn rounded btn-sm text-white save-desc-btn"
        >
          <i className="fa fa-save" /> {'  '} Save
        </button>
      </div>
    </div>
  );
};

export default NewAudioClipComponent;
