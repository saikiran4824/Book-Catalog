import React from "react";
import { Button } from "react-bootstrap";
import '../../App.css'; // Make sure you include your custom styles

const BookTable = ({
  books,
  page,
  rowsPerPage,
  editableRows,
  setEditableRows,
  handleSave,
  handleInputChange,
}) => {
  const indexOfLastBook = page * rowsPerPage;
  const indexOfFirstBook = indexOfLastBook - rowsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="book-grid-container">
      {/* Render each book in a grid item */}
      {currentBooks.map((book) => (
        <div key={book.id} className="book-item">
          <div className="book-box border rounded p-4" style={{ borderColor: '#2b91d4' }}>
            <div className="book-details">
              {/* Book Name */}
              <div>
                <strong>Book:</strong>
                {editableRows[book.id] ? (
                  <input
                    type="text"
                    name="name"
                    value={book.name}
                    onChange={(e) => handleInputChange(book.id, e)}
                    className="form-control"
                  />
                ) : (
                  book.name
                )}
              </div>

              {/* Author */}
              <div className="mt-3">
                <strong>Author:</strong>
                {editableRows[book.id] ? (
                  <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={(e) => handleInputChange(book.id, e)}
                    className="form-control"
                  />
                ) : (
                  book.author
                )}
              </div>

              {/* Genre */}
              <div className="mt-3">
                <strong>Genre:</strong>
                {editableRows[book.id] ? (
                  <input
                    type="text"
                    name="genre"
                    value={book.genre}
                    onChange={(e) => handleInputChange(book.id, e)}
                    className="form-control"
                  />
                ) : (
                  book.genre
                )}
              </div>

              {/* Year Published */}
              <div className="mt-3">
                <strong>Year Published:</strong>
                {editableRows[book.id] ? (
                  <input
                    type="number"
                    name="publication_year"
                    value={book.publication_year}
                    onChange={(e) => handleInputChange(book.id, e)}
                    className="form-control"
                  />
                ) : (
                  book.publication_year
                )}
              </div>

              {/* Edit/Save Button */}
              <div className="mt-4">
                {editableRows[book.id] ? (
                  <Button
                    variant="success"
                    className="custom-button w-100"
                    onClick={() => handleSave(book.id, book)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outline-primary"
                    className="custom-button w-100"
                    onClick={() => setEditableRows((prev) => ({ ...prev, [book.id]: true }))}>
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookTable;
