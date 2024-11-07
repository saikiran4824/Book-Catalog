import React from "react";
import { Alert } from "react-bootstrap";

const AlertComponent = ({ showAlert, alertMessage, setShowAlert }) => {
  if (showAlert) {
    return (
      <Alert variant="success" className="alert-orange" onClose={() => setShowAlert(false)} >
        {alertMessage}
      </Alert>
    );
  }
  return null;
};

export default AlertComponent;