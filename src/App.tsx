// App.tsx
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { CalendarPage } from "./pages/Calendar";
import { DummyEventPage } from "./pages/DummyEventPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/dummy-event" element={<DummyEventPage />} />
        </Routes>
      </NextUIProvider>
    </BrowserRouter>
  );
};

export default App;
