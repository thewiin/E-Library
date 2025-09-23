// src/pages/RateAndCommentPage.jsx
import React from 'react';
//import { useParams } from 'react-router-dom'; // 1. Import useParams
import BookDetails from '../../components/BookDetails/BookDetails.jsx';
import RateAndComment from '../../components/RateAndComment/RateAndComment.jsx';
import './RateAndCommentPage.css';

const RateAndCommentPage = () => {
  return (
    <div className="rate-comment-page-layout">
      <div className="book-summary-column">
        {/* Pass the prop to hide the info panel */}
        <BookDetails showInfoPanel={false} /> 
      </div>
      <div className="comment-section-column">
        <RateAndComment />
      </div>
    </div>
  );
};

export default RateAndCommentPage;