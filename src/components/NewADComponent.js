import React, { useState, useEffect } from 'react';
import '../assets/css/audioDesc.css';
import '../assets/css/editAudioDesc.css';

const NewADComponent = (props) => {
  // destructuring props
  let showInlineAdComponent = props.showInlineAdComponent;
  let setShowAdComponent = props.setShowAdComponent;

  // state variables - for new AD
  const [newADTitle, setNewADTitle] = useState('');

  const handleCloseNewAD = () => {
    setShowAdComponent(false);
  };

  useEffect(() => {
    // scroll to the bottom of the screen and make the Inline AD component visible
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

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
      <div className="d-flex justify-content-evenly align-items-center">
        {/* Inline or Extended Radio Button */}
        <div className="">
          {showInlineAdComponent ? (
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
          <h6 className="text-white fw-bolder">Title:</h6>
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
          <h6 className="text-white fw-bolder">Type:</h6>
          <select
            className="form-select form-select-sm text-center mx-2"
            aria-label="Select the type of new AD"
            required
            defaultValue={'nonOCR'}
          >
            <option value="nonOCR">Visual</option>
            <option value="OCR">Text on Screen</option>
          </select>
        </div>
        {/* Start Time Div */}
        <div className="d-flex justify-content-evenly align-items-center">
          <h6 className="text-white fw-bolder">Start Time:</h6>
          <div className="edit-time-div mx-2">
            <div className="text-dark text-center d-flex justify-content-evenly">
              <input
                type="number"
                style={{ width: '25px' }}
                className="text-white bg-dark"
                min="0"
                onKeyDown={(evt) =>
                  ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                }
              />
              <div className="mx-1">:</div>
              <input
                type="number"
                style={{ width: '25px' }}
                className="text-white bg-dark"
                onKeyDown={(evt) =>
                  ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                }
              />
              <div className="mx-1">:</div>
              <input
                type="number"
                style={{ width: '25px' }}
                className="text-white bg-dark"
                onKeyDown={(evt) =>
                  ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                }
              />
            </div>
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

export default NewADComponent;
