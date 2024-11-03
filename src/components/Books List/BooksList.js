import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";
import Pagination from "react-js-pagination";

import NavBar from "../NavBar/NavBar";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastBook = page * rowsPerPage;
  const indexOfFirstBook = indexOfLastBook - rowsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <NavBar />
      <h1 className="text-center mt-2 mb-2">
        <a className="navbar-brand" href="/">
          <i className="bi bi-book"></i> Books Catalog
        </a>
      </h1>
      <Container fluid="sm" className="mt-4">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row className="g-4">
            {currentBooks.map((book) => (
              <Col xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card
                  style={{ height: "100%", width: "100%" }}
                  className="mb-4"
                >
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1676422355165-d809008b8342?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    fluid
                    alt="Book Image"
                    style={{ height: 150, objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Text>
                      <span className="text-success">Author: </span>
                      {book.author}
                    </Card.Text>
                    <Card.Text>
                      <span className="text-warning">Genre: </span>
                      {book.genre}
                    </Card.Text>
                    <Card.Text>
                      <span className="text-info">Publication Year: </span>
                      {book.publication_year}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
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
  );
};

export default BookList;
