import React, { Dispatch, FC } from "react";
import { Button, Modal } from "react-bootstrap";

interface MyModalProps {
  modalShow: boolean;
  setModalShow: Dispatch<React.SetStateAction<boolean>>;
}
const MyModal: FC<MyModalProps> = ({ modalShow, setModalShow }) => {
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
