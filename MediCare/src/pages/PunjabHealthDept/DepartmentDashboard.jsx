// src/components/DepartmentDashboard.js

import React, { useState, useMemo } from "react";
import { medicineData } from "../../Db/medicineDate.jsx";

// Reusable Stat Card Component
const StatCard = ({ title, value, colorClass }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-sm font-medium text-slate-500">{title}</h3>
    <p className={`text-3xl font-bold mt-2 ${colorClass}`}>{value}</p>
  </div>
);

// Status Pill Component for the table
const StatusPill = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  const statusClasses = {
    "In Stock": "bg-green-100 text-green-800",
    "Low Stock": "bg-yellow-100 text-yellow-800",
    "Out of Stock": "bg-red-100 text-red-800",
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
  );
};

function DepartmentDashboard() {
  const [medicines] = useState(medicineData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pharmacyFilter, setPharmacyFilter] = useState("All"); // <-- Changed from districtFilter

  // Get a unique list of pharmacies for the filter dropdown
  const pharmacies = useMemo(
    () => ["All", ...new Set(medicines.map((m) => m.pharmacyName))],
    [medicines]
  );

  // Memoize calculations for performance
  const filteredAndSortedMedicines = useMemo(() => {
    // Define the sort order priority
    const statusPriority = { "Out of Stock": 1, "Low Stock": 2, "In Stock": 3 };

    return medicines
      .filter((med) => {
        const matchesSearch = med.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "All" || med.status === statusFilter;
        const matchesPharmacy =
          pharmacyFilter === "All" || med.pharmacyName === pharmacyFilter; // <-- Changed from matchesDistrict
        return matchesSearch && matchesStatus && matchesPharmacy;
      })
      .sort((a, b) => {
        if (statusPriority[a.status] < statusPriority[b.status]) return -1;
        if (statusPriority[a.status] > statusPriority[b.status]) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [medicines, searchQuery, statusFilter, pharmacyFilter]); // <-- Changed from districtFilter

  // Calculate stats
  const outOfStockCount = medicines.filter(
    (m) => m.status === "Out of Stock"
  ).length;
  const lowStockCount = medicines.filter(
    (m) => m.status === "Low Stock"
  ).length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        {/* --- Title Updated for Nabha --- */}
        <h1 className="text-3xl font-bold text-slate-800">
          Nabha Pharmacy Stock Portal
        </h1>
        <p className="text-slate-600 mt-1">
          Live medicine availability for the 11 pharmacies in Nabha.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* --- Added a card for total pharmacies --- */}
        <StatCard
          title="Pharmacies Monitored"
          value={pharmacies.length - 1}
          colorClass="text-slate-800"
        />
        <StatCard
          title="Medicines Tracked"
          value={medicines.length}
          colorClass="text-slate-800"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockCount}
          colorClass="text-yellow-600"
        />
        <StatCard
          title="Out of Stock Items"
          value={outOfStockCount}
          colorClass="text-red-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="search"
          placeholder="Search medicine name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        {/* --- Filter updated from District to Pharmacy --- */}
        <select
          value={pharmacyFilter}
          onChange={(e) => setPharmacyFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          {pharmacies.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Medicine Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Medicine Name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Drug Code
              </th>
              {/* --- Table header updated --- */}
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Pharmacy Name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredAndSortedMedicines.map((med) => (
              <tr
                key={med.id}
                className="hover:bg-slate-50 transition-colors duration-200"
              >
                <td className="p-4 whitespace-nowrap font-medium text-slate-800">
                  {med.name}
                </td>
                <td className="p-4 whitespace-nowrap font-mono text-sm text-slate-500">
                  {med.drugCode}
                </td>
                {/* --- Table cell updated --- */}
                <td className="p-4 whitespace-nowrap text-slate-600">
                  {med.pharmacyName}
                </td>
                <td
                  className={`p-4 whitespace-nowrap font-bold ${
                    med.status === "Out of Stock"
                      ? "text-red-600"
                      : "text-slate-800"
                  }`}
                >
                  {med.quantity.toLocaleString()}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <StatusPill status={med.status} />
                </td>
                <td className="p-4 whitespace-nowrap text-sm text-slate-500">
                  {med.lastUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAndSortedMedicines.length === 0 && (
          <p className="p-6 text-center text-slate-500">
            No medicines found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default DepartmentDashboard;
