import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import MyModal from "../MyModal";

const MyForm = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Form>
        <fieldset disabled={false}>
          <Form.Group className="mb-3" controlId="formGoogleSheetsLink">
            <Form.Label>Ссылка на Google Sheets:</Form.Label>
            <Form.Control type="text" placeholder="Enter link" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGoogleDocsLink">
            <Form.Label>Ссылка на Google Docs:</Form.Label>
            <Form.Control type="text" placeholder="Enter link" />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <div className="d-flex flex-column gap-3 col-md-3">
              <Button variant="primary" onClick={() => setModalShow(true)}>
                Предпросмотр
              </Button>
              <Button variant="primary" type="submit">
                Скачать
              </Button>
            </div>
          </div>
        </fieldset>
      </Form>
      <MyModal modalShow={modalShow} setModalShow={setModalShow} />
    </>
  );
};

export default MyForm;
