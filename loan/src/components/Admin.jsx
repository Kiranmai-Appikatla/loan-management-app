import { useContext, useState } from "react";
import { LoanContext } from "../LoanContext.jsx";
import "./Admin.css";

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

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all loan data?")) {
      setLoans([]);
      setLoanOffers([]);
      alert("All loan applications and offers cleared!");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <section className="admin-section">
          <h2 className="section-title">Admin Dashboard</h2>
          
          <div className="add-user-panel">
            <h3 className="panel-title">Add New User</h3>
            <div className="input-group">
              <input
                className="admin-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <select 
                className="admin-select"
                value={role} 
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Borrower">Borrower</option>
                <option value="Lender">Lender</option>
                <option value="Analyst">Analyst</option>
              </select>
              <button className="add-button" onClick={addUser}>
                Add User
              </button>
            </div>
          </div>

          <div className="users-panel">
            <h3 className="panel-title">User Management</h3>
            <div className="users-list">
              {users.map((user, index) => (
                <div key={index} className="user-card">
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </div>
                  <button 
                    className="remove-button"
                    onClick={() => removeUser(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="actions-panel">
            <button className="danger-button" onClick={clearAllData}>
              Clear All Loan Data
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
