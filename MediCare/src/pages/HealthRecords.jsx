import React, { useState } from "react";

// Default health records data
const defaultRecords = [
  {
    title: "Blood Test",
    status: "complete",
    details: "Routine blood check-up",
    content: "All results normal",
    report: "https://via.placeholder.com/400x250?text=Blood+Test+Report",
  },
  {
    title: "X-Ray",
    status: "under",
    details: "Chest X-Ray",
    content: "Pending review by radiologist",
    report: "https://via.placeholder.com/400x250?text=Chest+X-Ray",
  },
  {
    title: "Vaccination",
    status: "complete",
    details: "Flu vaccine",
    content: "Administered successfully",
    report: "https://via.placeholder.com/400x250?text=Vaccination+Certificate",
  },
  {
    title: "MRI Scan",
    status: "under",
    details: "Brain MRI",
    content: "Results awaited",
    report: "https://via.placeholder.com/400x250?text=MRI+Scan",
  },
  {
    title: "ECG",
    status: "complete",
    details: "Heart check-up",
    content: "No major issues detected",
    report: "https://via.placeholder.com/400x250?text=ECG+Report",
  },
];

const HealthRecords = ({ records = defaultRecords }) => {
  const [showView, setShowView] = useState(false);
  const [viewContent, setViewContent] = useState(null);

  // Status badge styles
  const getStatusClasses = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-700/30 text-green-300";
      case "under":
        return "bg-yellow-700/30 text-yellow-300";
      default:
        return "bg-gray-700/30 text-gray-300";
    }
  };

  return (
    <div className="w-[95%] max-w-6xl mx-auto my-6">
      {/* Heading */}
      <h2 className="text-center text-3xl font-bold mb-8 text-[#1e293b]">
        Health Records
      </h2>

      {/* Records Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((rec, idx) => (
          <div
            key={idx}
            className="bg-[#0f172a] rounded-xl shadow-lg p-5 flex flex-col items-center hover:-translate-y-1 transition-transform border border-[#1e293b]"
          >
            {/* Title + Status */}
            <div className="flex gap-2 items-center mb-2 justify-center">
              <h4 className="text-white text-lg font-semibold">{rec.title}</h4>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusClasses(
                  rec.status
                )}`}
              >
                {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
              </span>
            </div>

            {/* Details */}
            <p className="text-gray-300 text-sm mb-4 text-center">{rec.details}</p>

            {/* View Button */}
            <button
              className="bg-[#1e293b] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#334155] transition"
              onClick={() => {
                setViewContent(rec);
                setShowView(true);
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showView && viewContent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#0f172a] text-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative border border-[#1e293b]">
            {/* Close Button */}
            <span
              className="absolute top-3 right-3 text-red-500 text-2xl font-bold cursor-pointer"
              onClick={() => setShowView(false)}
            >
              &times;
            </span>

            {/* Modal Title */}
            <h3 className="text-[#1e293b] text-2xl font-bold mb-4">
              {viewContent.title}
            </h3>

            {/* Modal Content */}
            <p className="text-gray-200 mb-4">{viewContent.content}</p>

            {/* Report Image */}
            {viewContent.report && (
              <img
                src={viewContent.report}
                alt={`${viewContent.title} Report`}
                className="w-full rounded-lg shadow-md border border-gray-700"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
