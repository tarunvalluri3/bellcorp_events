import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get("/events").then(r => setCount(r.data.total));
  }, []);

  return (
    <Layout>
      <div className="bg-white border rounded p-8 text-center space-y-4">
        <h1 className="text-3xl font-semibold">
          Discover Events
        </h1>

        <p className="text-gray-600">
          Browse and register for events across categories and cities.
        </p>

        <p className="text-sm text-gray-500">
          {count} events available now
        </p>

        <Link to="/events">
          <button className="border px-5 py-2 rounded bg-black text-white">
            Explore Events
          </button>
        </Link>
      </div>
    </Layout>
  );
}
