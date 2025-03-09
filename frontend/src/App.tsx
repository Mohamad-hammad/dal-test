import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-6">
        <Routes>
          <Route path="/" element={<TransactionsPage />} />
          <Route path="/add" element={<AddTransactionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
