import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import './BookDetails.css';

const BookDetails = ({ showInfoPanel = true }) => { 
    
    const bookData = {
        id: 'AI0001',
        title: 'Introduction to Machine learning with Python',
        author: 'Andreas C.Muller & Sarah Guido',
        publisher: 'O’Reilly',
        publishDate: 'August 2023',
        pages: '350 pages',
        language: 'English',
        category: 'AI',
        dimensions: '30 x 15 x 3',
        currentquantity: 5,
        rating: 5.0,
        reviews: 69,
    };

    // Hàm để render các ngôi sao đánh giá
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(bookData.rating);
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} size={24} color="#ffc107" fill="#ffc107" />);
            } else {
                stars.push(<Star key={i} size={24} color="#e0e0e0" />);
            }
        }
        return stars;
    };

    return (
        <div className="book-details-component"> 
            <div className="details-container">
                {/* Cột bên trái: Ảnh và thông tin chính */}
                <div className="left-panel">
                    <div className="book-cover-wrapper">
                        <img src="/images/book1.jpg" alt="Machine Learning" className="book-cover-image" />
                    </div>
                    <h2 className="book-title">{bookData.title}</h2>
                    <p className="book-author">{bookData.author}</p>
                    <div className="rating-summary">
                        <span className="rating-score">{bookData.rating.toFixed(1)}</span>
                        <div className="stars-container">{renderStars()}</div>
                        <span className="reviews-count">({bookData.reviews} reviews)</span>
                    </div>
                    <div className="action-buttons">
                        <button className="btn btn-secondary">Preview</button>
                        <Link to={`/books/AI0001/comment`}>
                            <button className="btn btn-secondary">Comment</button>
                        </Link>
                    </div>
                </div>

                {/* Cột bên phải: Bảng thông tin chi tiết */}
                <div className="right-panel">
                    <div className="info-card">
                        <h3>Information</h3>
                        <div className="info-grid">
                            <span className="info-label">Book ID</span>
                            <span className="info-value">{bookData.id}</span>

                            <span className="info-label">Title</span>
                            <span className="info-value">{bookData.title}</span>

                            <span className="info-label">Author</span>
                            <span className="info-value">{bookData.author}</span>

                            <span className="info-label">Publisher</span>
                            <span className="info-value">{bookData.publisher}</span>

                            <span className="info-label">Publisher Date</span>
                            <span className="info-value">{bookData.publishDate}</span>

                            <span className="info-label">Pages</span>
                            <span className="info-value">{bookData.pages}</span>

                            <span className="info-label">Language</span>
                            <span className="info-value">{bookData.language}</span>

                            <span className="info-label">Category</span>
                            <span className="info-value">{bookData.category}</span>

                            <span className="info-label">Dimensions</span>
                            <span className="info-value">{bookData.dimensions}</span>

                            <span className="info-label">Current quantity</span>
                            <span className="info-value">{bookData.currentquantity}</span>
                        </div>
                        <button className="btn btn-primary btn-favorite">Add to Favorite</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;