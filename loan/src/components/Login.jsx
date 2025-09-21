import { useState, useContext } from "react";
import { LoanContext } from "../LoanContext.jsx";

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
    <div>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Borrower">Borrower</option>
          <option value="Lender">Lender</option>
          <option value="Admin">Admin</option>
          <option value="Analyst">Analyst</option>
        </select>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have account? Login" : "No account? Register"}
      </button>
    </div>
  );
}
