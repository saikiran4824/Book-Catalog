import React, { useState } from "react";
import { Table, Alert, Form, Container, Row, Button, Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Bookform.css";
import NavBar from "../NavBar/NavBar";

// Validation schema using Yup
const validationSchema = Yup.object({
  author: Yup.string()
    .matches(/^[a-zA-Z ]+$/, "Invalid author name")
    .required("Author name is required"),
  publicationYear: Yup.string()
    .matches(/^\d{4}$/, "Invalid publication year")
    .required("Publication year is required"),
  bookName: Yup.string()
    .matches(/^[a-zA-Z ]+$/, "Invalid book name")
    .required("Book name is required"),
});

const BookForm = () => {
  const [books, setBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    setBooks([...books, values]); // Add new book to the list
    setShowAlert(true);
    setAlertMessage("Book added successfully!");
    setTimeout(() => {
      setShowAlert(false);
      resetForm(); // Reset the form after 2 seconds
    }, 2000);
  };

  // Handle book deletion
  const handleDelete = (index) => {
    setBooks(books.filter((book, i) => i !== index));
  };

  return (
    <>
    <NavBar/>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Add Book</h2>
          <Formik
            initialValues={{
              author: "",
              publicationYear: "",
              bookName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                {/* Author Input */}
                <Form.Group controlId="author">
                  <Form.Label>Author Name:</Form.Label>
                  <Field
                    name="author"
                    type="text"
                    className="form-control"
                    placeholder="Enter author name"
                  />
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                {/* Publication Year Input */}
                <Form.Group controlId="publicationYear" className="mt-3">
                  <Form.Label>Publication Year:</Form.Label>
                  <Field
                    name="publicationYear"
                    type="text"
                    className="form-control"
                    placeholder="Enter publication year"
                  />
                  <ErrorMessage
                    name="publicationYear"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                {/* Book Name Input */}
                <Form.Group controlId="bookName" className="mt-3">
                  <Form.Label>Book Name:</Form.Label>
                  <Field
                    name="bookName"
                    type="text"
                    className="form-control"
                    placeholder="Enter book name"
                  />
                  <ErrorMessage
                    name="bookName"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="custom-button mt-3"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>

          {/* Alert for success message */}
          {showAlert && (
            <Alert variant="success" className="alert-orange mt-4">
              {alertMessage}
            </Alert>
          )}

          {/* Books Table */}
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
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </td>
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
