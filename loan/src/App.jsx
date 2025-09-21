// src/App.jsx
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoanProvider, {LoanContext } from "./LoanContext.jsx"; // ✅ import LoanProvider
import Login from "./components/Login.jsx";
import Borrower from "./components/Borrower.jsx";
import Lender from "./components/Lender.jsx";
import Admin from "./components/Admin.jsx";
import Analyst from "./components/Analyst.jsx";

export default function App() {
  return (
    <LoanProvider> {/* ✅ Wrap the whole app in LoanProvider */}
      <Router>
        <RoutesWrapper />
      </Router>
    </LoanProvider>
  );
}

// Separate component to access context
function RoutesWrapper() {
  const { currentUser } = React.useContext(LoanContext);

  return (
    <Routes>
      {!currentUser && <Route path="*" element={<Login />} />}

      {currentUser && currentUser.role === "Borrower" && (
        <Route path="*" element={<Borrower />} />
      )}

      {currentUser && currentUser.role === "Lender" && (
        <Route path="*" element={<Lender />} />
      )}

      {currentUser && currentUser.role === "Admin" && (
        <Route path="*" element={<Admin />} />
      )}

      {currentUser && currentUser.role === "Analyst" && (
        <Route path="*" element={<Analyst />} />
      )}
    </Routes>
  );
}
