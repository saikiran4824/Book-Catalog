import React from "react";
import html2pdf from "html2pdf.js";

const ShareBookList = ({ books }) => {
  const handleShare = () => {
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

    // Generate PDF and create a blob
    html2pdf().set(options).from(element).output("blob").then((pdfBlob) => {
      // Check if the device supports sharing
      if (navigator.share) {
        const file = new File([pdfBlob], "table-data.pdf", { type: "application/pdf" });
        const shareData = {
          title: "Books List",
          text: "Check out our books list!",
          files: [file],
        };

        // Share the file using the Web Share API
        navigator.share(shareData).catch((error) => {
          console.error("Error sharing:", error);
        });
      } else {
        // Show an alert if sharing is not supported
        alert("Sharing not supported on this device.");
      }
    });
  };

  return (
    <div>
      {/* Button to trigger the PDF generation and sharing */}
      <button onClick={handleShare} type="button" className="btn btn-info">
        Share BookList as PDF
      </button>
    </div>
  );
};

export default ShareBookList;
