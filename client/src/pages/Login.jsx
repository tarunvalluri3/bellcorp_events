import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const submit = async e => {
    e.preventDefault();
    await login(email,password);
    nav("/events");
  };

  return (
    <Layout>
      <form onSubmit={submit}
        className="bg-white border rounded p-6 space-y-3 max-w-md">
        <h2 className="text-xl font-semibold">Login</h2>

        <input className="border p-2 rounded w-full"
          placeholder="email"
          onChange={e=>setEmail(e.target.value)} />

        <input className="border p-2 rounded w-full"
          type="password"
          placeholder="password"
          onChange={e=>setPassword(e.target.value)} />

        <button className="bg-black text-white py-2 rounded w-full">
          Login
        </button>

        <Link to="/register" className="text-sm">
          Create account
        </Link>
      </form>
    </Layout>
  );
}
