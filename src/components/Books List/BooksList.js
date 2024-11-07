import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import BookTable from "./BookTable";
import Paginationc from "./Paginationc";
import AlertComponent from "./AlertComponent";
import ButtonGroup from "./ButtonGroup";
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
      <ButtonGroup
        generatePDF={() => <GeneratePDF books={books} />}
        handleShare={() => <ShareBookList books={books} />}
      />
      <AlertComponent
        showAlert={showAlert}
        alertMessage={alertMessage}
        setShowAlert={setShowAlert}
      />
     {/* <h1 className="text-center mb-2  fw-bold text-primary">Books List</h1> */}

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