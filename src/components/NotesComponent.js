import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../assets/css/editAudioDesc.css';
import '../assets/css/notes.css';

const Notes = ({ currentTime, videoId }) => {
  // React State Variables
  const [noteValue, setNoteValue] = useState(''); // to store Notes
  const [noteDetails, setNoteDetails] = useState([]); // to store Notes Details

  // this function handles keyUp event in the Notes textarea -> whenever an enter key is hit,
  // a timestamp is inserted in the Notes
  const handleNewNoteLine = (e) => {
    const tempNoteValue = noteValue;
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === parseInt('13')) {
      setNoteValue(tempNoteValue + currentTime + ' - ');
      handleNoteAutoSave(tempNoteValue + currentTime + ' - ');
    }
  };
  // for focus event of Notes Textarea -> if the notes is empty, timestamp is inserted
  const handleTextAreaFocus = (e) => {
    let tempNoteValue = noteValue;
    if (noteValue === '') {
      setNoteValue(tempNoteValue + currentTime + ' - ');
      handleNoteAutoSave(tempNoteValue + currentTime + ' - ');
    }
    // TODO: what if notes is not empty
  };

  const handleNoteChange = (e) => {
    setNoteValue(e.target.value);
    handleNoteAutoSave(e.target.value);
  };

  const handleNoteAutoSave = (currentNoteValue) => {
    axios
      .post('http://localhost:4000/api/notes/post-note', {
        adId: videoId,
        notes: currentNoteValue,
      })
      .then((res) => {
        // console.log(res.data);
      });
  };

  const handleNoteHighlight = () => {
    let noteList = noteValue.split(/\r?\n/);
    let tempNoteDetails = [];
    noteList.forEach((note, key) => {
      if (note.slice(0, 8).match(/\d{2}:\d{2}:\d{2}/)) {
        const noteTimestamp = {
          id: key,
          note: note.slice(11), // assuming user wouldn't mess with the format of the note text
          time: note.slice(0, 8),
        };
        tempNoteDetails.push(noteTimestamp);
        console.log(tempNoteDetails);
        setNoteDetails(tempNoteDetails);
      }
      // else {
      //   alert(
      //     'Please check the format of the note (Timestamp should have only numbers)'
      //   );
      // }
    });
  };

  useEffect(() => {
    // fetch notes from backend API
    axios
      .get(`http://localhost:4000/api/notes/get-note-byAdId/${videoId}`)
      .then((res) => {
        // console.log(res.data);
        setNoteValue(res.data.notes_text);
      });
  }, [videoId]);

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
          onChange={handleNoteChange}
          value={noteValue}
        ></textarea>
      </div>
    </div>
  );
};

export default Notes;
