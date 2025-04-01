import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './components/Books List/BooksList';
import BookForm from './components/AddBookForm/BookForm';
import BookSearch from './components/Search/BookSearch';
import ErrorBoundary from './components/AddBookForm/ErrorBoundary.jsx'; // Import ErrorBoundary

function App() {
  return (
    <Router>
      <ErrorBoundary> 
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/search" element={<BookSearch />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
