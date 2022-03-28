import React, { useState } from 'react';
import '../assets/css/editAudioDesc.css';
import '../assets/css/notes.css';

const Notes = ({ currentTime }) => {
  const [noteValue, setNoteValue] = useState(''); // to store Notes
  // this function handles keyUp event in the Notes textarea -> whenever an enter key is hit,
  // a timestamp is inserted in the Notes
  const handleNewNoteLine = (e) => {
    const tempNoteValue = noteValue;
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === parseInt('13')) {
      setNoteValue(tempNoteValue + currentTime + ' - ');
    }
  };
  // for focus event of Notes Textarea -> if the notes is empty, timestamp is inserted
  const handleTextAreaFocus = (e) => {
    let tempNoteValue = noteValue;
    if (noteValue === '') {
      setNoteValue(tempNoteValue + currentTime + ' - ');
    }
    // TODO: what if notes is not empty
  };

  return (
    <div className="notes-bg">
      <div className="d-flex justify-content-between align-items-center pt-1 px-3 notes-label">
        <h6 className="text-white">Notes:</h6>
      </div>
      <div className="mx-auto my-auto notes-textarea-div align-items-center border rounded">
        <textarea
          className="form-control border rounded notes-textarea"
          rows="10"
          id="notes"
          name="notes"
          placeholder="Start taking your Notes.."
          onFocus={handleTextAreaFocus}
          onKeyUp={handleNewNoteLine}
          onChange={(e) => setNoteValue(e.target.value)}
          value={noteValue}
        ></textarea>
      </div>
    </div>
  );
};

export default Notes;
