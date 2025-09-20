// src/services/chatApi.js
import axios from "axios";

const API_BASE = "http://localhost:5000"; // change if your backend is hosted elsewhere

export async function sendChatMessage(message, files = []) {
  try {
    const response = await axios.post(`${API_BASE}/ai`, {
      message,
      files: files.map((f) => f.name),
    });
    return response.data; // { reply: "something" }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
