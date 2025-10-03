import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Step 1: Import useNavigate

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function MedicineSearch({ onAddMedicine }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate(); // Step 2: Initialize the navigate function

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

  const filteredMedicines = medicines.filter((med) =>
    med.medicine_name?.toLowerCase().includes(search.toLowerCase())
  );

  // Step 3: Function to handle navigation
  const handleNavigateToDetail = (medicineId) => {
    navigate(`/medicines/${medicineId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <input
        type="text"
        placeholder="Search for a medicine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 mb-4"
      />

      {loading && <p className="text-slate-500 text-center">Loading...</p>}
      {error && (
        <p className="text-red-600 font-semibold text-center">{error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-y-auto flex-grow border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-slate-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((med) => (
                  <tr
                    key={med.medicine_id}
                    className="hover:bg-slate-50 border-t"
                  >
                    <td className="px-4 py-3">
                      {/* Step 4: Make the name clickable and remove the description */}
                      <div
                        onClick={() => handleNavigateToDetail(med.medicine_id)}
                        className="font-medium text-blue-600 cursor-pointer hover:underline"
                        title={`View details for ${med.medicine_name}`} // Adds a helpful tooltip
                      >
                        {med.medicine_name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onAddMedicine(med)}
                        className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-full hover:bg-slate-600"
                        title={`Add ${med.medicine_name} to prescription`}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-slate-500 p-6">
                    No medicines found.
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
