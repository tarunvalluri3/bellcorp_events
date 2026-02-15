import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events,setEvents] = useState([]);
  const [q,setQ] = useState({});

  useEffect(()=>{
    api.get("/events",{params:q})
      .then(r=>setEvents(r.data.events));
  },[q]);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Events</h2>

      <div className="grid md:grid-cols-3 gap-3">
        {["search","category","location"].map(k => (
          <input key={k}
            className="border p-2 rounded bg-white"
            placeholder={k}
            onChange={e=>setQ({...q,[k]:e.target.value})}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {events.map(e => <EventCard key={e._id} e={e}/>)}
      </div>
    </Layout>
  );
}
