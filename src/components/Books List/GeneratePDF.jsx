import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import '../../App.css'; // Make sure your custom styles are included

// Sample Navbar Component for PDF
const NavBar = () => (
  <div style={{ backgroundColor: '#3498db', color: 'white', padding: '10px 0', textAlign: 'center' }}>
    <h2>Book List</h2>
  </div>
);

const GeneratePDF = () => {
  const [books, setBooks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false); // State to manage visibility

  useEffect(() => {
    // Fetching data from a JSON file (assuming it's stored locally in the public folder)
    fetch("/data.json")
      .then(response => response.json())
      .then(data => {
        setBooks(data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Check if books data is empty or undefined
  if (!books || books.length === 0) {
    return <div>No books available to generate PDF.</div>;
  }

  // Function to generate and download the PDF
  const generatePDF = () => {
    setIsGenerating(true); // Set the state to show content

    const element = document.getElementById("pdfContent");

    const options = {
      margin: 1,
      filename: "book-list.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save().then(() => {
      setIsGenerating(false); // Hide the content after the PDF is generated
    });
  };

  return (
    <div>
      {/* Button to generate PDF */}
      <button
        onClick={generatePDF}
        type="button"
        className="d-none d-md-block custom-button"
      >
        Download Full BookList PDF
      </button>

      {/* Content to be rendered inside the PDF */}
      <div
        id="pdfContent"
        className="container mt-4"
        style={{ display: isGenerating ? 'block' : 'none' }} // Show content when generating
      >
        {/* Add Navbar at the top of the PDF */}
        <NavBar />

        {/* Books Content */}
        <div className="row mt-4">
          {books.map((book) => (
            <div key={book.id} className="col-md-4 mb-4">
              <div className="book-box border rounded p-4" style={{ borderColor: '#3498db' }}>
                {/* Book Name */}
                <div>
                  <strong>Book:</strong> {book.name}
                </div>

                {/* Author */}
                <div className="mt-3">
                  <strong>Author:</strong> {book.author}
                </div>

                {/* Genre */}
                <div className="mt-3">
                  <strong>Genre:</strong> {book.genre}
                </div>

                {/* Year Published */}
                <div className="mt-3">
                  <strong>Year Published:</strong> {book.publication_year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneratePDF;
