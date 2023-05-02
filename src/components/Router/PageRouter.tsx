import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import HomePage from "../HomePage/HomePage";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Payment from "../Payment/Payment";

const PageRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <HomePage />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div>
            <Register />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div>
            <Login />
          </div>
        }
      />
      <Route
        path="/profile"
        element={
          <div>
            <Profile />
          </div>
        }
      />
      <Route
        path="/payment"
        element={
          <div>
            <Payment />
          </div>
        }
      />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};

export default PageRouter;
