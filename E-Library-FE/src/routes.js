import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import BookDetails from "./components/BookDetails/BookDetails";
import RateAndComment from './components/RateAndComment/RateAndComment';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/book-details" element={<BookDetails />} />
        <Route path="/rate-and-comment" element={<RateAndComment />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
