import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookSummaryPanel from '../../components/BookDetails/BookSummaryPanel';
import RateAndComment from '../../components/RateAndComment/RateAndComment';
import './RateAndCommentPage.css';

// Hàm giả lập để lấy dữ liệu sách, bạn sẽ thay bằng API thật
const fetchBookById = async (id) => {
    console.log(`Fetching book with id: ${id}`);
    return {
        id: 'AI0001',
        title: 'Introduction to Machine learning with Python',
        author: 'Andreas C.Muller & Sarah Guido',
        coverUrl: 'https://i.imgur.com/8o4g22b.jpeg',
        rating: 5.0,
        reviews: 69
    };
};

const RateAndCommentPage = () => {
    const { bookId } = useParams(); 
    const [book, setBook] = useState(null);

    useEffect(() => {
        const getBookData = async () => {
            const data = await fetchBookById(bookId);
            setBook(data);
        };
        getBookData();
    }, [bookId]); // Dependency array, chỉ chạy lại khi bookId thay đổi

    if (!book) {
        return <div>Loading book details...</div>;
    }

    return (
        <div className="rate-comment-page-layout">
            <div className="book-summary-column">
                <BookSummaryPanel book={book} />
            </div>
            <div className="comment-section-column">
                <RateAndComment />
            </div>
        </div>
    );
};

export default RateAndCommentPage;