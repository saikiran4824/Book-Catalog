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
        className="d-none d-md-block "
        style={{
          backgroundColor: "#3498db", // Primary color for button
          color: "white", // Text color
          padding: "10px 20px", // Padding for button
          fontSize: "16px", // Font size
          borderRadius: "5px", // Rounded corners
          border: "none", // No border
          cursor: "pointer", // Pointer cursor on hover
        }}
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

        {/* Table for Books */}
        <div className="table-responsive mt-4 mb-2">
          <table id="tableContent" className="table table-bordered" style={{ borderColor: '#3498db' }}>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Year Published</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.publication_year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeneratePDF;
