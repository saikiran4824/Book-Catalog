import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-orange" style={{ backgroundColor: '#ff7a00 ' }}>
      <div className="container-fluid">
        <a className="navbar-brand fs-5 fw-bold" href="/">Books Hub</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ justifyContent: 'space-between' }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active fs-5" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fs-5" href="/add-book">Add Book</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fs-5" href="/search">Search</a>
            </li>
          </ul>
          <form className="d-flex d-lg-none"> 
            <button type="button" className="btn btn-success fs-5">Login</button>
          </form>
          <form className="d-none d-lg-flex">
            <button type="button" className="btn btn-success fs-5">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;