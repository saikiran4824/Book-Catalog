import React from "react";
import { Alert } from "react-bootstrap";

const AlertComponent = ({ showAlert, alertMessage, setShowAlert }) => {
  if (showAlert) {
    return (
      <Alert  className="alert-oranges" onClose={() => setShowAlert(false)} >
        {alertMessage}
      </Alert>
    );
  }
  return null;
};

export default AlertComponent;