import { useContext, useState } from "react";
import { LoanContext } from "../LoanContext.jsx";

export default function Lender() {
  const { loans, setLoans, loanOffers, setLoanOffers, currentUser } = useContext(LoanContext);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerInterest, setOfferInterest] = useState("");

  if (!currentUser || currentUser.role !== "Lender") {
    return <p>Please log in as a Lender to access your dashboard.</p>;
  }

  // Create a new loan offer
  const createOffer = () => {
    if (offerAmount && offerInterest) {
      setLoanOffers([
        ...loanOffers,
        {
          amount: offerAmount,
          interest: offerInterest,
          createdBy: currentUser.name, // tag with lender
        },
      ]);
      setOfferAmount("");
      setOfferInterest("");
    }
  };

  // Approve a pending loan
  const approveLoan = (loanToApprove) => {
    const newLoans = [...loans];
    const index = loans.indexOf(loanToApprove);
    if (index !== -1) {
      newLoans[index].status = "Approved";
      setLoans(newLoans);
    }
  };

  // Reject a pending loan
  const rejectLoan = (loanToReject) => {
    const newLoans = [...loans];
    const index = loans.indexOf(loanToReject);
    if (index !== -1) {
      newLoans[index].status = "Rejected";
      setLoans(newLoans);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lender Dashboard</h2>
      <p>Welcome, {currentUser.name}!</p>

      {/* Create Loan Offer */}
      <h3>Create Loan Offer:</h3>
      <input
        type="number"
        placeholder="Amount"
        value={offerAmount}
        onChange={(e) => setOfferAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Interest %"
        value={offerInterest}
        onChange={(e) => setOfferInterest(e.target.value)}
      />
      <button onClick={createOffer}>Create Offer</button>

      {/* Display Loan Offers */}
      <h3 style={{ marginTop: "20px" }}>My Loan Offers:</h3>
      <ul>
        {loanOffers
          .filter((offer) => offer.createdBy === currentUser.name)
          .map((offer, index) => (
            <li key={index}>
              Amount: {offer.amount}, Interest: {offer.interest}%
            </li>
          ))}
      </ul>

      {/* Display Loan Applications */}
      <h3 style={{ marginTop: "20px" }}>Loan Applications from Borrowers:</h3>
      {loans.filter((l) => l.lender === currentUser.name).length === 0 ? (
        <p>No loan applications yet.</p>
      ) : (
        loans
          .filter((loan) => loan.lender === currentUser.name)
          .map((loan) => (
            <div
              key={loan.borrower + loan.amount}
              style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}
            >
              <p>
                Borrower: {loan.borrower} | Amount: {loan.amount} | Interest: {loan.interest}% | Status: {loan.status}
              </p>

              {/* Approve/Reject buttons only for pending */}
              {loan.status === "Pending" && (
                <>
                  <button onClick={() => approveLoan(loan)}>Approve</button>
                  <button onClick={() => rejectLoan(loan)}>Reject</button>
                </>
              )}

              {/* Payment Status */}
              {loan.status === "Approved" && (
                <div>
                  <h4>Payment Status:</h4>
                  <ul>
                    {loan.payments.map((p, i) => (
                      <li key={i}>
                        Month {i + 1}: {p.paid ? "Paid" : "Pending"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
}
