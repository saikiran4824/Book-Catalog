import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../NavBar/NavBar';
import Table from 'react-bootstrap/Table';


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
        {filteredBooks.length === 0 && searchTerm !== '' ? (
          <p>No results found.</p>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publication Year</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.publication_year}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {books.length === 0 && (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default BookSearch;