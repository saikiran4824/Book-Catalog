import React from "react";
import { Button } from "react-bootstrap";
import GeneratePDF from "./GeneratePDF";
import ShareBookList from "./ShareBookList";

const ButtonGroup = ({ generatePDF, handleShare }) => {
  return (
    <div className="d-flex justify-content-end mb-2 mt-3">
    <Button variant="success" onClick={handleShare}>
      Share
    </Button>
    <Button variant="primary" onClick={generatePDF} className="m">
     <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/download--v1.png" alt="download--v1"/>
    </Button>
  </div>
  
  );
};

export default ButtonGroup;