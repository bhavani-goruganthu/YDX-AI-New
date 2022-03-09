import React, { useState } from 'react';
import '../assets/css/editAudioDesc.css';
import '../assets/css/notes.css';

const Notes = () => {
  // const n = 8;

  const [noteValue, setNoteValue] = useState(''); // to store Notes
  // this function handles keyUp event in the Notes textarea -> whenever an enter key is hit,
  // a timestamp is inserted in the Notes
  const handleNewNoteLine = (e) => {
    const tempNoteValue = noteValue;
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === parseInt('13')) {
      setNoteValue(tempNoteValue + '02:00:23:01 - ');
    }
  };
  // for focus event of Notes Textarea -> if the notes is empty, timestamp is inserted
  const handleTextAreaFocus = (e) => {
    let tempNoteValue = noteValue;
    if (noteValue === '') {
      setNoteValue(tempNoteValue + '02:00:22:01 - ');
    }
    // TODO: what if notes is not empty
  };

  return (
    <div className="notes-bg">
      <div className="d-flex justify-content-between align-items-center pt-1 px-3">
        <h6 className="text-white">Notes:</h6>
        {/* <h6 className="text-white mx-4">Timestamp:</h6> */}
      </div>
      <div className="mx-auto my-auto notes-textarea-div align-items-center border rounded">
        <textarea
          className="form-control border rounded notes-textarea"
          rows="8"
          id="notes"
          name="notes"
          placeholder="Start taking your Notes.."
          onFocus={handleTextAreaFocus}
          onKeyUp={handleNewNoteLine}
          onChange={(e) => setNoteValue(e.target.value)}
          value={noteValue}
        ></textarea>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <button
          type="button"
          className="btn rounded btn-md text-white primary-btn-color notes-save-btn mx-auto"
        >
          <i className="fa fa-save" /> {'  '} Save
        </button>
      </div>

      {/* code to get multiple sections of notes */}
      {/* <div className="mx-auto notes-textarea border rounded">
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
      </div> */}
    </div>
  );
};

export default Notes;
