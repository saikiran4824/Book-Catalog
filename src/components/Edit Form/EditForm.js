import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { Card, Image } from 'react-bootstrap';

const EditForm = () => {
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [bookName, setBookName] = useState('');
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [books, setBooks] = useState([
    { id: 3, author: 'George R.R. Martin', publicationYear: '1996', bookName: 'A Game of Thrones' },
    { id: 4, author: 'Stephen King', publicationYear: '1977', bookName: 'The Shining' },
    { id: 5, author: 'Jane Austen', publicationYear: '1813', bookName: 'Pride and Prejudice' },
  ]);
  const [editing, setEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState({});

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
      if (editing) {
        const updatedBooks = books.map((book) =>
          book.id === currentBook.id ? { ...book, author, publicationYear, bookName } : book
        );
        setBooks(updatedBooks);
      } else {
        setBooks([...books, { id: Date.now(), author, publicationYear, bookName }]);
      }
      setTimeout(() => {
        setSuccess(false);
        setAuthor('');
        setPublicationYear('');
        setBookName('');
        setEditing(false);
      }, 2000);
    }
  };

  const handleEdit = (book) => {
    setEditing(true);
    setCurrentBook(book);
    setAuthor(book.author);
    setPublicationYear(book.publicationYear);
    setBookName(book.bookName);
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
          
            <div className="row mt-4">
              {books.map((book) => (
                <div className="col-md-4" key={book.id}>
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
                      <button
                        className="btn btn-info mr-2"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
              <div className="card-header">
                <h2>{editing ? 'Edit Book' : 'Add Book'}</h2>
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
                  <button type="submit" className="btn btn-primary">
                    {editing ? 'Update' : 'Submit'}
                  </button>
                  {success && (
                    <p style={{ color: 'green' }}>
                      {editing ? 'Book updated successfully!' : 'Book added successfully!'}
                    </p>
                  )}
                </form>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;