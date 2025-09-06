import React from 'react';
import { Star } from 'lucide-react';
import './RateAndComment.css';

// Dữ liệu bình luận giả lập
const commentsData = [
    {
        id: 1,
        user: 'User01',
        avatar: '',
        time: '2 hours ago',
        rating: 5,
        text: 'Very useful, now I can get A+ on my final exam :))',
    },
    {
        id: 2,
        user: 'User02',
        avatar: '',
        time: '1 day ago',
        rating: 4,
        text: 'Great!',
    },
];

// Hàm để render các ngôi sao
const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Star
                key={i}
                size={20}
                color={i <= rating ? '#ffc107' : '#e0e0e0'}
                fill={i <= rating ? '#ffc107' : 'none'}
            />
        );
    }
    return stars;
};

const RateAndComment = () => {
    return (
        <div className="rate-comment-section">
            <h2 className="section-title">Rate & Comment</h2>

            {/* Phần đánh giá của người dùng */}
            <div className="give-rating-box">
                <div className="rating-input-area">
                    <span className="rating-label">Give us your rating</span>
                    <div className="stars-interactive">
                        {/* Trong một ứng dụng thật, bạn sẽ dùng state để quản lý việc chọn sao */}
                        {renderStars(0)}
                    </div>
                </div>
                <textarea
                    className="comment-textarea"
                    placeholder="Write your thoughts about the book..."
                ></textarea>
                <div className="action-buttons-comment">
                    <button className="btn btn-cancel">Cancel</button>
                    <button className="btn btn-send">Send</button>
                </div>
            </div>

            {/* Phần hiển thị tất cả bình luận */}
            <div className="all-comments-section">
                <div className="comments-header">
                    <h3 className="comments-title">All comments</h3>
                    <div className="filter-buttons">
                        <button className="filter-btn active">Latest</button>
                        <button className="filter-btn">Oldest</button>
                        <button className="filter-btn">Stars</button>
                    </div>
                </div>

                <div className="comments-list">
                    {commentsData.map((comment) => (
                        <div key={comment.id} className="comment-card">
                            <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
                            <div className="comment-content">
                                <div className="comment-info">
                                    <span className="comment-user">{comment.user}</span>
                                    <span className="comment-time">{comment.time}</span>
                                </div>
                                <div className="comment-rating">{renderStars(comment.rating)}</div>
                                <p className="comment-text">{comment.text}</p>
                                <div className="comment-actions">
                                    <button className="action-link">Like</button>
                                    <button className="action-link">Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RateAndComment;