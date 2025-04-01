import React from "react";
import { motion } from "framer-motion";

const BookTable = ({ books, page, rowsPerPage }) => {
  const indexOfLastBook = page * rowsPerPage;
  const indexOfFirstBook = indexOfLastBook - rowsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="row row-cols-1 row-cols-md-4 m-4 g-4">
      {/* Render each book in a grid item */}
      {currentBooks.map((book, index) => (
        <motion.div
          key={book.id}
          className="col"
          initial={{ opacity: 0, y: 50 }} // Start off screen, with opacity 0
          animate={{ opacity: 1, y: 0 }}  // Fade in and slide to the original position
          transition={{
            duration: 0.9,
            delay: index * 0.1, // Slight delay for each book for a staggered effect
          }}
        >
          <div
            className="card h-100 shadow-sm rounded hover-shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105"
            style={{ borderColor: '#2b91d4' }}
          >
            <div className="card-body bg-black text-white">
              {/* Book Name */}
              <h5 className="card-title">
                 {book.name}
              </h5>

              {/* Author */}
              <p className="card-text">
                <strong>Author:</strong> {book.author}
              </p>

              {/* Genre */}
              <p className="card-text">
                <strong>Genre:</strong> {book.genre}
              </p>

              {/* Year Published */}
              <p className="card-text">
                <strong>Year Published:</strong> {book.publication_year}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BookTable;
