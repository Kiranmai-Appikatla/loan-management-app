import { useState, useContext } from "react";
import { LoanContext } from "../LoanContext.jsx";
import "./Login.css";

export default function Login() {
  const { users, setUsers, setCurrentUser } = useContext(LoanContext);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Borrower");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      // ✅ Check if user already exists
      const exists = users.some((u) => u.name === name && u.role === role);
      if (exists) {
        alert("User already exists with this role!");
        return;
      }

      const newUser = { name, role, password };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
    } else {
      // ✅ login
      const user = users.find(
        (u) => u.name === name && u.password === password && u.role === role
      );
      if (user) {
        setCurrentUser(user);
      } else {
        alert("User not found or wrong credentials");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              className="login-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="login-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <select
              className="login-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Borrower">Borrower</option>
              <option value="Lender">Lender</option>
              <option value="Admin">Admin</option>
              <option value="Analyst">Analyst</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <button
          className="switch-button"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have account? Login" : "No account? Register"}
        </button>
      </div>
    </div>
  );
}
/* login page */