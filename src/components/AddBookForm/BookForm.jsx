import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Table, Alert, Form, Container, Row,Button, Col } from "react-bootstrap";
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
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Add Book</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="author">
                <Form.Label>Author Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  isInvalid={error.author}
                />
                <Form.Control.Feedback type="invalid">
                  {error.author}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="publicationYear" className="mt-3">
                <Form.Label>Publication Year:</Form.Label>
                <Form.Control
                  type="number"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(e.target.value)}
                  placeholder="Enter publication year"
                  isInvalid={error.publicationYear}
                />
                <Form.Control.Feedback type="invalid">
                  {error.publicationYear}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="bookName" className="mt-3">
                <Form.Label>Book Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  placeholder="Enter book name"
                  isInvalid={error.bookName}
                />
                <Form.Control.Feedback type="invalid">
                  {error.bookName}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary"  type="submit" className="custom-button mt-3">
                Submit
              </Button>
            </Form>
            {showAlert && (
              <Alert variant="success" className="alert-orange mt-4">
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
            </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookForm;