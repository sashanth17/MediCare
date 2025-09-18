import React from "react";

const defaultHistory = [
  { date: "2025-09-18", condition: "Flu", action: "Medication", doctor: "Dr. Meera", status: "normal" },
  { date: "2025-08-10", condition: "Cold", action: "Rest", doctor: "Dr. Rajesh", status: "stable" },
  { date: "2025-07-05", condition: "Allergy", action: "Antihistamine", doctor: "Dr. Anil", status: "under" },
  { date: "2025-06-01", condition: "Check-up", action: "Routine", doctor: "Dr. Priya", status: "need" },
];

const MedicalHistory = ({ history = defaultHistory }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case "need":
        return "bg-red-700/20 text-red-200";
      case "under":
        return "bg-yellow-700/20 text-yellow-200";
      case "stable":
        return "bg-green-700/20 text-green-200";
      case "normal":
        return "bg-blue-700/20 text-blue-200";
      default:
        return "bg-gray-700/20 text-gray-200";
    }
  };

  return (
    <div className="w-[95%] max-w-3xl bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl shadow-xl mx-auto my-6">
      <h2 className="text-center text-2xl font-bold text-white mb-4">Medical History</h2>
      <table className="w-full border-collapse text-center text-white">
        <thead>
          <tr className="bg-gray-800">
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Condition / Event</th>
            <th className="border px-3 py-2">Medication / Action</th>
            <th className="border px-3 py-2">Doctor</th>
            <th className="border px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={idx} className="even:bg-gray-800/50 odd:bg-gray-800/30">
              <td className="border px-3 py-2">{item.date}</td>
              <td className="border px-3 py-2">{item.condition}</td>
              <td className="border px-3 py-2">{item.action}</td>
              <td className="border px-3 py-2">{item.doctor}</td>
              <td className="border px-3 py-2">
                <span className={`px-3 py-1 rounded-full font-bold ${getStatusClasses(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalHistory;
