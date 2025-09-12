import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import './RateAndComment.css';

// Dữ liệu bình luận giả lập
const sampleComments = [
    {
        id: 1,
        user: 'User01',
        avatar: 'https://i.pravatar.cc/40?u=user01',
        timestamp: '2 hours ago',
        rating: 5,
        text: 'Very useful, now I can get A+ on my final exam :))'
    },
    {
        id: 2,
        user: 'User02',
        avatar: 'https://i.pravatar.cc/40?u=user02',
        timestamp: '1 day ago',
        rating: 4,
        text: 'Great!'
    }
];

const RateAndComment = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSendComment = () => {
        // Xử lý gửi comment và rating
        console.log({ rating, comment });
        // Reset form
        setRating(0);
        setComment('');
    };

    return (
        <div className="rate-comment-container">
            {/* Phần Form Đánh Giá */}
            <section className="rate-form-section">
                <h2>Rate & Comment</h2>
                <div className="rating-input-group">
                    <label>Give us your rating</label>
                    <div className="stars-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FontAwesomeIcon
                                key={star}
                                icon={(hoverRating || rating) >= star ? faSolidStar : faRegularStar}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>
                <textarea
                    placeholder="Write your thoughts about the book..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="form-actions">
                    <button className="btn btn-secondary">Cancel</button>
                    <button className="btn btn-primary" onClick={handleSendComment}>Send</button>
                </div>
            </section>

            <hr className="divider" />

            {/* Phần Danh Sách Bình Luận */}
            <section className="comments-list-section">
                <div className="comments-header">
                    <h3>All comments</h3>
                    <div className="comment-filters">
                        <button className="filter-btn active">Latest</button>
                        <button className="filter-btn">Oldest</button>
                        <button className="filter-btn">Stars</button>
                    </div>
                </div>

                <div className="comments-container">
                    {sampleComments.map((c) => (
                        <article key={c.id} className="comment-item">
                            <div className="comment-author-info">
                                <img src={c.avatar} alt="User avatar" className="avatar" />
                                <div className="user-details">
                                    <span className="username">{c.user}</span>
                                    <span className="timestamp">{c.timestamp}</span>
                                </div>
                            </div>
                            <div className="comment-rating">
                                {[...Array(5)].map((_, i) => (
                                     <FontAwesomeIcon key={i} icon={i < c.rating ? faSolidStar : faRegularStar} />
                                ))}
                            </div>
                            <p className="comment-text">{c.text}</p>
                            <div className="comment-actions">
                                <button className="action-button">Like</button>
                                <button className="action-button">Reply</button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RateAndComment;