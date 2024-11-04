import React from 'react';


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-orange" style={{ backgroundColor: '#ff7a00', padding: '10px 20px' }}>
      <div className="container-fluid">
        <a className="navbar-brand fs-5 fw-bold" href="/" style={{ color: '#fff' }}>Books Hub</a>
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
            <li className="nav-item mx-2">
              <a className="nav-link active fs-5" aria-current="page" href="/" style={{ color: '#fff' }}>Home</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link fs-5" href="/add-book" style={{ color: '#fff' }}>Add Book</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link fs-5" href="/search" style={{ color: '#fff' }}>Search</a>
            </li>
          </ul>
          <form className="d-flex d-lg-none"> 
            <button type="button" className="btn btn-success fs-5" style={{ backgroundColor: '#008000', borderColor: '#008000' }}>Login</button>
          </form>
          <form className="d-none d-lg-flex">
            <button type="button" className="btn btn-danger fs-5" style={{ borderColor: '#dc3545' }}>Logout</button>
            
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;