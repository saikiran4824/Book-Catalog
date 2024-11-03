// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import BookList from './components/Books List/BooksList';
import BookForm from './components/AddBookForm/BookForm';
import EditForm from './components/Edit Form/EditForm';
import BookSearch from './components/Search/BookSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/edit-book" element={<EditForm />} />
        <Route path="/search" element={<BookSearch/>} />
      </Routes>
    </Router>
  );
}

export default App;