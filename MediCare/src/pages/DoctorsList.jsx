import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DoctorsList = () => {
  console.log("Base URL: main", BASE_URL);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Doctors`)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Doctors</h1>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">Available</th>
            <th className="p-2 border">Specification</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{doctor.user.username}</td>
                <td className="p-2 border">{doctor.user.first_name || "-"}</td>
                <td className="p-2 border">{doctor.user.last_name || "-"}</td>
                <td className="p-2 border">Yes</td> {/* hardcoded */}
                <td className="p-2 border">General</td> {/* hardcoded */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-2 border text-center text-gray-500">
                No doctors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsList;
