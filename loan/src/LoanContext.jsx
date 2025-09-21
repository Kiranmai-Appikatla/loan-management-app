// src/LoanContext.jsx
import { createContext, useState, useEffect } from "react";

export const LoanContext = createContext();

export default function LoanProvider({ children }) {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const [currentUser, setCurrentUser] = useState(null);
  const [loanOffers, setLoanOffers] = useState(() => JSON.parse(localStorage.getItem("loanOffers")) || []);
  const [loans, setLoans] = useState(() => JSON.parse(localStorage.getItem("loans")) || []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("loanOffers", JSON.stringify(loanOffers));
  }, [loanOffers]);

  useEffect(() => {
    localStorage.setItem("loans", JSON.stringify(loans));
  }, [loans]);

  return (
    <LoanContext.Provider value={{
      users, setUsers,
      currentUser, setCurrentUser,
      loanOffers, setLoanOffers,
      loans, setLoans
    }}>
      {children}
    </LoanContext.Provider>
  );
}
