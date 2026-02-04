import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customername: "", email: "", phonenumber: "", companyname: ""
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const loadCustomers = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data);
  };

  useEffect(() => { loadCustomers(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/customers/${editId}`, form);
      setEditId(null);
    } else {
      await api.post("/customers", form);
    }
    setForm({ customername:"", email:"", phonenumber:"", companyname:"" });
    loadCustomers();
  };

  const edit = (c) => {
    setEditId(c._id);
    setForm(c);
  };

  const del = async (id) => {
    await api.delete(`/customers/${id}`);
    loadCustomers();
  };

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <form onSubmit={submit}>
        <input placeholder="Name" value={form.customername} onChange={e=>setForm({...form,customername:e.target.value})}/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input placeholder="Phone" value={form.phonenumber} onChange={e=>setForm({...form,phonenumber:e.target.value})}/>
        <input placeholder="Company" value={form.companyname} onChange={e=>setForm({...form,companyname:e.target.value})}/>
        <button>{editId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {customers.map(c => (
          <li key={c._id}>
            {c.customername} ({c.email})
            <button onClick={() => edit(c)}>Edit</button>
            <button onClick={() => del(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
