import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

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
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showMobileTable, setShowMobileTable] = useState(isMobileView);
  const [showDesktopTable, setShowDesktopTable] = useState(!isMobileView);

  const handleResize = () => {
    const isMobile = window.innerWidth < 768;
    setIsMobileView(isMobile);
    setShowMobileTable(isMobile);
    setShowDesktopTable(!isMobile);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastBook = page * rowsPerPage;
  const indexOfFirstBook = indexOfLastBook - rowsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="table-container">
      {/* Desktop View */}
      {showDesktopTable && (
        <Table id="tableContent" responsive striped bordered hover >
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
                    />
                  ) : (
                    book.publication_year
                  )}
                </td>
                <td>
                  {editableRows[book.id] ? (
                    <Button variant="primary" size="sm" onClick={() => handleSave(book.id, book)}>
                      Save
                    </Button>
                  ) : (
                    <button
                      variant="outline-primary"
                      onClick={() => setEditableRows((prev) => ({ ...prev, [book.id]: true }))}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button variant="outline-danger" onClick={() => handleDelete(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showMobileTable && (
        <div className="mobile-table px-2">
          {currentBooks.map((book) => (
            <div key={book.id} className="mobile-table-row border rounded p-3 mb-3" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="mobile-table-cell mb-2">
                <strong>Book:</strong>
                {editableRows[book.id] ? (
                  <input
                    type="text"
                    name="name"
                    value={book.name}
                    onChange={(e) => handleInputChange(book.id, e)}
                    className="w-100"
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
                    className="w-100"
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
                    className="w-100"
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
                    className="w-100"
                  />
                ) : (
                  book.publication_year
                )}
              </div>
              <div className="mobile-table-cell mb-2">
                {editableRows[book.id] ? (
                  <button className="btn btn-success w-100" onClick={() => handleSave(book.id, book)}>
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setEditableRows((prev) => ({ ...prev, [book.id]: true }))}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="mobile-table-cell">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDelete(book.id)} >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookTable;
