import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import BookTable from "./BookTable";
import Paginationc from "./Paginationc";
import AlertComponent from "./AlertComponent";
import GeneratePDF from "./GeneratePDF";
import ShareBookList from "./ShareBookList";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(15);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [editableRows, setEditableRows] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  // State for selected author
  const [selectedAuthor, setSelectedAuthor] = useState("Fantastic World");

  // List of authors
  const authorsList = [
    "All",
    "Fantastic World",
    "Sudha Murthy",
    "Ruskin Bond",
    "Vikram Chandra",
    "Vikram Seth",
    "J.K. Rowling",
     // Added as per your request earlier
  ];

  useEffect(() => {
    fetch("/data.json") // Ensure this is the correct path for your JSON data
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setPaginationLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setPaginationLoading(false);
    }, 500);
  };

  // Filter books based on selected author
  const filteredBooks = books.filter((book) => {
    return selectedAuthor === "All" || book.author === selectedAuthor;
  });

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="text-center display-4 font-weight-bold">List of Books</h1>
      </div>

      <AlertComponent
        showAlert={showAlert}
        alertMessage={alertMessage}
        setShowAlert={setShowAlert}
      />

      {/* Author Filter */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          {authorsList.map((author) => (
            <div key={author} className="col-auto mb-3">
            <button
  className={`btn ${
    selectedAuthor === author
      ? "btn-custom-active"  // Active button uses the custom style
      : "btn-custom-inactive" // Inactive button uses the custom style
  }`}
  onClick={() => setSelectedAuthor(author)}
>
  {author}
</button>

            </div>
          ))}
        </div>
      </div>

      {/* Book Table with filtered books */}
      <BookTable
        books={filteredBooks}
        page={page}
        rowsPerPage={rowsPerPage}
        editableRows={editableRows}
        setEditableRows={setEditableRows}
        handleSave={(id, book) => {
          const updatedBooks = books.map((b) => (b.id === id ? book : b));
          setBooks(updatedBooks);
          setEditableRows((prev) => ({ ...prev, [id]: false }));
          setShowAlert(true);
          setAlertMessage("Saved!");
          setTimeout(() => {
            setShowAlert(false);
          }, 1500);
        }}
        handleDelete={(id) => {
          const updatedBooks = books.filter((book) => book.id !== id);
          setBooks(updatedBooks);
          setShowAlert(true);
          setAlertMessage("Deleted!");
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        }}
        handleInputChange={(id, event) => {
          const { name, value } = event.target;
          const updatedBooks = books.map((b) =>
            b.id === id ? { ...b, [name]: value } : b
          );
          setBooks(updatedBooks);
        }}
      />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-auto mb-3">
          <GeneratePDF />
          </div>
          <div className="col-auto mb-3">
            <ShareBookList />
          </div>
        </div>
      </div>

      <Paginationc
        activePage={page}
        itemsCountPerPage={rowsPerPage}
        totalItemsCount={filteredBooks.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default BookList;
