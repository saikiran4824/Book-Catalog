import React from "react";
import html2pdf from "html2pdf.js";
import './BooksList.css';

const ShareBookList = ({ books }) => {
  const handleShare = async () => {
    try {
      // Get the table element to capture its content
      const element = document.getElementById("tableContent");

      // Check if the element exists
      if (!element) {
        alert("Table content not found. Please make sure the table exists.");
        return;
      }

      console.log("Generating PDF from element:", element);

      // PDF options
      const options = {
        margin: 1,
        filename: "booklist.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Generate PDF and create a blob
      const pdfBlob = await html2pdf().set(options).from(element).output("blob");
      console.log("PDF Blob generated:", pdfBlob);

      // Check if the device supports sharing (Web Share API)
      if (navigator.share) {
        const file = new File([pdfBlob], "booklist.pdf", { type: "application/pdf" });
        const shareData = {
          title: "Books List",
          text: "Check out our books list!",
          files: [file],
        };

        // Share the file using the Web Share API
        await navigator.share(shareData);
        console.log("File shared successfully!");
      } else {
        // Fallback: For devices that do not support sharing, trigger a download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = "booklist.pdf";
        link.click();
        console.log("PDF downloaded successfully!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {/* Button to trigger the PDF generation and sharing */}
      <button
        onClick={handleShare}
        type="button"
        className=" bg-black text-white py-2 px-3 fs-5 rounded border border-primary page-link:hover "

      >
        Share BookList as PDF
      </button>
    </div>
  );
};

export default ShareBookList;
