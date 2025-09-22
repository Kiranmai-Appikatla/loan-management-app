import { useState, useContext } from "react";
import { LoanContext } from "../LoanContext";
import "./Lender.css";

export default function Lender() {
  const { loans, setLoans, currentUser } = useContext(LoanContext);
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");

  if (!currentUser) return <p>Please log in to access your dashboard.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const monthlyPayment =
      (parseFloat(amount) * (1 + parseFloat(interestRate) / 100)) / parseInt(duration);

    const payments = Array.from({ length: parseInt(duration) }, (_, i) => ({
      month: i + 1,
      amount: parseFloat(monthlyPayment.toFixed(2)),
      paid: false,
    }));

    const newLoan = {
      id: Date.now(),
      amount: parseFloat(amount),
      interestRate: parseFloat(interestRate),
      duration: parseInt(duration),
      lender: currentUser.name,
      status: "available",
      borrower: null,
      payments,
    };
    setLoans([...loans, newLoan]);
    setAmount("");
    setInterestRate("");
    setDuration("");
  };

  // Filter loans to only show those created by the current lender
  const myLoans = loans.filter((loan) => loan.lender === currentUser.name);

  const handleApproval = (loanId, approve) => {
    setLoans(
      loans.map((loan) =>
        loan.id === loanId
          ? { ...loan, status: approve ? "approved" : "rejected" }
          : loan
      )
    );
  };

  return (
    <div className="lender-container">
      <div className="lender-content">
        <section className="offer-loan-section">
          <h2 className="section-title">Offer New Loan</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Interest Rate (%)"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Duration (months)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
            <button type="submit">Offer Loan</button>
          </form>
        </section>

        <section className="my-loans-section">
          <h2 className="section-title">My Loans</h2>
          <div className="loans-grid">
            {myLoans.length > 0 ? (
              myLoans.map((loan) => (
                <div key={loan.id} className="loan-card">
                  <div className="loan-detail">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value">₹{loan.amount}</span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-label">Interest:</span>
                    <span className="detail-value">{loan.interestRate}%</span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{loan.duration} months</span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${loan.status}`}>
                      {loan.status}
                    </span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-label">Borrower:</span>
                    <span className="detail-value">{loan.borrower || "N/A"}</span>
                  </div>

                  {loan.status === "requested" && (
                    <div className="approval-buttons">
                      <button onClick={() => handleApproval(loan.id, true)}>Approve</button>
                      <button onClick={() => handleApproval(loan.id, false)}>Reject</button>
                    </div>
                  )}

                  {/* Only show payment tracker for approved loans */}
                  {loan.status === "approved" && loan.borrower && loan.payments && (
                    <div className="payment-tracker">
                      <h4>Payment Status:</h4>
                      <div className="payments-grid">
                        {loan.payments.map((p, i) => (
                          <div key={i} className={`payment-item ${p.paid ? 'paid' : 'pending'}`}>
                            <span>Month {p.month}</span>
                            <span>₹{p.amount}</span>
                            <span className="payment-status">
                              {p.paid ? '✅ Paid' : '⏳ Pending'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-loans-message">
                <p>You haven't created any loans yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
