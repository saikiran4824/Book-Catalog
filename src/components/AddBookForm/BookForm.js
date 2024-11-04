import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Bookform.css";
const BookForm = () => {
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [bookName, setBookName] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [books, setBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!author) {
      errors.author = "Author name is required";
    } else if (!/^[a-zA-Z ]+$/.test(author)) {
      errors.author = "Invalid author name";
    }

    if (!publicationYear) {
      errors.publicationYear = "Publication year is required";
    } else if (!/^\d{4}$/.test(publicationYear)) {
      errors.publicationYear = "Invalid publication year";
    }

    if (!bookName) {
      errors.bookName = "Book name is required";
    } else if (!/^[a-zA-Z ]+$/.test(bookName)) {
      errors.bookName = "Invalid book name";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      setSuccess(true);
      setBooks([...books, { author, publicationYear, bookName }]);
      setShowAlert(true);
      setAlertMessage("Book added successfully!");
      setTimeout(() => {
        setShowAlert(false);
        setSuccess(false);
        setAuthor("");
        setPublicationYear("");
        setBookName("");
      }, 2000);
    }
  };

  const handleDelete = (index) => {
    setBooks(books.filter((book, i) => i !== index));
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Add Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Author Name:</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
            {error.author && <p style={{ color: "red" }}>{error.author}</p>}
          </div>
          <div className="form-group">
            <label>Publication Year:</label>
            <input
              type="number"
              className="form-control"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              placeholder="Enter publication year"
            />
            {error.publicationYear && (
              <p style={{ color: "red" }}>{error.publicationYear}</p>
            )}
          </div>
          <div className="form-group">
            <label>Book Name:</label>
            <input
              type="text"
              className="form-control"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Enter book name"
            />
            {error.bookName && <p style={{ color: "red" }}>{error.bookName}</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {showAlert && (
          <Alert variant="success" className="alert-orange">
            {alertMessage}
          </Alert>
        )}
        {books.length > 0 && (
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Publication Year</th>
                
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>{book.publicationYear}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default BookForm;
