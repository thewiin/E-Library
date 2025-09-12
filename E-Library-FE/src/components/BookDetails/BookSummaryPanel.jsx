import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './BookSummaryPanel.css'; 

const BookSummaryPanel = ({ book }) => {
    if (!book) return null;

    return (
        <div className="book-summary-panel">
            <div className="book-cover-wrapper">
                <img src="/images/book1.jpg" alt="Book Cover" className="book-cover-image" />
            </div>
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">{book.author}</p>
            <div className="rating-summary">
                <span className="rating-score">{book.rating.toFixed(1)}</span>
                <div className="stars-container">
                    {/* Lặp để hiển thị sao */}
                    {[...Array(Math.round(book.rating))].map((_, i) => (
                         <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                </div>
                <span className="reviews-count">({book.reviews} reviews)</span>
            </div>
        </div>
    );
};

export default BookSummaryPanel;