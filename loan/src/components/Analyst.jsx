import { useContext, useMemo } from "react";
import { LoanContext } from "../LoanContext";
import "./Analyst.css";

export default function Analyst() {
  const { loans } = useContext(LoanContext);

  const analytics = useMemo(() => {
    const totalLoans = loans.length;
    const activeLoans = loans.filter(loan => loan.status === "taken").length;
    const availableLoans = loans.filter(loan => loan.status === "available").length;
    
    const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const avgInterestRate = loans.length 
      ? (loans.reduce((sum, loan) => sum + loan.interestRate, 0) / loans.length).toFixed(2)
      : 0;

    return {
      totalLoans,
      activeLoans,
      availableLoans,
      totalAmount,
      avgInterestRate
    };
  }, [loans]);

  return (
    <div className="analyst-container">
      <div className="analyst-content">
        <h2 className="section-title">Loan Analytics Dashboard</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Total Loans</h3>
            <span className="stat-value">{analytics.totalLoans}</span>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Active Loans</h3>
            <span className="stat-value">{analytics.activeLoans}</span>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Available Loans</h3>
            <span className="stat-value">{analytics.availableLoans}</span>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Total Amount</h3>
            <span className="stat-value">₹{analytics.totalAmount}</span>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Avg Interest Rate</h3>
            <span className="stat-value">{analytics.avgInterestRate}%</span>
          </div>
        </div>

        <div className="loans-table-container">
          <h3 className="table-title">Detailed Loan Information</h3>
          <div className="loans-table">
            <table>
              <thead>
                <tr>
                  <th>Lender</th>
                  <th>Amount</th>
                  <th>Interest</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Borrower</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.lender}</td>
                    <td>₹{loan.amount}</td>
                    <td>{loan.interestRate}%</td>
                    <td>{loan.duration} months</td>
                    <td>
                      <span className={`status-badge ${loan.status}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td>{loan.borrower || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
