import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [f,setF] = useState({name:"",email:"",password:""});

  const submit = async e => {
    e.preventDefault();
    await register(f.name,f.email,f.password);
    nav("/events");
  };

  return (
    <Layout>
      <form onSubmit={submit}
        className="bg-white border rounded p-6 space-y-3 max-w-md">
        <h2 className="text-xl font-semibold">Register</h2>

        {["name","email","password"].map(k => (
          <input key={k}
            className="border p-2 rounded w-full"
            type={k==="password"?"password":"text"}
            placeholder={k}
            onChange={e=>setF({...f,[k]:e.target.value})}
          />
        ))}

        <button className="bg-black text-white py-2 rounded w-full">
          Create Account
        </button>

        <Link to="/login" className="text-sm">
          Login
        </Link>
      </form>
    </Layout>
  );
}
