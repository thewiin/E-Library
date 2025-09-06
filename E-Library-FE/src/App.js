import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import các Layout và Page component
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/Auth/SignUp'; // Giả sử bạn có trang SignUp
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import RateAndCommentPage from './pages/RateAndCommentPage/RateAndCommentPage';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route cho trang Login và Signup sẽ đứng riêng, không có Header */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Các route cần Header sẽ được lồng bên trong MainLayout */}
        <Route element={<MainLayout />}>
          {/* Đường dẫn động đến trang chi tiết sách */}
          <Route path="/books/:bookId" element={<BookDetailPage />} />

          {/* Đường dẫn động đến trang bình luận của sách */}
          <Route path="/books/:bookId/comment" element={<RateAndCommentPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;