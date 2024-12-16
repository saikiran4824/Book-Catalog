import React from "react";
import html2pdf from "html2pdf.js";

const GeneratePDF = ({ books }) => {
  const generatePDF = () => {
    console.log("hii");
    // Get the table element to capture its content
    const element = document.getElementById("tableContent");

    // PDF options
    const options = {
      margin: 1,
      filename: "table-data.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate and save the PDF
    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      {/* Add a button to trigger the PDF generation */}
      <button onClick={generatePDF} onTouchStart={generatePDF} type="button" className="btn btn-info">
        Download BookList PDF
      </button>
    </div>
  );
};

export default GeneratePDF;
