import React from "react";
import Pagination from "react-js-pagination";

const Paginationc = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={onChange}
        itemClass="page-item"
        linkClass="page-link"
        activeClass="active"
        className="mt-4 mt-2 mb-2 justify-content-center spinners pagination-container"
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