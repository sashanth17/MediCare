import React, { useState } from "react";

const defaultDoctors = [
  {
    name: "Dr. Rajesh Kumar",
    specialization: "General Physician",
    experience: "10 yrs",
    location: "Delhi",
    language: "English",
    description: "Expert in general health and preventive care.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Dr. Meera Singh",
    specialization: "Cardiologist",
    experience: "8 yrs",
    location: "Mumbai",
    language: "Hindi",
    description: "Specializes in heart diseases and cardiac health.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Dr. Anil Sharma",
    specialization: "Dermatologist",
    experience: "5 yrs",
    location: "Chennai",
    language: "English, Tamil",
    description: "Skilled in treating skin disorders and cosmetic dermatology.",
    image: "https://via.placeholder.com/150",
  },
];

const DoctorsList = ({ doctors = defaultDoctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredDoctors =
    filter === "All"
      ? doctors
      : doctors.filter((doc) => doc.specialization === filter);

  const specializations = ["All", ...new Set(doctors.map((doc) => doc.specialization))];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* Header + Filter */}
      <div className="flex justify-between w-full max-w-4xl mb-4">
        <h1 className="text-2xl font-bold text-[#1e293b]">DOCTORS LIST</h1>
        <select
          className="text-sm px-4 py-2 border rounded-md bg-white cursor-pointer"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors Table */}
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl">
        <thead>
          <tr className="bg-[#1e293b]/80 text-white">
            <th className="border border-gray-300 px-4 py-2 text-left">Doctor Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Specialization</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Experience</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Language</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doc, idx) => (
            <tr
              key={idx}
              className="hover:bg-[#1e293b]/10 cursor-pointer"
              onClick={() => setSelectedDoctor(doc)}
            >
              <td className="border border-gray-300 px-4 py-2 text-[#1e293b] underline">
                {doc.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">{doc.specialization}</td>
              <td className="border border-gray-300 px-4 py-2">{doc.experience}</td>
              <td className="border border-gray-300 px-4 py-2">{doc.location}</td>
              <td className="border border-gray-300 px-4 py-2">{doc.language}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-[#1e293b] text-white rounded-xl shadow-2xl p-6 flex flex-col gap-4 w-[500px]">
            <button
              className="absolute top-3 right-3 text-red-500 font-bold text-xl"
              onClick={() => setSelectedDoctor(null)}
            >
              &times;
            </button>
            <div className="flex gap-6 items-start">
              <img
                src={selectedDoctor.image}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-white"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{selectedDoctor.name}</h2>
                <p className="mt-1 text-gray-200">{selectedDoctor.description}</p>
                <table className="mt-3 text-white text-sm w-full">
                  <tbody>
                    <tr>
                      <td className="font-bold px-2 py-1">Specialization</td>
                      <td className="px-2 py-1">{selectedDoctor.specialization}</td>
                    </tr>
                    <tr>
                      <td className="font-bold px-2 py-1">Experience</td>
                      <td className="px-2 py-1">{selectedDoctor.experience}</td>
                    </tr>
                    <tr>
                      <td className="font-bold px-2 py-1">Location</td>
                      <td className="px-2 py-1">{selectedDoctor.location}</td>
                    </tr>
                    <tr>
                      <td className="font-bold px-2 py-1">Language</td>
                      <td className="px-2 py-1">{selectedDoctor.language}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
