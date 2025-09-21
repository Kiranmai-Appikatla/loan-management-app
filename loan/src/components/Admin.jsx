import { useContext, useState } from "react";
import { LoanContext } from "../LoanContext.jsx";

export default function Admin() {
  const { users, setUsers, setLoans, setLoanOffers } = useContext(LoanContext);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Borrower");

  const addUser = () => {
    if (name) {
      setUsers([...users, { name, role }]);
      setName("");
    }
  };

  const removeUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Add User Section */}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Borrower">Borrower</option>
        <option value="Lender">Lender</option>
        <option value="Analyst">Analyst</option>
      </select>
      <button onClick={addUser}>Add User</button>

      {/* Users List */}
      <h3>Users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.role}{" "}
            <button onClick={() => removeUser(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Clear All Loan Data Button */}
      <button
        style={{ marginTop: "20px", backgroundColor: "#f44336", color: "white" }}
        onClick={() => {
          setLoans([]);
          setLoanOffers([]);
          alert("All loan applications and offers cleared!");
        }}
      >
        Clear All Loan Data
      </button>
    </div>
  );
}
