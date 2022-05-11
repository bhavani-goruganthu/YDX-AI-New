import React, { useState, useEffect } from 'react';
import '../assets/css/insertPublish.css';
import '../assets/css/audioDesc.css';
import NewAudioClipComponent from './NewAudioClipComponent';

const InsertPublishComponent = (props) => {
  // destructuring props
  const currentTime = props.currentTime;
  const [showInlineACComponent, setShowInlineACComponent] = useState(false);
  const [showNewACComponent, setShowNewACComponent] = useState(false);
  const handleClickInsertInline = (e) => {
    e.preventDefault();
    setShowNewACComponent(true);
    setShowInlineACComponent(true);
  };

  const handleClickInsertExtended = (e) => {
    e.preventDefault();
    setShowNewACComponent(true);
    setShowInlineACComponent(false);
  };

  return (
    <React.Fragment>
      <hr />
      {showNewACComponent ? (
        <>
          <h5 className="text-white">
            Insert New {showInlineACComponent ? 'Inline' : 'Extended'} Audio
            Clip
          </h5>
          <NewAudioClipComponent
            showInlineACComponent={showInlineACComponent}
            setShowNewACComponent={setShowNewACComponent}
            currentTime={currentTime}
          />
        </>
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-between my-3">
        <div>
          <button
            type="button"
            className="btn inline-bg text-dark"
            onClick={handleClickInsertInline}
          >
            <i className="fa fa-plus" /> {'   '}
            Insert New Inline
          </button>
          <button
            type="button"
            className="btn mx-5 extended-bg text-white"
            onClick={handleClickInsertExtended}
          >
            <i className="fa fa-plus" /> {'   '}
            Insert New Extended
          </button>
        </div>
        <div className="mx-4">
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
    </React.Fragment>
  );
};

export default InsertPublishComponent;
