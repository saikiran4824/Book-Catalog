import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { Card, Image } from 'react-bootstrap';

const BookForm = () => {
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [bookName, setBookName] = useState('');
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [books, setBooks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!author) {
      errors.author = 'Author name is required';
    } else if (!/^[a-zA-Z ]+$/.test(author)) {
      errors.author = 'Invalid author name';
    }

    if (!publicationYear) {
      errors.publicationYear = 'Publication year is required';
    } else if (!/^\d{4}$/.test(publicationYear)) {
      errors.publicationYear = 'Invalid publication year';
    }

    if (!bookName) {
      errors.bookName = 'Book name is required';
    } else if (!/^[a-zA-Z ]+$/.test(bookName)) {
      errors.bookName = 'Invalid book name';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      setSuccess(true);
      setBooks([...books, { author, publicationYear, bookName }]);
      setTimeout(() => {
        setSuccess(false);
        setAuthor('');
        setPublicationYear('');
        setBookName('');
      }, 2000);
    }
  };

  const handleDelete = (index) => {
    setBooks(books.filter((book, i) => i !== index));
  };

  return (
    <>
      <NavBar />
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h2>Add Book</h2>
              </div>
              <div className="card-body">
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
                    {error.author && <p style={{ color: 'red' }}>{error.author}</p>}
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
                    {error.publicationYear && <p style={{ color: 'red' }}>{error.publicationYear}</p>}
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
                    {error.bookName && <p style={{ color: 'red' }}>{error.bookName}</p>}
                  </div>
                  <button type="submit" className="btn btn-primary ">
                    Submit
                  </button>
                  {success && (
                    <p style={{ color: 'green' }}>
                      Book added successfully!
                    </p>
                  )}
                </form>
              </div>
            </div>
            {books.length > 0 && (
              <div className="row mt-4">
                {books.map((book, index) => (
                  <div className="col-md-4" key={index}>
                    <Card style={{ height: '100%', width: '100%' }} className="mb-4">
                      <Image
                        src="https://plus.unsplash.com/premium_photo-1676422355165-d809008b8342?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        fluid
                        alt="Book Image"
                        style={{ height: 150, objectFit: 'cover' }}
                      />
                      <Card.Body>
                        <Card.Title>{book.bookName}</Card.Title>
                        <Card.Text>
                          <span className="text-success">Author: </span>
                          {book.author}
                        </Card.Text>
                        <Card.Text>
  <span className="text-info">Publication Year: </span>
  {book.publicationYear}
</Card.Text>
<Card.Text>
  <button
    className="btn btn-danger"
    onClick={() => handleDelete(index)}
  >
    Delete
  </button>
</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookForm;