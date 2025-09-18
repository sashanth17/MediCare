import React, { useState } from "react";

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
    description: "Leading pharmacy providing high-quality medicines and health consultations.",
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
    description: "Trusted pharmacy with fast service and affordable medicines.",
    medicines: [
      { name: "Paracetamol", dosage: "500 mg", status: "in-stock" },
      { name: "Aspirin", dosage: "75 mg", status: "low-stock" },
    ],
  },
  // Add more pharmacies as needed
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
    const matchesLocation = !location || pharmacy.address.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesMatch && matchesLocation;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "in-stock":
        return "text-green-400 font-bold";
      case "low-stock":
        return "text-yellow-400 font-bold";
      case "out-stock":
        return "text-red-400 font-bold";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "in-stock":
        return "✔ In Stock";
      case "low-stock":
        return "⚠ Low Stock";
      case "out-stock":
        return "✘ Out of Stock";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">PHARMACY LIST</h1>

      {/* Search + Filter */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search pharmacy or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white w-64"
        />
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800"
          >
            ⚙ Filters
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg p-4 w-56 z-50">
              <label className="block mb-1 font-semibold">Prescription Match %</label>
              <select
                className="w-full p-1 rounded border border-gray-600 mb-2 bg-gray-900 text-white"
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="high">High (&gt;70%)</option>
                <option value="medium">Medium (40-70%)</option>
                <option value="low">Low (&lt;40%)</option>
              </select>
              <label className="block mb-1 font-semibold">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location..."
                className="w-full p-1 rounded border border-gray-600 bg-gray-900 text-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* Pharmacy Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2 text-left">Pharmacy Name</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Prescription Match</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pharmacy, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedPharmacy(pharmacyDetailsData[pharmacy.name] || null)}
              >
                <td className="px-4 py-2 text-blue-400 underline">{pharmacy.name}</td>
                <td className="px-4 py-2">{pharmacy.address}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    pharmacy.match === "high"
                      ? "text-green-400"
                      : pharmacy.match === "medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {pharmacy.match.charAt(0).toUpperCase() + pharmacy.match.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pharmacy Detail Popup */}
      {selectedPharmacy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-blue-900 text-white p-6 rounded-xl w-96 relative shadow-xl">
            <button
              className="absolute top-2 right-2 text-red-400 text-xl font-bold"
              onClick={() => setSelectedPharmacy(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedPharmacy.name}</h2>
            <p className="mb-1 font-semibold">{selectedPharmacy.description}</p>
            <p className="mb-1">{selectedPharmacy.address}</p>
            <p className="mb-4 font-semibold">Contact: {selectedPharmacy.contact}</p>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-2 py-1">Medicine</th>
                  <th className="px-2 py-1">Dosage</th>
                  <th className="px-2 py-1">Availability</th>
                </tr>
              </thead>
              <tbody>
                {selectedPharmacy.medicines.map((med, idx) => (
                  <tr key={idx} className="even:bg-blue-800/30">
                    <td className="px-2 py-1">{med.name}</td>
                    <td className="px-2 py-1">{med.dosage}</td>
                    <td className={`px-2 py-1 ${getStatusStyle(med.status)}`}>{getStatusText(med.status)}</td>
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
