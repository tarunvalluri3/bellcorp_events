import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    api.get("/registrations/me")
      .then(r => {
        console.log("regs:", r.data);
        setRegs(r.data);
      });
  }, []);

  return (
    <Layout>
      <h2 className="text-xl font-semibold">My Registrations</h2>

      {regs.length === 0 && (
        <p className="text-gray-500">No registrations yet</p>
      )}

      <div className="space-y-3">
        {regs.map(reg => (
          <div
            key={reg._id}
            className="bg-white border rounded p-4"
          >
            <h3 className="font-medium">
              {reg.event?.name}
            </h3>

            <p className="text-sm text-gray-600">
              {reg.event?.location}
            </p>

            <p className="text-sm text-gray-500">
              {reg.event?.datetime &&
                new Date(reg.event.datetime)
                  .toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
