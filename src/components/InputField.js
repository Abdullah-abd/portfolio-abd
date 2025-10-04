// // InputField.js
// import { FaArrowRight } from "react-icons/fa"; // arrow icon

// function InputField({
//   placeholder,
//   value,
//   onChange,
//   onSubmit,
//   className = "",
// }) {
//   return (
//     <div
//       className={`flex items-center bg-transparent pointer-events-auto shadow-lg rounded-full px-4 py-2 w-full max-w-md ${className}`}
//     >
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder || "Ask me anything..."}
//         className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 px-2"
//       />
//       <button
//         onClick={onSubmit}
//         className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
//       >
//         <FaArrowRight size={14} />
//       </button>
//     </div>
//   );
// }

// export default InputField;
// InputField.js
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useLocation } from "wouter"; // ✅ for routing

function InputField({ placeholder, value, onChange, className = "" }) {
  const [, setLocation] = useLocation();
  const [inputValue, setInputValue] = useState(value || "");

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // ✅ Save to localStorage
    localStorage.setItem("initialQuestion", inputValue);

    // ✅ Navigate to /chat
    setLocation("/chat");
  };

  return (
    <div
      className={`flex items-center bg-transparent pointer-events-auto shadow-lg rounded-full px-6 py-3 w-full max-w-2xl ${className}`}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange && onChange(e); // ✅ preserve external handler if passed
        }}
        placeholder={placeholder || "Ask me anything..."}
        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 px-3 text-base"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()} // ✅ press Enter to submit
      />
      <button
        onClick={handleSubmit}
        className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        <FaArrowRight size={16} />
      </button>
    </div>
  );
}

export default InputField;
