import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../NavBar/NavBar';
import { Col, Card, Image } from 'react-bootstrap';

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredBooks = books.filter((book) => {
      return (
        book.name.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value)
      );
    });

    setFilteredBooks(filteredBooks);
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h1 className="text-center">Book Search</h1>
        <form>
          <div className="form-row ">
            <div className="form-group col-md-12 p-5">
              <label htmlFor="search ">Search by Book Name or Author</label>
              <input
                type="text"
                className="form-control m-3"
                id="search"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Enter book name or author"
              />
            </div>
          </div>
        </form>
        <div className="row">
          {filteredBooks.length === 0 && searchTerm !== '' ? (
            <p>No results found.</p>
          ) : (
            filteredBooks.map((book) => (
              
              <Col xs={12} sm={6} md={4} lg={3} key={book.id} className='m-2'>
                <Card style={{ height: '100%', width: '100%' }} className="mb-4 pt-4">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1676422355165-d809008b8342?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    fluid
                    alt="Book Image"
                    style={{ height: 150, objectFit: 'cover' }}
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
            ))
          )}
          {books.length === 0 && (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BookSearch;