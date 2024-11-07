import React from 'react';

const NavBar = () => {
  return (
    <nav 
      className="navbar navbar-expand-lg" 
      style={{ backgroundColor: '#353935', padding: '10px 20px' }}
    >
      <div className="container-fluid">
        <a 
          className="navbar-brand fs-2 fw-bold text-uppercase" 
          href="/" 
          style={{ color: '#fff', letterSpacing: '0.5px' }}
        >
          Books Catalog
        </a>

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
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item text-primary">
             
            </li>
            <li className="nav-item">
              <a 
                className="nav-link fs-5 text-light mx-2" 
                href="/add-book"
              >
                Add Book
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link fs-5 text-light mx-2" 
                href="/search"
              >
                Search
              </a>
            </li>
            
          </ul>

          {/* Mobile-only login button */}
          <form className="d-flex d-lg-none">
            <button 
              type="button" 
              className="btn btn-success fs-5 w-100" 
              style={{ backgroundColor: '#008000', borderColor: '#008000' }}
            >
              Login
            </button>
          </form>

          {/* Desktop-only logout button */}
          <form className="d-none d-lg-flex">
            <button 
              type="button" 
              className="btn btn-danger fs-5" 
              style={{ borderColor: '#dc3545' }}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
