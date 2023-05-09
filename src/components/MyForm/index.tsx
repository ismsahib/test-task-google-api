import React, { ChangeEvent, Dispatch, FC, FormEvent, useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

import MyModal from "../MyModal";
import { Data } from "@root/interfaces";
import { generateData } from "@root/utils/generateData";
import { generateDocx } from "@root/utils/generateDocx";
import { checkLink } from "@root/utils/validate";

interface MyForm {
  disabled: boolean;
  accessToken: string;
}

const MyForm: FC<MyForm> = ({ disabled, accessToken }) => {
  const [modalShow, setModalShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loadingFile, setLoadingFile] = useState(false);

  const [data, setData] = useState<Data>({ status: "loading" }); // данные для предпросмотра и скачки файла

  const [inputValue, setInputValue] = useState({
    googleSheetsLink: "",
    googleDocsLink: "",
  });

  const inputValidate = () => {
    return checkLink(inputValue.googleDocsLink, "docs") && checkLink(inputValue.googleSheetsLink, "sheets");
  };

  //получение данных из документов и занесение их в главный стейт

  const fetchData = async (setState: Dispatch<React.SetStateAction<boolean>>) => {
    //если ссылки верного формата, открывается или модальное окно, или начинается формирование файла, иначе алерт с ошибкой

    if (inputValidate()) {
      setState(true);

      //формирование данных из документов

      const generateDataResponse = await generateData(
        inputValue.googleSheetsLink,
        inputValue.googleDocsLink,
        accessToken
      );

      //обработка ошибок при запросах

      const error = generateDataResponse.docsError.length || generateDataResponse.errorGoogleSheets;

      if (error) {
        if (generateDataResponse.docsError.length) setAlertMessage(generateDataResponse.docsError);
        if (generateDataResponse.errorGoogleSheets) setAlertMessage(generateDataResponse.errorGoogleSheets);
      }

      // внесение данных в главный стейт

      setData({
        status: error ? "error" : "success",
        generateData: generateDataResponse,
      });
    } else setAlertMessage("Неправильный формат ссылок!");
  };

  //скачка файла
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(setLoadingFile);
  };

  //изменение состояний инпутов
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
  // если была нажата кнопка получения файла, генерируется docx файл и отправляется на скачку
  useEffect(() => {
    if (data.status === "success" && data.generateData && loadingFile) {
      generateDocx(data.generateData);
      setLoadingFile(false);
    }
  }, [data, loadingFile]);

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
              <Button variant="primary" onClick={() => fetchData(setModalShow)}>
                Предварительный просмотр
              </Button>
              <Button variant="primary" type="submit">
                {loadingFile && (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-3" />
                )}
                Получить файл
              </Button>
            </div>
          </div>
        </fieldset>
      </Form>
      {!!alertMessage.length && (
        <Alert variant="danger" onClose={() => setAlertMessage("")} dismissible>
          {alertMessage}
        </Alert>
      )}
      <MyModal modalShow={modalShow} setModalShow={setModalShow} data={data} />
    </>
  );
};

export default MyForm;
