import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ButtonDefault from "../buttons/ButtonDefault";
const MODAL_STATUSES = {
  CLOSE: "CLOSE",
  COMPLETE: "COMPLETE"
};
const ModalDefault = props => (
  <Modal
    show={props.show}
    onHide={() => props.callbackHandler(MODAL_STATUSES.CLOSE)}
    animation={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>{props.heading}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.body}</Modal.Body>
    <Modal.Footer>
      <Button
        variant="secondary"
        onClick={() => props.callbackHandler(MODAL_STATUSES.CLOSE)}
      >
        Close
      </Button>
      <ButtonDefault
        className="btn btn-default"
        variant="primary"
        onClick={() => {
          props.callbackHandler(MODAL_STATUSES.COMPLETE, props.type);
        }}
      >
        {props.positiveButton}
      </ButtonDefault>
    </Modal.Footer>
  </Modal>
);

export default ModalDefault;
export { MODAL_STATUSES };
