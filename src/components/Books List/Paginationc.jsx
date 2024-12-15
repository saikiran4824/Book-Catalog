import React, { useState } from "react";
import Pagination from "react-js-pagination";
import './BooksList.css'; // Ensure spinner styles are in this file

const Paginationc = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
}) => {
  // State to track loading status
  const [loading, setLoading] = useState(false);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setLoading(true); // Set loading to true when a page is clicked
    onChange(pageNumber); // Call the parent onChange function

    // Simulate loading time (e.g., fetching new content)
    setTimeout(() => {
      setLoading(false); // Set loading to false once content is loaded
    }, 1000); // Adjust this timeout as needed (simulating async behavior)
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        activeClass="active"
        className="mt-4 mb-2 justify-content-center pagination-container"
        style={{
          fontSize: "18px",
          color: "#FFA07A",
          opacity: "0.5",
        }}
      />
    </div>
  );
};

export default Paginationc;
