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

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setPaginationLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setPaginationLoading(false);
    }, 500);
  };

  return (
    <div>
      <NavBar />
      <div class="container">
  <h1 class="text-center display-4 font-weight-bold">List of Books</h1>
</div>

      
      <AlertComponent
        showAlert={showAlert}
        alertMessage={alertMessage}
        setShowAlert={setShowAlert}
      />

      <BookTable
        books={books}
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
        totalItemsCount={books.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default BookList;