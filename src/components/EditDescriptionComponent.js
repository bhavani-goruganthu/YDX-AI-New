import React, { useState } from 'react';
import '../assets/css/editAudioDesc.css';

const EditDescriptionComponent = () => {
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
              value="a car driving down a street next to a tree and a sign that is on the side of the car."
            ></textarea>
            <button
              type="button"
              className="btn rounded btn-sm text-white bg-dark"
            >
              02:03:20:00
            </button>
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
            >
              <i className="fa fa-play" /> {'  '} Play
            </button>
          </div>
        </div>
        <div>
          <div className="bg-white rounded text-dark d-flex justify-content-between align-items-center p-2 w-100 my-2">
            <h6>Click to Record</h6>
            <div className="mx-1">
              <button
                type="button"
                className="btn rounded btn-sm mx-auto border bg-light"
              >
                <i className="fa fa-microphone text-danger" />
              </button>
            </div>
            <button
              type="button"
              className="btn rounded btn-sm text-white primary-btn-color mx-3"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Listen to your recording"
            >
              Listen
            </button>
            <button
              type="button"
              className="btn rounded btn-sm text-white primary-btn-color"
            >
              Replace
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center bg-white w-50 rounded mx-auto p-1">
            <button
              type="button"
              className="btn rounded btn-sm text-white primary-btn-color"
            >
              <i className="fa fa-play play-pause-icons" />
              <i className="fa fa-pause play-pause-icons" /> {'  '} Play/Pause
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDescriptionComponent;
