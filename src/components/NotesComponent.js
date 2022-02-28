import React, { useState } from 'react';
import '../assets/css/editAudioDesc.css';
import '../assets/css/notes.css';

const Notes = () => {
  return (
    <div className="notes-bg">
      <div className="my-auto align-items-center pt-1 px-3">
        <h6 className="text-white">Notes:</h6>
      </div>
      <div className="mx-auto my-auto notes-textarea align-items-center border rounded">
        <textarea
          className="form-control border rounded"
          style={{ resize: 'none' }}
          rows="7"
          id="notes"
          name="notes"
        ></textarea>
      </div>
      <div className="mx-auto text-center mt-2">
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
