import axios from "axios";

// Change this URL if backend is deployed somewhere (like Render, Vercel, Railway)
const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://portfolio-backend-najr.onrender.com/",
});

// Function to send message to backend
export const sendMessage = async (message) => {
  try {
    const res = await API.post("/chat", { message }); // payload { message: "..." }
    return res.data; // returns { reply: "..." }
  } catch (error) {
    console.error("Error while sending message:", error);
    return { reply: "⚠️ Server error. Please try again later." };
  }
};
