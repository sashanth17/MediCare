import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MedicineDetail = () => {
  const { medicineId } = useParams(); // from route /medicines/:medicineId
  const [medicine, setMedicine] = useState(null);
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://0.0.0.0:8000/medicines/${medicineId}/`)
      .then((response) => {
        setMedicine(response.data.medicine);
        setInstances(response.data.instances);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching medicine details:", err);
        setError("Failed to load medicine details");
        setLoading(false);
      });
  }, [medicineId]);

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      {/* Medicine Info */}
      <h1 className="text-2xl font-bold mb-4">
        {medicine.medicine_name} (ID: {medicine.medicine_id})
      </h1>
      <p className="mb-6 text-gray-700">{medicine.description}</p>

      {/* Instances Table */}
      <h2 className="text-xl font-semibold mb-3">Available in Pharmacies:</h2>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Pharmacy Name</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Contact</th>
          </tr>
        </thead>
        <tbody>
          {instances.length > 0 ? (
            instances.map((instance) => (
              <tr key={instance.instance_id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  {instance.pharmacy.pharmacy_name}
                </td>
                <td className="p-2 border">{instance.pharmacy.location}</td>
                <td className="p-2 border">{instance.pharmacy.contact_no}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-2 border text-center text-gray-500">
                this medicine is not available in any pharmacy.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineDetail;
