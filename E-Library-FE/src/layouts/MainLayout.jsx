import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet là một component đặc biệt của router
import Header from '../components/Header/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="app-content">
        {/* Outlet sẽ là nơi các component con (các page của bạn) được render */}
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;  