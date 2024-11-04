import React, { useState, useEffect } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import html2pdf from 'html2pdf.js'
import './BooksList.css'
import NavBar from "../NavBar/NavBar";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [editableRows, setEditableRows] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  
  
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setPaginationLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setPaginationLoading(false);
    }, 500);
  };

  const handleEdit = (id) => {
    setEditableRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleSave = (id, book) => {
    const updatedBooks = books.map((b) => (b.id === id ? book : b));
    setBooks(updatedBooks);
    setEditableRows((prev) => ({ ...prev, [id]: false }));
    setShowAlert(true);
    setAlertMessage("Successfully Saved!");
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setShowAlert(true);
    setAlertMessage("Successfully Deleted!");
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };



  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    const updatedBooks = books.map((b) =>
      b.id === id ? { ...b, [name]: value } : b
    );
    setBooks(updatedBooks);
  };


  const indexOfLastBook = page * rowsPerPage;
  const indexOfFirstBook = indexOfLastBook - rowsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);


  
    
      const generatePDF = () => {
        const element = document.getElementById('tableContent');
        const options = {
          margin:       1,
          filename:     'table-data.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        html2pdf().set(options).from(element).save();
      };
    
  
  const handleShare = () => {
    const shareData = {
      title: "Books List",
      text: "Check out our books list!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <div>
      <NavBar />
      {/* <div className="d-flex justify-content-between mb-2">
              <Button variant="primary" onClick={generatePDF}>
                Download as PDF
              </Button>
              <Button variant="success" onClick={handleShare}>
                Share
              </Button>
            </div> */}
      <div style={{ position: "relative" }}>
        {(paginationLoading || loading) && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <div
          style={{
            opacity: paginationLoading || loading ? 0.5 : 1,
            pointerEvents: paginationLoading || loading ? "none" : "auto",
          }}
        >
          <h1 className="text-center mt-2 mb-2">
            <a className="navbar-brand" href="/">
              <i className="bi bi-book"></i> Books Catalog
            </a>
          </h1>
          <Container fluid="sm" className="mt-4">
            {showAlert && (
              <Alert variant="success" className="alert-orange">
                {alertMessage}
              </Alert>
            )}
            <Table id="table" responsive striped bordered hover className="responsive-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Year Published</th>
                  <th>Edit Book</th>
                  <th>Delete Book</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book, index) => (
                  <tr key={book.id}>
                    <td>{(page - 1) * rowsPerPage + index + 1}</td>
                    <td data-label="Book">
                      {editableRows[book.id] ? (
                        <input
                          type="text"
                          name="name"
                          value={book.name}
                          onChange={(e) => handleInputChange(book.id, e)}
                        />
                                            ) : (
                        book.name
                      )}
                    </td>
                    <td data-label="Author">
                      {editableRows[book.id] ? (
                        <input
                          type="text"
                          name="author"
                          value={book.author}
                          onChange={(e) => handleInputChange(book.id, e)}
                        />
                      ) : (
                        book.author
                      )}
                    </td>
                    <td data-label="Genre">
                      {editableRows[book.id] ? (
                        <input
                          type="text"
                          name="genre"
                          value={book.genre}
                          onChange={(e) => handleInputChange(book.id, e)}
                        />
                      ) : (
                        book.genre
                      )}
                    </td>
                    <td data-label="Year Published">
                      {editableRows[book.id] ? (
                        <input
                          type="number"
                          name="publication_year"
                          value={book.publication_year}
                          onChange={(e) => handleInputChange(book.id, e)}
                        />
                      ) : (
                        book.publication_year
                      )}
                    </td>
                    <td>
                      {editableRows[book.id] ? (
                        <button
                          className="btn btn-success"
                          onClick={() => handleSave(book.id, book)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(book.id)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Pagination
                activePage={page}
                itemsCountPerPage={rowsPerPage}
                totalItemsCount={books.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="active"
                className="mt-4 mt-2 mb-2 justify-content-center pagination-container"
                style={{
                  fontSize: "18px",
                  color: "#FFA07A",
                  opacity: "0.5",
                }}
              />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default BookList;