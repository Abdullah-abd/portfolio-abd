// InputField.js
import { FaArrowRight } from "react-icons/fa"; // arrow icon

function InputField({
  placeholder,
  value,
  onChange,
  onSubmit,
  className = "",
}) {
  return (
    <div
      className={`flex items-center bg-transparent pointer-events-auto shadow-lg rounded-full px-4 py-2 w-full max-w-md ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Ask me anything..."}
        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 px-2"
      />
      <button
        onClick={onSubmit}
        className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        <FaArrowRight size={14} />
      </button>
    </div>
  );
}

export default InputField;
