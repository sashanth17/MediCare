import { useState } from "react";

const pharmacyData = [
  { name: "Mittal Medicos", address: "Guru Nanak Pura Mohalla", match: "high" },
  { name: "Pardeep Medicos", address: "Patiala Gate", match: "high" },
  { name: "Prem Medical Store", address: "Dharamshala Bhawra Bazar", match: "high" },
  { name: "Mannat Medicos", address: "Chodry Majra Road", match: "medium" },
  { name: "Raja Medical Hall", address: "Inside Alohran Gate", match: "medium" },
];

const pharmacyDetailsData = {
  "Mittal Medicos": {
    name: "Mittal Medicos",
    address: "Guru Nanak Pura Mohalla",
    contact: "+91 9080907033",
    medicines: [
      { name: "Metformin", dosage: "500 mg", status: "in-stock" },
      { name: "Amlodipine", dosage: "5 mg", status: "low-stock" },
      { name: "Paracetamol", dosage: "650 mg", status: "out-stock" },
      { name: "Ibuprofen", dosage: "400 mg", status: "in-stock" },
    ],
  },
  "Pardeep Medicos": {
    name: "Pardeep Medicos",
    address: "Patiala Gate",
    contact: "+91 9876543210",
    medicines: [
      { name: "Paracetamol", dosage: "500 mg", status: "in-stock" },
      { name: "Aspirin", dosage: "75 mg", status: "low-stock" },
    ],
  },
};

export default function PharmacyList() {
  const [search, setSearch] = useState("");
  const [matchFilter, setMatchFilter] = useState("");
  const [location, setLocation] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const filtered = pharmacyData.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(search.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(search.toLowerCase());
    const matchesMatch = !matchFilter || pharmacy.match === matchFilter;
    const matchesLocation =
      !location ||
      pharmacy.address.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesMatch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white p-6 text-[#0f172a]">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 text-[#0f172a]">
        PHARMACY LIST
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search pharmacy or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[#1e293b] bg-white text-[#0f172a] w-64 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
        />
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="px-4 py-2 rounded-lg border border-[#1e293b] bg-[#0f172a] text-white hover:bg-[#1e293b] transition"
          >
            ⚙ Filters
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 bg-white border border-[#1e293b] rounded-lg p-4 w-56 z-50 shadow-lg">
              <label className="block mb-1 font-semibold text-[#0f172a]">
                Prescription Match %
              </label>
              <select
                className="w-full p-1 rounded border border-[#1e293b] mb-2 bg-white text-[#0f172a]"
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="high">High (&gt;70%)</option>
                <option value="medium">Medium (40-70%)</option>
                <option value="low">Low (&lt;40%)</option>
              </select>
              <label className="block mb-1 font-semibold text-[#0f172a]">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location..."
                className="w-full p-1 rounded border border-[#1e293b] bg-white text-[#0f172a] placeholder-gray-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Pharmacy Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#f8fafc] border border-[#1e293b] rounded-lg shadow-lg border-collapse text-[#0f172a]">
          <thead>
            <tr className="bg-[#0f172a] text-white">
              <th className="px-4 py-2 text-left">Pharmacy Name</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Prescription Match</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pharmacy, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#0f172a]/10 cursor-pointer transition"
                onClick={() =>
                  setSelectedPharmacy(pharmacyDetailsData[pharmacy.name] || null)
                }
              >
                <td className="px-4 py-2 underline">{pharmacy.name}</td>
                <td className="px-4 py-2">{pharmacy.address}</td>
                <td className="px-4 py-2 capitalize">{pharmacy.match}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pharmacy Detail Popup */}
      {selectedPharmacy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white text-[#0f172a] p-6 rounded-xl w-96 relative shadow-xl border border-[#1e293b]">
            <button
              className="absolute top-2 right-2 text-[#0f172a] text-xl font-bold"
              onClick={() => setSelectedPharmacy(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedPharmacy.name}</h2>
            <p className="mb-1">{selectedPharmacy.address}</p>
            <p className="mb-4 font-semibold">
              Contact: {selectedPharmacy.contact}
            </p>

            <table className="w-full text-left border border-[#1e293b] border-collapse">
              <thead>
                <tr className="bg-[#0f172a] text-white">
                  <th className="px-2 py-1">Medicine</th>
                  <th className="px-2 py-1">Dosage</th>
                  <th className="px-2 py-1">Availability</th>
                </tr>
              </thead>
              <tbody>
                {selectedPharmacy.medicines.map((med, idx) => (
                  <tr key={idx} className="even:bg-gray-100">
                    <td className="px-2 py-1">{med.name}</td>
                    <td className="px-2 py-1">{med.dosage}</td>
                    <td className="px-2 py-1 capitalize">{med.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
