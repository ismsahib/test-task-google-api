import React, { Dispatch, FC } from "react";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";

import HtmlView from "../HtmlView";
import { Data } from "@root/interfaces";

interface MyModalProps {
  modalShow: boolean;
  setModalShow: Dispatch<React.SetStateAction<boolean>>;
  data: Data;
}
const MyModal: FC<MyModalProps> = ({ modalShow, setModalShow, data }) => {
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Предварительный просмотр документа</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        {data.status === "loading" && <Spinner animation="border" />}
        {data.status === "error" && (
          <Alert variant="danger">
            {data.generateData?.docsError}
            {data.generateData?.errorGoogleSheets}
          </Alert>
        )}
        {data.status === "success" && !!data.generateData && <HtmlView data={data.generateData} />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
