import React from "react";
import html2pdf from "html2pdf.js";

const ShareBookList = ({ books }) => {
    const handleShare = () => {
      const element = document.getElementById("tableContent");
      const options = {
        margin: 1,
        filename: "table-data.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
  
      html2pdf().set(options).from(element).output("blob").then((pdfBlob) => {
        if (navigator.share) {
          const file = new File([pdfBlob], "table-data.pdf", { type: "application/pdf" });
          const shareData = {
            title: "Books List",
            text: "Check out our books list!",
            files: [file],
          };
  
          navigator.share(shareData);
        } else {
          alert("Sharing not supported on this device.");
        }
      });
    };
  
    return handleShare;
  };
  
  export default ShareBookList;