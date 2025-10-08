import { useState, useContext } from "react";
import { LoanContext } from "../LoanContext";
import "./Lender.css";

export default function Lender() {
  const { loans = [], setLoans, currentUser } = useContext(LoanContext) || {};

  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");

  if (!currentUser) return <p>Please log in to access your dashboard.</p>;

  const calculateMonthlyPayment = (amt, rate, dur) => {
    if (!amt || !rate || !dur || dur <= 0) return 0;
    const totalAmount = parseFloat(amt) * (1 + parseFloat(rate) / 100);
    return (totalAmount / parseInt(dur)).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLoan = {
      id: Date.now(),
      amount: parseFloat(amount),
      interestRate: parseFloat(interestRate),
      duration: parseInt(duration),
      lender: currentUser.name,
      status: "available",
      requests: [],
    };

    setLoans([...loans, newLoan]);
    setAmount("");
    setInterestRate("");
    setDuration("");
  };

  const handleApproval = (loanId, borrowerName, approve) => {
    setLoans(
      loans.map((loan) => {
        if (loan.id === loanId) {
          const updatedRequests = (loan.requests || []).map((req) => {
            if (req.borrowerName === borrowerName) {
              return {
                ...req,
                status: approve ? "approved" : "rejected",
                payments: approve
                  ? req.payments || [
                      { month: 1, amount: 1000, paid: false },
                      { month: 2, amount: 1000, paid: false },
                    ]
                  : req.payments || [],
              };
            }
            return req;
          });
          return { ...loan, requests: updatedRequests };
        }
        return loan;
      })
    );
  };

  const myLoanOffers = loans.filter(
    (loan) => loan.lender === currentUser.name
  );

  const allPendingRequests = myLoanOffers.flatMap((loan) =>
    (loan.requests || [])
      .filter((req) => req.status === "requested")
      .map((req) => ({
        ...req,
        loanId: loan.id,
        loanAmount: loan.amount,
        loanRate: loan.interestRate,
        loanDuration: loan.duration,
      }))
  );

  const renderPayments = (payments = []) => (
    <div className="payment-tracker">
      <h4>Payment Status:</h4>
      <div className="payments-grid">
        {payments.length > 0 ? (
          payments.map((p, i) => (
            <div
              key={i}
              className={`payment-item ${p.paid ? "paid" : "pending"}`}
            >
              <span>Month {p.month}</span>
              <span>₹{p.amount}</span>
              <span className="payment-status">
                {p.paid ? "✅ Paid" : "⏳ Pending"}
              </span>
            </div>
          ))
        ) : (
          <p>No payment data available.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="lender-container">
      <div className="lender-content">
        {/* Offer New Loan */}
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

        {/* Pending Borrower Requests */}
        <section className="my-loans-section">
          <h2 className="section-title">
            Pending Borrower Requests ({allPendingRequests.length})
          </h2>
          <div className="loans-grid">
            {allPendingRequests.length > 0 ? (
              allPendingRequests.map((req) => (
                <div
                  key={`${req.loanId}-${req.borrowerName}`}
                  className="loan-card requested-card"
                >
                  <div className="loan-detail">
                    <span className="detail-label">Borrower:</span>
                    <span className="detail-value">{req.borrowerName}</span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-label">Loan Offer ID:</span>
                    <span className="detail-value">{req.loanId}</span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value">₹{req.loanAmount}</span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-label">Rate:</span>
                    <span className="detail-value">{req.loanRate}%</span>
                  </div>

                  <div className="approval-buttons">
                    <button
                      onClick={() =>
                        handleApproval(req.loanId, req.borrowerName, true)
                      }
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleApproval(req.loanId, req.borrowerName, false)
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-loans-message">
                <p>No new loan requests at this time.</p>
              </div>
            )}
          </div>
        </section>

        {/* Loan History */}
        <section className="my-loans-section">
          <h2 className="section-title">Loan History & Tracking</h2>
          <div className="loans-grid">
            {myLoanOffers.length > 0 ? (
              myLoanOffers.map((loan) => (
                <div key={loan.id} className="loan-card">
                  <h3 style={{ color: "#1976d2", marginBottom: "10px" }}>
                    Offer ID: {loan.id} (₹{loan.amount})
                  </h3>
                  {(loan.requests || []).length > 0 ? (
                    loan.requests.map((req, index) => (
                      <div key={index} className={`loan-detail ${req.status}`}>
                        <span className="detail-label">{req.borrowerName}:</span>
                        <span className={`status-badge ${req.status}`}>
                          {req.status}
                        </span>
                        {req.status === "approved" &&
                          renderPayments(req.payments)}
                      </div>
                    ))
                  ) : (
                    <p>No requests for this offer yet.</p>
                  )}
                </div>
              ))
            ) : (
              <div className="no-loans-message">
                <p>You haven't created any loan offers yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
