import { useState, useContext } from "react";
import { LoanContext } from "../LoanContext.jsx";
import { useNavigate } from "react-router-dom";   // ✅ Added navigate
import "./Login.css";

export default function Login({ isRegisterMode = false, hideSwitch = false }) {
  const { users, setUsers, setCurrentUser } = useContext(LoanContext);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Borrower");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(isRegisterMode);


  const navigate = useNavigate(); // ✅ Create navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (isRegister) {
      // 🧾 Empty fields check
      if (!trimmedName || !trimmedPassword) {
        alert("Name and password cannot be empty for registration!");
        return;
      }

      // 🧾 Check if user already exists
      const exists = users.some(
        (u) => u.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (exists) {
        alert("A user with this name already exists. Please switch to Login.");
        return;
      }

      // 🧾 Register new user
      const newUser = { name: trimmedName, role, password: trimmedPassword };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      alert(`User "${trimmedName}" registered successfully as a ${role}!`);

      setName("");
      setPassword("");

      // ⭐ Redirect based on role
      navigate(
        role === "Borrower"
          ? "/borrower"
          : role === "Lender"
          ? "/lender"
          : role === "Admin"
          ? "/admin"
          : "/analyst"
      );
    } 
    
    else {
      // ✅ LOGIN LOGIC
      const user = users.find(
        (u) =>
          u.name.toLowerCase() === trimmedName.toLowerCase() &&
          u.password === trimmedPassword
      );

      if (user) {
        setCurrentUser(user);
        alert(`Welcome ${user.name} (${user.role})!`);
        setName("");
        setPassword("");

        // ⭐ Redirect based on role
        navigate(
          user.role === "Borrower"
            ? "/borrower"
            : user.role === "Lender"
            ? "/lender"
            : user.role === "Admin"
            ? "/admin"
            : "/analyst"
        );
      } else {
        alert("User not found or wrong credentials (Name and Password mismatch).");
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
            {isRegister ? (
              // Role selection for registration
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
            ) : (
              <p className="login-info-text">
                Logging in will determine your role automatically.
              </p>
            )}
          </div>

          <button type="submit" className="login-button">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {!hideSwitch && (
  <button
    type="button"
    className="switch-button"
    onClick={() => setIsRegister(!isRegister)}
  >
    {isRegister
      ? "Already have an account? Login"
      : "No account? Register"}
  </button>
)}

      </div>
    </div>
  );
}
