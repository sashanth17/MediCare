import React, { createContext, useState, useContext } from "react";

// Create the context
const PrescriptionContext = createContext();

// Create a custom hook to use the context easily
export const usePrescription = () => {
  return useContext(PrescriptionContext);
};

// Create the Provider component
export const PrescriptionProvider = ({ children }) => {
  const [patientId, setPatientId] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const [prescription, setPrescription] = useState([]);
  const [error, setError] = useState("");
  const [loadingPatient, setLoadingPatient] = useState(false);

  // Simplified patient finder logic
  const findPatient = (id) => {
    setLoadingPatient(true);
    setError("");
    setPatientDetails(null);
    setPrescription([]); // Clear old prescription

    setTimeout(() => {
      if (id === "1") {
        setPatientDetails({ name: "Ramesh Kumar", age: 38, gender: "Male" });
        setPatientId(id); // Set the ID in context
      } else {
        setError(`Patient not found. Please use ID "1" for this demo.`);
        setPatientId(""); // Clear the ID on failure
      }
      setLoadingPatient(false);
    }, 300);
  };

  // Function to clear all patient data and start over
  const clearPatientSession = () => {
    setPatientId("");
    setPatientDetails(null);
    setPrescription([]);
    setError("");
  };

  // All the state and functions you want to share
  const value = {
    patientId,
    setPatientId,
    patientDetails,
    findPatient,
    loadingPatient,
    error,
    prescription,
    setPrescription,
    clearPatientSession,
  };

  return (
    <PrescriptionContext.Provider value={value}>
      {children}
    </PrescriptionContext.Provider>
  );
};
