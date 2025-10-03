import { useState } from "react";
import { useLocation } from "wouter"; // ✅ import useLocation from wouter

function ExperienceCard({ icon, title, message, className = "" }) {
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation(); // ✅ for navigation

  const handleClick = async () => {
    if (!message) return;
    try {
      setLoading(true);

      // ✅ Save message to localStorage instead of calling API here
      localStorage.setItem("initialQuestion", message);

      // ✅ Navigate to /chat page
      setLocation("/chat");
    } catch (error) {
      console.error("Error handling message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center space-x-3 p-4 rounded-2xl shadow-md pointer-events-auto bg-transparent hover:shadow-lg transition cursor-pointer ${className}`}
    >
      {/* Icon or emoji */}
      <span className="text-2xl">{icon}</span>

      {/* Title */}
      <h3 className="text-lg font-semibold">
        {loading ? "Loading..." : title}
      </h3>
    </div>
  );
}

export default ExperienceCard;
