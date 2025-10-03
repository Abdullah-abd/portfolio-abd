import { useEffect, useState } from "react";
import { useLocation } from "wouter";

function Navbar() {
  const [, setLocation] = useLocation();
  const [closing, setClosing] = useState(false);

  const handleClick = () => {
    setClosing(true); // start animation
  };

  useEffect(() => {
    if (closing) {
      // wait for animation to finish before routing
      const timer = setTimeout(() => {
        setLocation("/");
      }, 2000); // match your animation duration

      return () => clearTimeout(timer);
    }
  }, [closing, setLocation]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex flex-col justify-start items-center bg-white shadow-md
        transition-[height] duration-400 ease-linear
        ${closing ? "h-screen" : "h-16"}`}
    >
      {/* Avatar container */}
      <div
        onClick={handleClick}
        className="relative w-full flex justify-center"
      >
        <img
          src={"/abd1.png"}
          alt="Avatar"
          className={`rounded-full object-cover cursor-pointer
            transition-all duration-400 ease-linear
            absolute top-0
            ${
              closing
                ? "h-48 w-48 translate-y-20 scale-125"
                : "h-20 w-20 translate-y-0 scale-100"
            }`}
        />
      </div>

      {/* Goodbye message pushed further down */}
      <div
        className={`text-center px-4 transition-all duration-400 ease-linear
          ${closing ? "mt-80 opacity-100" : "mt-0 opacity-0"}`}
      >
        <h1 className="text-2xl font-semibold text-black">
          Found it great to talk with you!
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Hope your day is amazing — see you next time. 👋
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
