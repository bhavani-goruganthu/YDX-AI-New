import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../assets/css/insertPublish.css';
import '../assets/css/audioDesc.css';
import NewADComponent from './NewADComponent';

const InsertPublishComponent = (props) => {
  const [showInlineAdComponent, setInlineAdComponent] = useState(false);
  const [showExtendedAdComponent, setExtendedAdComponent] = useState(false);
  const [showAdComponent, setShowAdComponent] = useState(false);
  const handleClickInsertInline = (e) => {
    e.preventDefault();
    setShowAdComponent(true);
    setInlineAdComponent(true);
    setExtendedAdComponent(false);
  };

  const handleClickInsertExtended = (e) => {
    e.preventDefault();
    setShowAdComponent(true);
    setInlineAdComponent(false);
    setExtendedAdComponent(true);
  };

  return (
    <React.Fragment>
      <hr />
      {showAdComponent ? (
        <NewADComponent
          showInlineAdComponent={showInlineAdComponent}
          //   showExtendedAdComponent={showExtendedAdComponent}
          setShowAdComponent={setShowAdComponent}
        />
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-between my-2">
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
