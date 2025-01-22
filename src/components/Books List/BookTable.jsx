import React from "react";
import { Table, Button } from "react-bootstrap";
import '../../App.css';

const BookTable = ({
  books,
  page,
  rowsPerPage,
  editableRows,
  setEditableRows,
  handleSave,
  handleDelete,
  handleInputChange,
}) => {
  const indexOfLastBook = page * rowsPerPage;
  const indexOfFirstBook = indexOfLastBook - rowsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="table-container">
      {/* Desktop View */}
      <div className="d-none d-md-block">
        <Table id="tableContent" responsive striped bordered hover className="styled-table">
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
                <td>
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
                </td>
                <td>
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
                </td>
                <td>
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
                </td>
                <td>
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
                </td>
                <td>
                  {editableRows[book.id] ? (
                    <Button
                      variant="success"
                      className="custom-button"
                      size="sm"
                      onClick={() => handleSave(book.id, book)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      className="custom-button"
                      onClick={() => setEditableRows((prev) => ({ ...prev, [book.id]: true }))}
                    >
                      Edit
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    className="custom-button"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="d-block d-md-none px-2">
        {currentBooks.map((book) => (
          <div
            key={book.id}
            className="mobile-table-row border rounded p-3 mb-3"
            style={{ backgroundColor: '#f8f9fa' }}
          >
            <div className="mobile-table-cell mb-2">
              <strong>Book:</strong>
              {editableRows[book.id] ? (
                <input
                  type="text"
                  name="name"
                  value={book.name}
                  onChange={(e) => handleInputChange(book.id, e)}
                  className="form-control w-100"
                />
              ) : (
                book.name
              )}
            </div>
            <div className="mobile-table-cell mb-2">
              <strong>Author:</strong>
              {editableRows[book.id] ? (
                <input
                  type="text"
                  name="author"
                  value={book.author}
                  onChange={(e) => handleInputChange(book.id, e)}
                  className="form-control w-100"
                />
              ) : (
                book.author
              )}
            </div>
            <div className="mobile-table-cell mb-2">
              <strong>Genre:</strong>
              {editableRows[book.id] ? (
                <input
                  type="text"
                  name="genre"
                  value={book.genre}
                  onChange={(e) => handleInputChange(book.id, e)}
                  className="form-control w-100"
                />
              ) : (
                book.genre
              )}
            </div>
            <div className="mobile-table-cell mb-2">
              <strong>Year Published:</strong>
              {editableRows[book.id] ? (
                <input
                  type="number"
                  name="publication_year"
                  value={book.publication_year}
                  onChange={(e) => handleInputChange(book.id, e)}
                  className="form-control w-100"
                />
              ) : (
                book.publication_year
              )}
            </div>
            <div className="mobile-table-cell mb-2">
              {editableRows[book.id] ? (
                <Button
                  className="custom-button w-48 me-2"
                  variant="success"
                  onClick={() => handleSave(book.id, book)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  className="custom-button w-48 me-2"
                  variant="outline-primary"
                  onClick={() => setEditableRows((prev) => ({ ...prev, [book.id]: true }))}
                >
                  Edit
                </Button>
              )}
              <Button
                className="custom-button w-48"
                variant="outline-danger"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTable;
