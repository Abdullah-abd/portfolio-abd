import { useState } from "react";
import {
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaFileAlt,
  FaLayerGroup,
  FaUser,
} from "react-icons/fa";
import "./App.css";
import FluidBackground from "./components/CursorBackground";
import ExperienceCard from "./components/ExperienceCard";
import FaceFollow from "./components/FaceFollow";
import InputField from "./components/InputField";

function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="App relative w-full min-h-screen overflow-hidden pt-0 bg-white flex flex-col items-center">
        {/* Fluid background */}
        <FluidBackground className="fixed inset-0 z-20 bg-white pointer-events-auto" />

        {/* Foreground content */}
        <div className="relative flex flex-col z-20 items-center text-center mb-5 mt-16 px-4 pointer-events-none">
          <h1 className="text-4xl font-bold text-black">I'm Abdullah</h1>
          <h3 className="text-2xl md:text-3xl text-black mb-6 max-w-xl">
            A Full Stack Developer <br />
            Who Delivers Modern & Scalable Web Solutions
          </h3>
          <FaceFollow />

          {/* Input field stays fixed at the bottom */}
          <div className="w-full flex justify-center z-20 mt-12 mb-8 px-4 ">
            <InputField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onSubmit={() => console.log("Submitted:", message)}
            />
          </div>

          {/* Experience card flows naturally below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <ExperienceCard
              icon={<FaUser className="text-blue-500 stroke-2" />}
              title="About Me"
            />
            <ExperienceCard
              icon={<FaCode className="text-pink-500 stroke-2" />}
              title="Projects"
            />
            <ExperienceCard
              icon={<FaLayerGroup className="text-teal-500 stroke-2" />}
              title="Skills"
            />
            <ExperienceCard
              icon={<FaBriefcase className="text-purple-500 stroke-2" />}
              title="Experience"
            />
            <ExperienceCard
              icon={<FaEnvelope className="text-indigo-500 stroke-2" />}
              title="Contact"
            />
          </div>
        </div>
      </div>
      <div className="fixed top-10 z-20 right-10">
        <ExperienceCard
          icon={<FaFileAlt className="text-outline-grey text-2xl" />}
          title="CV"
          className="bg-white/30 backdrop-blur-md"
        />
      </div>
    </>
  );
}

export default App;
