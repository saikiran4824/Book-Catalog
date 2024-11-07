import React from "react";
import html2pdf from "html2pdf.js";

const GeneratePDF = ({ books }) => {
  const generatePDF = () => {
    const element = document.getElementById("tableContent");
    const options = {
      margin: 1,
      filename: "table-data.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return generatePDF;
};

export default GeneratePDF;