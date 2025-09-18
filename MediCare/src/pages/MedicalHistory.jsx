import React, { useState } from "react";

// Default health records data
const defaultRecords = [
  { title: "Blood Test", status: "complete", details: "Routine blood check-up", content: "All results normal" },
  { title: "X-Ray", status: "under", details: "Chest X-Ray", content: "Pending review by radiologist" },
  { title: "Vaccination", status: "complete", details: "Flu vaccine", content: "Administered successfully" },
];

const HealthRecords = ({ records = defaultRecords }) => {
  const [showView, setShowView] = useState(false);
  const [viewContent, setViewContent] = useState("");

  const getStatusClasses = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-700/20 text-green-200";
      case "under":
        return "bg-yellow-700/20 text-yellow-200";
      default:
        return "bg-gray-700/20 text-gray-200";
    }
  };

  return (
    <div className="w-[95%] max-w-3xl mx-auto my-6">
      {/* Heading in blackish-blue */}
      <h2 className="text-center text-2xl font-bold mb-6 text-[#1e293b]">Health Records</h2>

      <div className="flex flex-col gap-5 items-center">
        {records.map((rec, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-gray-900 to-black rounded-xl shadow-lg w-[90%] max-w-lg p-5 flex flex-col items-center hover:-translate-y-1 transition-transform"
          >
            <div className="flex gap-2 items-center mb-2 justify-center">
              <h4 className="text-white text-lg">{rec.title}</h4>
              <span className={`px-3 py-1 rounded-full font-bold ${getStatusClasses(rec.status)}`}>
                {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-2">{rec.details}</p>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
              onClick={() => {
                setViewContent(rec.content);
                setShowView(true);
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>

      {showView && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
            <span
              className="absolute top-3 right-3 text-red-500 text-xl font-bold cursor-pointer"
              onClick={() => setShowView(false)}
            >
              &times;
            </span>
            {/* Modal title in blackish-blue */}
            <h3 className="text-[#1e293b] text-xl font-bold mb-4">Health Record</h3>
            <div>{viewContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
