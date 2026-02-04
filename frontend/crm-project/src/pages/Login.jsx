import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/login", form);
      navigate("/dashboard");
    } catch (err) {
      // backend sends: { message: "Invalid credentials" }
      setError("You don’t have an account. Register first.");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </form>

      {/* 👇 Error + Register message */}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}{" "}
          <Link to="/register">Register</Link>
        </p>
      )}
    </div>
  );
};

export default Login;
