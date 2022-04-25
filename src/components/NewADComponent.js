import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import '../assets/css/audioDesc.css';
import NewEditADComponent from './NewEditADComponent';

const NewADComponent = (props) => {
  // destructuring props
  let showInlineAdComponent = props.showInlineAdComponent;
  //   let showExtendedAdComponent = props.showExtendedAdComponent;
  let setShowAdComponent = props.setShowAdComponent;

  // toggle variable to show or hide the edit component.
  const [showEditComponent, setShowEditComponent] = useState(false);

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
    <React.Fragment>
      <div className="text-white component mt-2 rounded border border-1 border-white">
        <div className="mx-2 d-flex justify-content-between align-items-center">
          <h5 className="text-white">
            Insert New {showInlineAdComponent ? 'Inline' : 'Extended'} AD
          </h5>
          <i
            className="fa fa-close fs-4 close-icon"
            onClick={handleCloseNewAD}
          ></i>
        </div>
        <div className="row align-items-center">
          <div className="col-2 component-column-width-1">
            <div className="mx-1 text-center">
              <p className="ad-title">Audio Description:</p>
              <input
                type="text"
                className="form-control form-control-sm ad-title-input text-center"
                placeholder="Title goes here.."
                defaultValue="Dom Deem Dishum"
                // value={clipTitle}
                // onChange={handleClipTitleUpdate}
              />
              <h6 className="mt-1 text-white">
                <b>Type: </b>
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
                // onClick={handleLeftNudgeClick}
              />
              <i
                className="fa fa-chevron-right p-2 nudge-icons"
                // onClick={handleRightNudgeClick}
              />
            </div>
          </div>
          <div className="col-8 component-column-width-3">
            <div className="row component-timeline-div">
              <div id="ad-draggable-div" className="ad-draggable-div">
                <Draggable
                  axis="x"
                  defaultPosition={{ x: 0, y: 0 }}
                  //   position={adDraggablePosition}
                  //   onStop={stopADBar}
                  bounds="parent"
                >
                  <div
                    className="ad-timestamp-div"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="dom"
                  ></div>
                </Draggable>
              </div>
            </div>
            <div className="mx-5 mt-2">
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
      {showEditComponent ? <NewEditADComponent /> : <> </>}
    </React.Fragment>
  );
};

export default NewADComponent;
