// src/pages/BookDetailPage/BookDetailPage.jsx
import React from 'react';
import BookDetails from '../../components/BookDetails/BookDetails.jsx';
import './BookDetailPage.css';

const BookDetailPage = () => {
  return (
    <div className="book-detail-page-layout">
        {/* 'showInfoPanel' is not passed, so it defaults to true */}
        <BookDetails />
    </div>
  );
};

export default BookDetailPage;