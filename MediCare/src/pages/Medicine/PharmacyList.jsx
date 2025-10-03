import { useState, useEffect, use } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function PharmacyList() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/medicines`)
      .then((response) => {
        setMedicines(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching medicines:", err);
        setError("Failed to fetch medicines.");
        setLoading(false);
      });
  }, []);

  // Filter medicines by search term (name or description)
  const filteredMedicines = medicines.filter(
    (med) =>
      med.medicine_name?.toLowerCase().includes(search.toLowerCase()) ||
      med.description?.toLowerCase().includes(search.toLowerCase())
  );
  const gotToDetailClick = (med) => {
    navigate(`/medicines/${med.medicine_id}`);
  };

  return (
    <div className="min-h-screen bg-white p-8 text-slate-900">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-slate-900 tracking-tight">
        Medicine List
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      {/* Loading / Error states */}
      {loading && (
        <p className="text-center text-slate-500 text-lg">
          Loading medicines...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold text-lg">
          {error}
        </p>
      )}

      {/* Medicines Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-slate-50 border border-slate-300 rounded-lg shadow-md border-collapse text-slate-900">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-6 py-3 text-left font-semibold">
                  Medicine ID
                </th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Description
                </th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((med, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-200 cursor-pointer transition-colors"
                  >
                    <td
                      onClick={() => gotToDetailClick(med)}
                      className="px-6 py-3 border-b border-slate-200 cursor-pointer text-blue-600 hover:underline"
                    >
                      {med.medicine_id}
                    </td>
                    <td className="px-6 py-3 border-b border-slate-200 ">
                      {med.medicine_name}
                    </td>
                    <td className="px-6 py-3 border-b border-slate-200">
                      {med.description}
                    </td>
                    <td className="px-6 py-3 border-b border-slate-200">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        Available
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-slate-500 px-6 py-6"
                  >
                    No medicines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export { PharmacyList };
