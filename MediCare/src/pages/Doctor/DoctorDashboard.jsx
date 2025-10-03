// src/components/Dashboard.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { queries as mockQueries } from "../../Db/MockData";

import ConversationModal from "./ConverSastional";
function statusColor(status) {
  switch (status) {
    case "Unanswered":
      return "bg-red-500";
    case "In Progress":
      return "bg-yellow-500";
    case "Resolved":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
}
function DoctorDashboard() {
  const [queries, setQueries] = useState(mockQueries);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const handleRowClick = (query) => {
    setSelectedQuery(query);
  };

  const handleCloseModal = () => {
    setSelectedQuery(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-2">
        Unanswered Queries
      </h1>
      <p className="text-slate-500 mb-6">
        Click on a table row to view the full conversation history.
      </p>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Session ID
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Symptoms / Query Summary
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {queries.map((query) => (
              <tr
                key={query.id}
                onClick={() => handleRowClick(query)}
                className="hover:bg-slate-50 cursor-pointer transition-colors duration-200"
              >
                <td className="p-4 whitespace-nowrap font-mono text-sm text-slate-700">
                  {query.sessionId}
                </td>
                <td className="p-4 whitespace-nowrap text-slate-800">
                  {query.summary}
                </td>
                <td className="p-4 whitespace-nowrap text-slate-500">
                  {query.timestamp}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-bold text-white rounded-full ${statusColor(
                      query.status
                    )}`}
                  >
                    {query.status}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <Link
                    to={`/resolve/${query.sessionId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                  >
                    Resolve
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedQuery && (
        <ConversationModal query={selectedQuery} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default DoctorDashboard;
