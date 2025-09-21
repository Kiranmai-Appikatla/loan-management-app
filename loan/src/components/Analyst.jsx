import { useContext } from "react";
import { LoanContext } from "../LoanContext.jsx";

export default function Analyst() {
  const { loans } = useContext(LoanContext);

  const total = loans.length;
  const approved = loans.filter(l => l.status === "Approved").length;
  const rejected = loans.filter(l => l.status === "Rejected").length;
  const pending = loans.filter(l => l.status === "Pending").length;

  return (
    <div>
      <h2>Financial Analyst Dashboard</h2>
      <p>Total Loans: {total}</p>
      <p>Approved: {approved}</p>
      <p>Rejected: {rejected}</p>
      <p>Pending: {pending}</p>
    </div>
  );
}
