// api/doctors.js
import axios from "axios";

const fetchDoctors = async () => {
  try {
    const response = await axios.get(`https://127.0.0.1:8000/Doctors`, {
      headers: { Accept: "application/json" },
    });
    console.log("Fetched doctors:", response.data); // 👈 log result
    return response.data;
  } catch (err) {
    console.error("Error fetching doctors:", err);
    throw err;
  }
};

export { fetchDoctors };
