// src/components/ResolvePage.js
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { queries as mockQueries } from "../../Db/MockData";

function ResolvePage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const query = mockQueries.find((q) => q.sessionId === sessionId);

  const [diseaseLabel, setDiseaseLabel] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      sessionId: query.sessionId,
      symptoms: query.summary,
      diagnosis: diseaseLabel,
    });
    alert(
      `Query for ${query.sessionId} resolved with diagnosis: ${diseaseLabel}`
    );
    navigate("/Doctor/dashboard");
  };

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-red-600">Query Not Found</h2>
        <Link
          to="/"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <Link to="/" className="inline-block mb-6 text-blue-600 hover:underline">
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-slate-700 mb-6">Resolve Query</h1>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Query Details
        </h3>
        <p className="text-slate-600 mb-2">
          <strong>Session ID:</strong>{" "}
          <span className="font-mono">{query.sessionId}</span>
        </p>
        <p className="text-slate-600">
          <strong>Symptoms Summary:</strong> {query.summary}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="diseaseLabel"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Label the Disease / Diagnosis
          </label>
          <input
            type="text"
            id="diseaseLabel"
            value={diseaseLabel}
            onChange={(e) => setDiseaseLabel(e.target.value)}
            placeholder="e.g., Sciatica, Contact Dermatitis"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
        >
          Submit Diagnosis
        </button>
      </form>
    </div>
  );
}

export default ResolvePage;
