import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultIsBetaUser from "./ResultIsBetaUser";

const IsBetaUser = () => {
  const [fiid, setFiid] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isBeta, setIsBeta] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setIsBeta(false);
  }, []);

  const [values, setValues] = useState({
    fiid: "",
    documentType: "",
    documentNumber: "",
  });

  const handleFiidInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      fiid: event.target.value,
    }));
  };

  const handleDocumentTypeInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      documentType: event.target.value,
    }));
  };

  const handleDocumentNumberInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      documentNumber: event.target.value,
    }));
  };

  // Ok - https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.fiid && values.documentType && values.documentNumber) {
      setValid(true);
    }
    setSubmitted(true);
    axios.post("/isBetaUser", values).then((res) => {
      console.log("Response de la consulta a /isBetaUser: ", res);
      console.log("Response Data: ", res.data);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      res.data.message === "Es Beta User" && setIsBeta(true);
    });
  };

  return (
    <div class="form-container">
      <h1>Chequear si un usuario es Beta User</h1>
      <form class="register-form" onSubmit={handleSubmit}>
        {!values.fiid && !values.documentType && !values.documentNumber && (
          <div class="success-message">Por favor complete todos los campos</div>
        )}
        <input
          id="fiid"
          class="form-field"
          type="text"
          placeholder="Fiid"
          name="fiid"
          value={values.fiid}
          onChange={handleFiidInputChange}
        />
        {submitted && !values.fiid && (
          <span id="fiid-error">Por favor ingrese el fiid del banco</span>
        )}
        <input
          id="documentType"
          class="form-field"
          type="text"
          placeholder="Tipo de documento"
          name="documentType"
          value={values.documentType}
          onChange={handleDocumentTypeInputChange}
        />
        {submitted && !values.documentType && (
          <span id="document-type-error">
            Por favor ingrese el tipo de documento
          </span>
        )}
        <input
          id="documentNumber"
          class="form-field"
          type="text"
          placeholder="Numero de documento"
          name="documentNumber"
          value={values.documentNumber}
          onChange={handleDocumentNumberInputChange}
        />
        {submitted && !values.documentNumber && (
          <span id="document-number-error">
            Por favor ingrese el número de documento
          </span>
        )}
        {values.fiid && values.documentType && values.documentNumber && (
          <button class="form-field" type="submit">
            Enviar
          </button>
        )}
      </form>
      <ResultIsBetaUser result={isBeta} />
    </div>
  );
};

export default IsBetaUser;
