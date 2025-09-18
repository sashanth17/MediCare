import { useState } from "react";

const PatientInfo = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [patient, setPatient] = useState({
    name: "John Doe",
    age: 28,
    gender: "Male",
    email: "john@example.com",
    phone: "+91 9876543210",
  });

  const [formData, setFormData] = useState({ ...patient });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPatient({ ...formData });
    setShowEdit(false);
  };

  return (
    <div className="w-[95%] max-w-2xl bg-[#0f172a] p-6 rounded-xl shadow-xl relative mx-auto my-6">
      <h2 className="text-center text-2xl font-bold text-white mb-4">Personal Info</h2>

      <button
        className="absolute top-6 right-6 px-4 py-2 bg-white text-[#0f172a] font-bold rounded-lg hover:bg-gray-100 transition"
        onClick={() => setShowEdit(true)}
      >
        Edit Changes
      </button>

      <table className="w-full border-collapse min-w-[300px] bg-white rounded-lg overflow-hidden">
        <tbody>
          {Object.keys(patient).map((key) => (
            <tr key={key}>
              <th className="bg-gray-100 text-[#0f172a] font-bold border px-3 py-2 text-left">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
              <td className="border px-3 py-2 text-gray-800">{patient[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEdit && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
            <span
              className="absolute top-3 right-3 text-red-600 text-xl font-bold cursor-pointer"
              onClick={() => setShowEdit(false)}
            >
              &times;
            </span>
            <h3 className="text-[#0f172a] text-xl font-bold mb-4">Edit Personal Info</h3>
            <form onSubmit={handleSave} className="flex flex-col gap-3">
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              ))}
              <button
                type="submit"
                className="bg-[#0f172a] text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-950 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
