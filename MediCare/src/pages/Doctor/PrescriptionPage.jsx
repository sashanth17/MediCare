import { useState } from "react";
import axios from "axios";
import { MedicineSearch } from "../MedicineSearch";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// --- A new component for the success screen ---
const PrescriptionSuccess = ({
  prescriptionNumber,
  patientName,
  onNewPrescription,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-5">
          <svg
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Prescription Submitted!
        </h2>
        <p className="text-slate-600 mt-2">
          The prescription for{" "}
          <span className="font-semibold">{patientName}</span> has been
          successfully recorded.
        </p>

        <div className="mt-6 border-t border-b border-dashed py-4">
          <p className="text-sm text-slate-500">Prescription Number</p>
          <p className="text-3xl font-mono font-bold text-slate-800 tracking-wider py-2">
            {prescriptionNumber}
          </p>
        </div>

        <p className="text-sm text-slate-600 mt-6">
          The patient can now avail these medicines from any nearby pharmacy
          using this prescription number.
        </p>

        <button
          onClick={onNewPrescription}
          className="w-full mt-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors"
        >
          Create New Prescription
        </button>
      </div>
    </div>
  );
};

export default function PrescriptionPage() {
  const [patientId, setPatientId] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState("");
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [prescription, setPrescription] = useState([]);

  // New states to handle the success page
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // 'idle' or 'submitted'
  const [prescriptionNumber, setPrescriptionNumber] = useState("");

  const handleFindPatient = () => {
    setLoadingPatient(true);
    setError("");
    setPatientDetails(null);
    setPrescription([]);
    setTimeout(() => {
      if (patientId === "1") {
        setPatientDetails({ name: "Dinesh Kumar", age: 38, gender: "Male" });
      } else {
        setError(`Patient not found. Please use ID "1" for this demo.`);
      }
      setLoadingPatient(false);
    }, 300);
  };

  const handleAddMedicineToPrescription = (medicine) => {
    if (
      prescription.some((item) => item.medicine_id === medicine.medicine_id)
    ) {
      alert(`${medicine.medicine_name} is already in the prescription.`);
      return;
    }
    setPrescription([
      ...prescription,
      {
        ...medicine,
        dosage: "",
        frequency: "Once a day",
        duration: "",
        notes: "",
      },
    ]);
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescription = [...prescription];
    updatedPrescription[index][field] = value;
    setPrescription(updatedPrescription);
  };

  const handleRemoveMedicine = (medicineId) => {
    setPrescription(
      prescription.filter((med) => med.medicine_id !== medicineId)
    );
  };

  const handleSubmitPrescription = async () => {
    if (!patientDetails || prescription.length === 0) {
      alert("Please select a patient and add at least one medicine.");
      return;
    }

    const prescriptionData = {
      patientId: patientId,
      patientName: patientDetails.name,
      medicines: prescription,
      date: new Date().toISOString(),
    };

    try {
      // console.log("Submitting Prescription:", prescriptionData);

      // --- NEW LOGIC ---
      // 1. Generate a random prescription number for display
      const newPrescriptionNumber = `RX-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      setPrescriptionNumber(newPrescriptionNumber);

      // 2. Change the status to show the success page instead of an alert
      setSubmissionStatus("submitted");
    } catch (err) {
      console.error("Failed to submit prescription:", err);
      alert("Error: Could not submit prescription.");
    }
  };

  // Function to reset the entire page to its initial state
  const handleCreateNewPrescription = () => {
    setPatientId("");
    setPatientDetails(null);
    setError("");
    setPrescription([]);
    setPrescriptionNumber("");
    setSubmissionStatus("idle");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      {submissionStatus === "submitted" ? (
        // --- Show the Success Screen ---
        <PrescriptionSuccess
          prescriptionNumber={prescriptionNumber}
          patientName={patientDetails.name}
          onNewPrescription={handleCreateNewPrescription}
        />
      ) : (
        // --- Show the Main Prescription Form ---
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
            Doctor's Prescription Portal
          </h1>
          {/* Patient Selection Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Select Patient
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                placeholder='Enter Patient ID (try "1")'
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button
                onClick={handleFindPatient}
                disabled={loadingPatient || !patientId}
                className="w-full sm:w-auto px-6 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {loadingPatient ? "Searching..." : "Find Patient"}
              </button>
            </div>
            {error && (
              <p className="text-red-600 mt-4 font-semibold">{error}</p>
            )}
            {patientDetails && (
              <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900">
                  {patientDetails.name}
                </h3>
                <p className="text-slate-600">
                  Age: {patientDetails.age} | Gender: {patientDetails.gender} |
                  ID: {patientId}
                </p>
              </div>
            )}
          </div>
          {/* Main Content Area */}
          {patientDetails && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Search Medicines
                </h2>
                <MedicineSearch
                  onAddMedicine={handleAddMedicineToPrescription}
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Current Prescription
                </h2>
                {prescription.length > 0 ? (
                  <div className="space-y-4">
                    {prescription.map((med, index) => (
                      <div
                        key={med.medicine_id}
                        className="p-4 border border-slate-200 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-lg text-slate-800">
                            {med.medicine_name}
                          </h4>
                          <button
                            onClick={() =>
                              handleRemoveMedicine(med.medicine_id)
                            }
                            className="text-red-500 hover:text-red-700 font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Dosage (e.g., 500mg)"
                            value={med.dosage}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                index,
                                "dosage",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 border rounded-md w-full"
                          />
                          <select
                            value={med.frequency}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                index,
                                "frequency",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 border rounded-md w-full"
                          >
                            <option>Once a day</option>
                            <option>Twice a day</option>
                            <option>Thrice a day</option>
                            <option>Before sleep</option>
                            <option>As needed</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Duration (e.g., 7 days)"
                            value={med.duration}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                index,
                                "duration",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 border rounded-md w-full"
                          />
                          <textarea
                            placeholder="Notes (e.g., after food)"
                            value={med.notes}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                index,
                                "notes",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 border rounded-md w-full sm:col-span-2"
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleSubmitPrescription}
                      className="w-full mt-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Submit Prescription
                    </button>
                  </div>
                ) : (
                  <p className="text-center text-slate-500 py-8">
                    No medicines added yet. Search for a medicine to begin.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
