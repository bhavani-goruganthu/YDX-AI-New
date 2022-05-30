import React from 'react';

const Modal = (props) => {
  const modalId = props.id;
  const modalTitle = props.title;
  const modalText = props.text;
  const modalTask = props.modalTask;

  return (
    <div className="modal fade text-dark" id={modalId}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content mx-auto w-75">
          {/* <!-- Modal Header --> */}
          <div className="modal-header">
            <h4 className="modal-title">{modalTitle}</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="modal-body text-center">{modalText}</div>
          {/* <!-- Modal footer --> */}
          <div className="modal-footer d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn primary-btn-color text-center m-1 text-white"
              data-dismiss="modal"
              onClick={(e) => {
                modalTask(e);
              }}
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
  );
};

export default Modal;
