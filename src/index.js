import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "views/Home";
import Blog from "views/Blog";
import ErrorPage404 from "views/ErrorPage404"

import "style/main.scss"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Homepage */}
        <Route index element={<Home />} />

        {/* Visit blog */}
        <Route path="/:blogAddress" element={<Blog />} />

        {/* 404 error */}
        <Route path="/404" element={<ErrorPage404 />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
