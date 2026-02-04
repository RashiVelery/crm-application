import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered successfully");
    navigate("/");
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input type="name" name="name" placeholder="Name" onChange={e => setForm({...form,name:e.target.value})}/>
      <input type="email" name="email" placeholder="Email" onChange={e => setForm({...form,email:e.target.value})}/>
      <input type="password" name="password" placeholder="Password" onChange={e => setForm({...form,password:e.target.value})}/>
      <button>Register</button>
    </form>
  );
};

export default Register;
