import { useContext, useState } from "react";
import { LoanContext } from "../LoanContext.jsx";

export default function Borrower() {
  const { loans, setLoans, loanOffers, currentUser } = useContext(LoanContext);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(null);

  if (!currentUser || currentUser.role !== "Borrower") {
    return <p>Please log in as a Borrower to access your dashboard.</p>;
  }

  // Apply for selected offer
  const applyLoan = () => {
    if (selectedOfferIndex !== null) {
      const offer = loanOffers[selectedOfferIndex];
      const newLoan = {
        borrower: currentUser.name,
        amount: offer.amount,
        interest: offer.interest,
        lender: offer.createdBy, // ✅ attach lender info
        status: "Pending",
        payments: Array.from({ length: 12 }, () => ({ paid: false })), // ✅ avoid shared references
      };
      setLoans([...loans, newLoan]);
      setSelectedOfferIndex(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Borrower Dashboard</h2>
      <p>Welcome, {currentUser.name}!</p>

      {/* Available Offers */}
      <h3>Available Loan Offers:</h3>
      {loanOffers.length === 0 ? (
        <p>No loan offers available at the moment.</p>
      ) : (
        <ul>
          {loanOffers.map((offer, index) => (
            <li key={index}>
              Amount: {offer.amount}, Interest: {offer.interest}%
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => setSelectedOfferIndex(index)}
              >
                Select Offer
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Selected Offer */}
      {selectedOfferIndex !== null && (
        <div style={{ marginTop: "10px" }}>
          <p>
            Selected Offer → Amount: {loanOffers[selectedOfferIndex].amount},
            Interest: {loanOffers[selectedOfferIndex].interest}%
          </p>
          <button onClick={applyLoan}>Apply for this Loan</button>
        </div>
      )}

      {/* Your Loan Applications */}
      <h3 style={{ marginTop: "20px" }}>Your Loan Applications:</h3>
      {loans.filter((l) => l.borrower === currentUser.name).length === 0 ? (
        <p>No loans applied yet.</p>
      ) : (
        loans
          .filter((l) => l.borrower === currentUser.name)
          .map((loan, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                Amount: {loan.amount}, Interest: {loan.interest}%, Status:{" "}
                {loan.status}
              </p>

              {/* Payment Schedule */}
              <h4>Payment Schedule:</h4>
              <ul>
                {loan.payments.map((p, i) => (
                  <li key={i}>
                    Month {i + 1}: {p.paid ? "Paid" : "Pending"}
                    {!p.paid && loan.status === "Approved" && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          const newLoans = [...loans];
                          const loanIndex = loans.indexOf(loan);
                          newLoans[loanIndex].payments[i].paid = true;
                          setLoans(newLoans);
                        }}
                      >
                        Pay
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </div>
  );
}
