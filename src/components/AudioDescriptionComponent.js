import React, { useState } from 'react';
import '../assets/css/audioDesc.css';
import EditDescriptionComponent from './EditDescriptionComponent';

const AudioDescriptionComponent = () => {
  // toggle variable to show or hide the edit component.
  const [showEditComponent, setShowEditComponent] = useState(false);
  return (
    <React.Fragment>
      {/* React Fragments allow you to wrap or group multiple elements without adding an extra node to the DOM. */}
      <div className="text-white component mt-2 rounded">
        <div className="row align-items-center">
          <div className="col-2 component-column-width-1">
            <div className="mx-1 text-center">
              <p>Audio Desc 1</p>
              <input
                type="text"
                className="form-control form-control-sm ad-title-input text-center"
                placeholder="Title goes here.."
              />
              <h6 className="mt-1 text-white">Type - Visual</h6>
            </div>
          </div>
          <div className="col-1 component-column-width-2">
            <div className="nudge-btns-div d-flex justify-content-around align-items-center">
              <i className="fa fa-arrow-left p-2 nudge-icons" />
              <i className="fa fa-arrow-right p-2 nudge-icons" />
            </div>
          </div>
          <div className="col-8 component-column-width-3">
            <div className="row component-timeline-div" />
            <div className="mx-5 mt-2">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                  checked
                />
                <label className="form-check-label" labelFor="inlineRadio1">
                  <div className="inline-bg text-dark inline-extended-radio px-2">
                    <h6 className="inline-extended-label">Inline</h6>
                  </div>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                />
                <label className="form-check-label" labelFor="inlineRadio2">
                  <div className="extended-bg text-white inline-extended-radio px-2">
                    <h6 className="inline-extended-label">Extended</h6>
                  </div>
                </label>
              </div>
            </div>
          </div>
          {/* toggle the chevron to show or hide the edit Description component */}
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
      {showEditComponent ? <EditDescriptionComponent /> : <> </>}
    </React.Fragment>
  );
};
export default AudioDescriptionComponent;
