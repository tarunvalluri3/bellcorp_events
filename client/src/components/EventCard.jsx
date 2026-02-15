import { Link } from "react-router-dom";

export default function EventCard({ e }) {
  return (
    <div className="border p-3 rounded">
      <h3>{e.name}</h3>
      <p>{e.location}</p>
      <p>{new Date(e.datetime).toLocaleString()}</p>
      <Link to={`/event/${e._id}`}>
        <button className="border px-3 py-1 mt-2">View</button>
      </Link>
    </div>
  );
}
