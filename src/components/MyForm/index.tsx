import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

import MyModal from "../MyModal";
import { checkLink } from "@root/utils/validate";

interface MyForm {
  disabled: boolean;
}
const MyForm: FC<MyForm> = ({ disabled }) => {
  const [modalShow, setModalShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  const [inputValue, setInputValue] = useState({
    googleSheetsLink: "",
    googleDocsLink: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertShow(!(checkLink(inputValue.googleDocsLink, "docs") && checkLink(inputValue.googleSheetsLink, "sheets")));
  };

  const onchangeValue = (scope: string) => (e: ChangeEvent<HTMLInputElement>) => {
    switch (scope) {
      case "sheets":
        setInputValue((prev) => ({ ...prev, googleSheetsLink: e.target.value }));
        break;
      case "docs":
        setInputValue((prev) => ({ ...prev, googleDocsLink: e.target.value }));
        break;
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={disabled}>
          <Form.Group className="mb-3" controlId="formGoogleSheetsLink">
            <Form.Label>Таблица с данными:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ссылка на Google Sheets"
              value={inputValue.googleSheetsLink}
              onChange={onchangeValue("sheets")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGoogleDocsLink">
            <Form.Label>Шаблон:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ссылка на Google Docs"
              value={inputValue.googleDocsLink}
              onChange={onchangeValue("docs")}
            />
          </Form.Group>
          <div className="mb-3 d-flex justify-content-end">
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
      {alertShow && (
        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
          Неправильный формат ссылок!
        </Alert>
      )}
      <MyModal modalShow={modalShow} setModalShow={setModalShow} />
    </>
  );
};

export default MyForm;
