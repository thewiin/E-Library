import React, { useReducer, useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import cookie from "react-cookies";
import { authApis, endpoints } from "./configs/Apis";
import MyUserReducer from "./reducers/MyUserReducer";
import { MyUserContext, MyDispatchContext } from "./configs/MyContext";

// Import các Layout và Page component
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/Auth/SignUp";
import Home from "./pages/Home";

function ProtectedRoutes({ user, requiredRoles, isLoading }) {
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRoles && !requiredRoles.includes(user.role))
    return <Navigate to="/" replace />;
  return <Outlet />;
}

function App() {
  const initialUser = (() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  })();

  const [user, dispatch] = useReducer(MyUserReducer, initialUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = cookie.load("token");
    if (token) {
      (async () => {
        try {
          let res = await authApis().get(endpoints["profile"]);
          dispatch({ type: "login", payload: res.data });
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
          console.error("Token không hợp lệ hoặc hết hạn!", err);
          cookie.remove("token", { path: "/" });
          localStorage.removeItem("user");
          dispatch({ type: "logout" });
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <div className="App">
          <Routes>
            {/* Routes không dùng layout (Login/Signup) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Routes dùng MainLayout (các route chính) */}
            <Route element={<MainLayout />}>
              {/* Route mặc định - có thể thay bằng trang chủ sau */}
              <Route path="/" element={<Home />} />

              {/* Các route công khai */}
              <Route path="/books/:bookId" element={<div>helo</div>} />

              {/* Các route cần đăng nhập */}
              <Route
                element={<ProtectedRoutes user={user} isLoading={isLoading} />}
              >
                <Route
                  path="/books/:bookId/comment"
                  element={<div>helo</div>}
                />
                <Route path="/my-books" element={<h2>Sách của tôi</h2>} />
                <Route
                  path="/my-comments"
                  element={<h2>Bình luận của tôi</h2>}
                />
              </Route>

              {/* Route cho admin (nếu cần) */}
              <Route
                element={
                  <ProtectedRoutes
                    user={user}
                    requiredRoles={["ADMIN"]}
                    isLoading={isLoading}
                  />
                }
              >
                <Route path="/admin/books" element={<h2>Quản lý sách</h2>} />
                <Route
                  path="/admin/users"
                  element={<h2>Quản lý người dùng</h2>}
                />
              </Route>
            </Route>

            {/* Redirect mặc định đến login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Route 404 */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;
