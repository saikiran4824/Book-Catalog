import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BookCard = ({ book, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      className="col"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
      }}
    >
      <div
        className="card h-100 shadow-sm rounded hover-shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105"
        style={{ borderColor: '#2b91d4' }}
      >
        <div className="card-body bg-black text-white">
          <h5 className="card-title">{book.name}</h5>
          <p className="card-text"><strong>Author:</strong> {book.author}</p>
          <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
          <p className="card-text"><strong>Year Published:</strong> {book.publication_year}</p>
        </div>
      </div>
    </motion.div>
  );
};

const BookTable = ({ books, page, rowsPerPage }) => {
  const indexOfLastBook = page * rowsPerPage;
  const indexOfFirstBook = indexOfLastBook - rowsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="row row-cols-1 row-cols-md-4 m-4 g-4">
      {currentBooks.map((book, index) => (
        <BookCard key={book.id} book={book} index={index} />
      ))}
    </div>
  );
};

export default BookTable;
