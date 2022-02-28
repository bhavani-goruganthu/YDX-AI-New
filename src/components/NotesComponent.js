import React, { useState } from 'react';
import '../assets/css/editAudioDesc.css';
import '../assets/css/notes.css';

const Notes = () => {
  const n = 8;
  return (
    <div className="notes-bg">
      <div className="d-flex justify-content-between align-items-center pt-1 px-3">
        <h6 className="text-white">Notes:</h6>
        <h6 className="text-white mx-4">Timestamp:</h6>
      </div>
      {/* <div className="mx-auto my-auto notes-textarea align-items-center border rounded">
        <textarea
          className="form-control border rounded"
          style={{ resize: 'none' }}
          rows="7"
          id="notes"
          name="notes"
        ></textarea>
      </div> */}
      <div className="mx-auto notes-textarea border rounded">
        {[...Array(n)].map((elementInArray, index) => (
          <div className="d-flex justify-content-around align-items-center">
            <p className="mt-1">{index + 1}:</p>
            <textarea
              className="form-control border rounded"
              style={{ resize: 'none', width: '70%' }}
              rows="1"
              id="notes"
              name="notes"
            />
            <input className="form-control border" style={{ width: '25%' }} />
          </div>
        ))}
      </div>
      <div className="d-flex text-center justify-content-around align-items-center">
        <p className="mt-1 text-white">Add Note:</p>
        <textarea
          className="form-control border rounded"
          style={{ resize: 'none', width: '70%' }}
          rows="1"
          id="notes"
          name="notes"
        />
        <button
          type="button"
          className="btn rounded btn-md text-white primary-btn-color notes-save-btn"
        >
          <i className="fa fa-save" /> {'  '} Save
        </button>
      </div>
    </div>
  );
};

export default Notes;
