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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  // State for selected author
  const [selectedAuthor, setSelectedAuthor] = useState("All");

  // List of authors
  const authorsList = [
    "All",
    "Movies",
    "Sudha Murthy",
    "Ruskin Bond",
    "Vikram Chandra",
    "Vikram Seth",
    "J.K. Rowling",
  ];

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        console.log(data); // Log book data to check the authors
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Filter books based on selected author
  const filteredBooks = books.filter((book) => {
    return selectedAuthor === "All" || book.author === selectedAuthor;
  });

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="bg-black text-white min-vh-100">
      <NavBar />

      <AlertComponent
        showAlert={showAlert}
        alertMessage={alertMessage}
        setShowAlert={setShowAlert}
      />

      {/* Author Filter */}
      <div className="container bg-black mt-4">
        <div className="row justify-content-center">
          {authorsList.map((author) => (
            <div key={author} className="col-auto mb-3">
              <button
                className={`btn ${
                  selectedAuthor === author ? "btn-primary" : "btn-secondary"
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
      <div className="">
        <BookTable books={filteredBooks} page={page} rowsPerPage={rowsPerPage} />
      </div>

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

      {/* Pagination */}
      <div className="container mt-4">
        <Paginationc
          activePage={page}
          itemsCountPerPage={rowsPerPage}
          totalItemsCount={filteredBooks.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BookList;
