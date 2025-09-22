import { useContext } from "react";
import { LoanContext } from "../LoanContext";
import "./Borrower.css";

export default function Borrower() {
  const { loans, setLoans, currentUser } = useContext(LoanContext);

  if (!currentUser) return <p>Please log in to access your dashboard.</p>;

  // Request a loan
  const handleRequest = (loanId) => {
    setLoans(
      loans.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              status: "requested",
              borrower: currentUser.name,
            }
          : loan
      )
    );
  };

  // Pay a monthly installment
  const handlePayment = (loanId, monthIndex) => {
    setLoans(
      loans.map((loan) => {
        if (loan.id === loanId) {
          const updatedPayments = loan.payments.map((p, i) =>
            i === monthIndex ? { ...p, paid: true } : p
          );
          const allPaid = updatedPayments.every((p) => p.paid);
          return {
            ...loan,
            payments: updatedPayments,
            status: allPaid ? "completed" : loan.status,
          };
        }
        return loan;
      })
    );
  };

  const availableLoans = loans.filter(
    (loan) => loan.status === "available" && loan.lender !== currentUser.name
  );

  const myLoans = loans.filter((loan) => loan.borrower === currentUser.name);

  return (
    <div className="borrower-container">
      <div className="borrower-content">
        <section className="available-loans-section">
          <h2 className="section-title">Available Loans</h2>
          <div className="loans-grid">
            {availableLoans.length > 0 ? (
              availableLoans.map((loan) => (
                <div key={loan.id} className="loan-card">
                  <div className="loan-header">
                    <span className="lender-name">From: {loan.lender}</span>
                    <span className="loan-amount">₹{loan.amount}</span>
                  </div>
                  <div className="loan-details">
                    <div className="detail-item">
                      <span className="detail-label">Interest Rate</span>
                      <span className="detail-value">{loan.interestRate}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Duration</span>
                      <span className="detail-value">{loan.duration} months</span>
                    </div>
                    <button
                      className="request-button"
                      onClick={() => handleRequest(loan.id)}
                    >
                      Request Loan
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-loans-message">
                <p>No loans are currently available.</p>
              </div>
            )}
          </div>
        </section>

        <section className="my-loans-section">
          <h2 className="section-title">My Loans</h2>
          <div className="loans-grid">
            {myLoans.length > 0 ? (
              myLoans.map((loan) => (
                <div key={loan.id} className="loan-card">
                  <div className="loan-header">
                    <span className="lender-name">From: {loan.lender}</span>
                    <span className="loan-amount">₹{loan.amount}</span>
                  </div>
                  <div className="loan-details">
                    <div className="detail-item">
                      <span className="detail-label">Interest Rate</span>
                      <span className="detail-value">{loan.interestRate}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Duration</span>
                      <span className="detail-value">{loan.duration} months</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status</span>
                      <span className={`status-badge ${loan.status}`}>
                        {loan.status}
                      </span>
                    </div>
                  </div>

                  {loan.status === "approved" && loan.payments && (
                    <div className="payments-section">
                      <h4>Monthly Payments</h4>
                      <div className="payments-grid">
                        {loan.payments.map((payment, index) => (
                          <div
                            key={index}
                            className={`payment-item ${
                              payment.paid ? "paid" : "pending"
                            }`}
                          >
                            <span>Month {payment.month}</span>
                            <span>₹{payment.amount}</span>
                            {!payment.paid && (
                              <button
                                className="pay-button"
                                onClick={() => handlePayment(loan.id, index)}
                              >
                                Pay Now
                              </button>
                            )}
                            {payment.paid && (
                              <span className="payment-status">✅ Paid</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-loans-message">
                <p>You haven't borrowed any loans yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
