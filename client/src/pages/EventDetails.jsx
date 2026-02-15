import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function EventDetails() {
  const { id } = useParams();
  const [e,setE] = useState(null);

  const load = () =>
    api.get(`/events/${id}`).then(r => setE(r.data));

  useEffect(load, [id]);

  const register = async () => {
    try {
      await api.post("/registrations", { eventId: id });
      alert("Registered successfully");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
      console.log(err.response?.data);
    }
  };

  const cancel = async () => {
    try {
      await api.delete(`/registrations/${id}`);
      alert("Cancelled");
      load();
    } catch (err) {
      alert("Cancel failed");
    }
  };

  if (!e) return null;

  const seats = e.capacity - e.registeredCount;

  return (
    <Layout>
      <div className="bg-white border rounded p-6 space-y-3">
        <h2 className="text-xl font-semibold">{e.name}</h2>
        <p>{e.description}</p>
        <p>{e.location}</p>
        <p>Seats left: {seats}</p>

        <div className="flex gap-3">
          <button
            onClick={register}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Register
          </button>

          <button
            onClick={cancel}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
}
